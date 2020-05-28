class Popup {

  constructor(popup) {
    this.popup = popup
  }
  closeFromEsc = (event) => {
    if (event.keyCode === 27) {
      this.close()
    }
  }
  setEventListeners = () => {
    document.addEventListener('keyup', this.closeFromEsc)
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
  }

  open = () => {
    this.popup.classList.add('popup_is-opened')
    this.setEventListeners()
  }

  close = () => {
    this.popup.classList.remove('popup_is-opened')
  }
}
