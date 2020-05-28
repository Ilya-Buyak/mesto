class PopupImg extends Popup {
  constructor(popup) {
    super(popup)
  }

  createPopup = (picture) => {
    this.background = this.popup.querySelector('.popup-img__background')
    this.background.src = picture
    this.open()
  }
}