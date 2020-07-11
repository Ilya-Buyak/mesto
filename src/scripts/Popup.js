export class Popup {
  constructor(popupElement) {
    this.popupElement = popupElement
    this.close = this.close.bind(this)
    this.closeByEsc = this.closeByEsc.bind(this)
  }
  closeByEsc (event) {
    if (event.key === 'Escape') {
      this.close()
    }
  }
  setEventListeners () {
    document.addEventListener('keyup', this.closeByEsc)
    if (window.innerWidth > 768) {
      this.popupElement.querySelector('.popup__close').addEventListener('click', this.close);
    } else {
      this.popupElement.querySelector('.popup__close').addEventListener('touchend', this.close);
    }
  }

  open () {
    this.popupElement.classList.add('popup_is-opened')
    this.setEventListeners()
  }

  close () {
    this.popupElement.classList.remove('popup_is-opened')
    document.removeEventListener('keyup', this.closeByEsc)
  }
}
