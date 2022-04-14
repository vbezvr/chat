import { ui } from "./view.js";

export class Modal {
  ANIMATION_SPEED = 200;
  values = {
    title: "Настройки",
    content: `<p class="name-txt">Имя в чате</p>
                <form id="enter-name">
                    <input type="text" class="input-enter-msg">
                    <input type="image" class="enter-btn" src="img/send.svg">
                </form>`,
  };

  constructor(options) {
    for (let key in options) {
      this.values[key] ? (this.values[key] = options[key]) : null;
    }
  }

  getModal() {
    const ANIMATION_SPEED = 200;
    const modal = this._createModal();

    const modalInstance = {
      open() {
        setTimeout(() => {
          modal.classList.add("open");
        }, ANIMATION_SPEED);
      },
      close() {
        modal.classList.remove("open");
        modal.classList.add("hidden");
        setTimeout(() => {
          modal.classList.remove("hidden");
        }, ANIMATION_SPEED);
      },
    };

    const listener = (event) => {
      if (event.target.dataset.close) {
        modalInstance.close();
      }
    };
    modal.addEventListener("click", listener);

    return Object.assign(modalInstance, {
      destroy() {
        modal.parentNode.removeChild(modal);
        modal.removeEventListener("click", listener);
      },
    });
  }

  _createModal() {
    const modalWindow = document.createElement("div");
    modalWindow.classList.add("modal-setting");
    modalWindow.setAttribute("data-close", "true");
    modalWindow.insertAdjacentHTML(
      "beforeend",
      `<div class="setting-content">
          <span>${this.values.title}</span>
          <span href="" class="exit-btn" ><strong data-close="true">&times;</strong></span>
                ${this.values.content}
            </div>`
    );
    ui.display_chat.append(modalWindow);
    return modalWindow;
  }
}