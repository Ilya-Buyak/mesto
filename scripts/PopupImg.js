class PopupImg extends Popup {
  constructor(popupElement) {
    super(popupElement)
  }

  createPopup (picture) {
    this.background = this.popupElement.querySelector('.popup-img__background')
    this.background.src = picture
    this.open()
  }
}