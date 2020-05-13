// добавление слушателей на popup добавления карточек
function addNewCardListener() {
    document.addEventListener('keyup', closePopup);
    popupAddNewCard.addEventListener('click', closePopup);
    popupNewCardButton.addEventListener('click', addUserCard);
    form.addEventListener('input', setSubmitNewCardButtonState)
    form.addEventListener('input', handleValidate);
}

// удаление слушателей popup добавления карточек
function removeNewCardListener() {
    document.removeEventListener('keyup', closePopup);
    popupAddNewCard.removeEventListener('click', closePopup);
    popupNewCardButton.removeEventListener('input', setSubmitNewCardButtonState)
    form.removeEventListener('input', handleValidate);
    form.removeEventListener('click', addUserCard);
}
// добавление слушателей на popup редактирования пользователя
function addEditUserListener() {
    document.addEventListener('keyup', closePopup);
    popupEditUserInfo.addEventListener('click', closePopup);
    popupEditUserButton.addEventListener('click', editProfile);
    editForm.addEventListener('input', setSubmitEditUserButtonState)
    editForm.addEventListener('input', handleValidate)
}
// удаление слушателей с popup редактирования пользователя
function removeEditUserListener() {
    document.removeEventListener('keyup', closePopup);
    popupEditUserInfo.removeEventListener('click', closePopup);
    editForm.removeEventListener('input', setSubmitEditUserButtonState)
    editForm.removeEventListener('input', handleValidate);
    popupEditUserButton.removeEventListener('click', editProfile);
}