class PopupWithForm extends Popup {
  constructor(popup,validation) {
    super(popup);

    this.validation = validation
    this.form = this.popup.querySelector('form')
  }

  createEditUserForm = () => {
    this.open()
    this.changeInputsValue()
    this.validation(this.form)
  }

  createAddCardForm = () => {
    this.form.reset()
    this.open()
    this.validation(this.form)
  }

  changeInputsValue = () => {
    this.form.name.value = document.querySelector('.user-info__name').textContent;
    this.form.about.value = document.querySelector('.user-info__job').textContent;
  }
}