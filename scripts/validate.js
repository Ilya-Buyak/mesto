// валидация формы
function resetErrors (inputs) {
 inputs.forEach((element) => { element.nextElementSibling.textContent = ''});
}
function handleValidate(event) {
  checkInputValidity(event.target)
}

function checkInputValidity(elementInput) {
  const errorElement = document.querySelector(`#error-${elementInput.id}`)
  if (elementInput.type !== 'url') {
    if (elementInput.validity.valueMissing) {
      errorElement.textContent = errorText
      return false
    } else if (elementInput.value.length === 1 || elementInput.value.length > 30) {
      errorElement.textContent = errorLengthText
      return false
    }
  } else {
    if (!elementInput.validity.valid) {
      errorElement.textContent = errorLinkText
      return false
    }
  }
  errorElement.textContent = ''
  return true
}

function setSubmitButtonState(inputs,button) {
  let isValidForm = true;

  inputs.forEach((element) => {
      if (!element.checkValidity()) isValidForm = false;
  });
  if (isValidForm) {
    button.removeAttribute('disabled');
    button.classList.remove('popup__button_disabled')
  } else {
    button.disabled = true;
    button.classList.add('popup__button_disabled')
  }
}