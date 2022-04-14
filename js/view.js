import { Modal } from "./modal.js";
import {user} from './main.js';
export {initButtons}
export const ui = {
  display_chat: document.querySelector(".chat"),
  input_message: document.querySelector(".input-enter-msg"),
  enter_button: document.querySelector(".enter-btn"),
  setting_button: document.querySelector(".setting-btn"),
};

function initButtons() {
  ui.setting_button.addEventListener('click', initSettingWindow.bind(ui.setting_button, new Modal()));
}

function initSettingWindow(modal) {
  const modalInstance = modal.getModal();
  modalInstance.open(); 
  const userNameForm = document.querySelector("#enter-name");
  userNameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    user.name = userNameForm.value;
    modalInstance.close()
  })
}

