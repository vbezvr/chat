import {ui, initButtons} from './view.js';
import {html} from './helper.js';
import {storage} from './storage.js';
import { loadHistory } from './scroll.js';
// import { format } from "date-fns";
// import { ru } from 'date-fns/locale';
// import image from "../send.svg";
export {user, sendMessage}

const user = {
  name: null,
  id: null, 
}

const socket = io();

socket.on('connect', () => {
  user.id = socket.id;
  if (storage.isEmpty()) {
    storage.createStorageMessage()
  } else {
    loadHistory('init')
  }
})

function submitMessageForm() {
  const textMessage = ui.input_message.value;
  if (textMessage && user.name) {
    const messageData = {
      message: textMessage,
      id: socket.id,
      userName: user.name,
      time: Date.now(),
    };
    socket.emit("chat message", messageData);
    storage.addNewMessage(messageData);
  }

}

socket.on("chat message", sendMessage);

function sendMessage(data, option = 'init') {

  const handleInit = () => {
    ui.display_chat.prepend(message);
    ui.input_message.value = "";
  };
  const handleLoad = () => { ui.display_chat.append(message); }

  const handlers = {
    load: handleLoad,
    init: handleInit
  }
  const handler = handlers[option];
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
  handler();
  
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