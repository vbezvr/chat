import { Modal } from "./modal.js";
export {initButtons}
export const ui = {
  display_chat: document.querySelector(".chat"),
  input_message: document.querySelector(".input-enter-msg"),
  enter_button: document.querySelector(".enter-btn"),
  msg_template: document.querySelector(".new_message"),
  setting_button: document.querySelector(".setting-btn"),
};

function initButtons() {
  ui.setting_button.addEventListener('click', initSettingButton.bind(ui.setting_button, new Modal()));
}

function initSettingButton(modal) {
  modal.getModal().open();

  
}

