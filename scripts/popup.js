// открытие popup добавления карточек
openNewCardPopupButton.addEventListener('click', function() {
    popupAddNewCard.classList.add('popup_is-opened');

    setSubmitButtonState(inputsNewCardForm, popupNewCardButton);
    resetErrors (inputsNewCardForm)
    addNewCardListener()
});

//открытие popup редактирования информации пользователя
openEditUserPopupButton.addEventListener('click', function() {
    popupEditUserInfo.classList.add('popup_is-opened');

    changeInputValue()
    resetErrors (inputsEditProfileForm)
    setSubmitButtonState(inputsEditProfileForm, popupEditUserButton)
    addEditUserListener()
});
//закрытие popup
function closePopup(event) {
    if (event.keyCode === 27 ||
      event.target.classList.contains('popup__close') ||
      event.target.classList.contains('popup__button')) {
        popupAddNewCard.classList.remove('popup_is-opened');
        popupEditUserInfo.classList.remove('popup_is-opened');
        removeEditUserListener();
        removeNewCardListener();
        form.reset()
    } if (event.keyCode === 27 ||
        event.target.classList.contains('popup__close')) {
        popupImg.classList.remove('popup-img_is-opened');
    }
}

//открытие попап картинки
placesList.addEventListener('click', function(event) {
    const target = event.target
    if (target.classList.contains('place-card__image')) {
        popupImg.classList.add('popup-img_is-opened');
        popupImgBackground.src = target.dataset.url;
    }
    popupImg.addEventListener('click', closePopup)
    document.addEventListener('keyup', closePopup)
});