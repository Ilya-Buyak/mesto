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
    if (window.innerWidth > 768) {
      this.popup.querySelector('.popup__close').addEventListener('click', this.close.bind(this),false);
    } else {
      this.popup.querySelector('.popup__close').addEventListener('touchend', this.close.bind(this),false);
    }
  }

  open () {
    this.popup.classList.add('popup_is-opened')
    this.setEventListeners()
  }

  close () {
    this.popup.classList.remove('popup_is-opened')
  }
}
