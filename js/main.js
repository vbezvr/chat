import {ui, initButtons} from './view.js';
// import { Modal } from './modal.js';
// import { format } from "date-fns";
// import { ru } from 'date-fns/locale';
// import image from "../send.svg";

const socket = io();

function sendMessage() {
  const textMessage = ui.input_message.value;
  if (textMessage) {
    const message = ui.msg_template.content.cloneNode(true);
    message.querySelector(".text").textContent += textMessage;
    // message.querySelector(".time").textContent = getCurrentTime();
    ui.display_chat.prepend(message);
    ui.input_message.value = "";
  }

}

// function getCurrentTime() {
//   return format(new Date(), 'kk:m', {locale: ru});
// }

// function loadImg() {
//   ui.enter_button.src = `${image}`;

// }

// loadImg();
ui.enter_button.addEventListener('click', sendMessage);

initButtons();



