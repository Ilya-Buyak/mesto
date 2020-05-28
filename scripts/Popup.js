class Popup {

  constructor(popup) {
    this.popup = popup
  }
  closeByEsc (event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }
  setEventListeners () {
    document.addEventListener('keyup', this.closeByEsc.bind(this))
    this.popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
    this.popup.querySelector('.popup__close').addEventListener('touchend', this.close.bind(this));
  }

  open () {
    this.popup.classList.add('popup_is-opened')
    this.setEventListeners()
  }

  close () {
    this.popup.classList.remove('popup_is-opened')
  }
}
