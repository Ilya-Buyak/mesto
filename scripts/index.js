(function () {
  const currentName = document.querySelector('.user-info__name');
  const currentJob = document.querySelector('.user-info__job');
  const openNewCardPopup = document.querySelector('.user-info__button');
  const openUserPopup = document.querySelector('.user-info__edit-button');
  const editUserForm = document.querySelector('#edit-user-info form')
  const newCardForm = document.querySelector('#add-new-card form')

  const userInfo = () => new UserInfo(currentName,currentJob,editUserForm)
  const popupImg = () => new PopupImg(document.querySelector('#img-popup'))
  const newCardPopup = () => new Popup(document.querySelector('#add-new-card'))
  const editUserPopup = () => new Popup(document.querySelector('#edit-user-info'))


  function placesList () {
    return new CardList(
      document.querySelector('.places-list'),
      initialCards,
      createCard);
  }
  placesList().render()

  function createPopupImg (pictureUrl) {
    return popupImg().createPopup(pictureUrl)
  }

  function createCard (...arg) {
    return new Card(...arg,createPopupImg).create()
  }

  function formValidator (...arg) {
    return new FormValidator(...arg).formValidity()
  }

  openNewCardPopup.addEventListener('click', () => {
    newCardForm.reset()
    newCardPopup().open()
    formValidator(newCardForm)
  })

  openUserPopup.addEventListener('click', () => {
    userInfo().setUserInfo()
    editUserPopup().open()
    formValidator(editUserForm)
  })

  newCardForm.addEventListener('submit',(event) => {
    event.preventDefault()
    const card = {
      name: newCardForm.name.value,
      link: newCardForm.link.value
    }
    placesList().addCard(card)
    newCardPopup().close()
  })

  editUserForm.addEventListener('submit', (event) => {
    event.preventDefault()
    userInfo().updateUserInfo()
    editUserPopup().close()
  })
})()