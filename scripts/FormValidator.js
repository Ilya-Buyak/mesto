class FormValidator {
  constructor(form) {
    this.form = form
  }
  resetErrors = () => {
    this.inputs = Array.from(this.form.querySelectorAll('input'))
    this.inputs.forEach((element) => { element.nextElementSibling.textContent = ''});
  }

  checkInputValidity = (elementInput) => {
    const errorText = 'Это обязательное поле';
    const errorLengthText = 'Должно быть от 2 до 30 символов';
    const errorLinkText = 'Здесь должна быть ссылка';
    this.errorElement = this.form.querySelector(`#error-${elementInput.id}`)
    if (elementInput.type !== 'url') {
      if (elementInput.validity.valueMissing) {
        this.errorElement.textContent = errorText
        return false
      } else if (elementInput.value.length === 1 || elementInput.value.length > 30) {
        this.errorElement.textContent = errorLengthText
        return false
      }
    } else {
      if (!elementInput.validity.valid) {
        this.errorElement.textContent = errorLinkText
        return false
      }
    }
    this.errorElement.textContent = ''
    return true
  }

  handleValidate = (event)  => {
    this.checkInputValidity(event.target)
    this.setSubmitButtonState()
  }

  setSubmitButtonState = () => {
    let isValidForm = true;
    this.inputs = Array.from(this.form.querySelectorAll('input'))
    this.btn = this.form.querySelector('.button')

    this.inputs.forEach((element) => {
      if (!element.checkValidity())  isValidForm = false
    });

    if (isValidForm) {
      this.btn.removeAttribute('disabled');
      this.btn.classList.remove('popup__button_disabled')
    } else {
      this.btn.disabled = true;
      this.btn.classList.add('popup__button_disabled')
    }
  }
  formValidity = () => {
    this.setSubmitButtonState()
    this.resetErrors()
    this.form.addEventListener('input', this.handleValidate)
  }
}