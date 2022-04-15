import {ui, initButtons} from './view.js';
import {html} from './helper.js'
// import { format } from "date-fns";
// import { ru } from 'date-fns/locale';
// import image from "../send.svg";
export {user}

const user = {
  name: null,
  id: null, 
}

const socket = io();

socket.on('connect', () => {
  user.id = socket.id;
})

function submitMessageForm() {
  const textMessage = ui.input_message.value;
  if (textMessage) {
    socket.emit("chat message", {message: textMessage, id: socket.id, userName: user.name});
  }

}

socket.on("chat message", sendMessage);

function sendMessage(data) {
  const msgDirection = {
    templateMsg: html.getTemplateIncomeMessage(),
    nickname: data.userName
  }

  if (user.id === data.id) {

    msgDirection.templateMsg = html.getTemplateOutcomeMessage();
    msgDirection.nickname = 'Я';

  } 
  const message = msgDirection.templateMsg.content.cloneNode(true);
  message.querySelector(".text").textContent =`${msgDirection.nickname}: ${data.message}`;
  // message.querySelector(".time").textContent = getCurrentTime();
  ui.display_chat.prepend(message);
  ui.input_message.value = "";
  
}

// function getCurrentTime() {
//   return format(new Date(), 'kk:m', {locale: ru});
// }

// function loadImg() {
//   ui.enter_button.src = `${image}`;

// }

// loadImg();
ui.enter_button.addEventListener('click', submitMessageForm);

initButtons();



