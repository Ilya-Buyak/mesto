(function () {
  const currentName = document.querySelector('.user-info__name');
  const currentJob = document.querySelector('.user-info__job');
  const openNewCardPopup = document.querySelector('.user-info__button');
  const openUserPopup = document.querySelector('.user-info__edit-button');
  const userInfo = new UserInfo(currentName,currentJob)
  const popupImg =  new PopupImg(document.querySelector('#img-popup'))
  const editUserPopup = new PopupWithForm(document.querySelector('#edit-user-info'),formValidator)
  const editUserForm = document.querySelector('#edit-user-info form')
  const newCardPopup = new PopupWithForm(document.querySelector('#add-new-card'),formValidator)
  const newCardForm = document.querySelector('#add-new-card form')


  function placesList () {
    return new CardList(
      document.querySelector('.places-list'),
      initialCards,
      createCard);
  }
  placesList().render()

  function createPopupImg (pictureUrl) {
    return popupImg.createPopup(pictureUrl)
  }

  function createCard (...arg) {
    return new Card(...arg,createPopupImg).create()
  }

  function formValidator (...arg) {
    return new FormValidator(...arg).formValidity()
  }

  openNewCardPopup.addEventListener('click', () => {
    newCardPopup.createAddCardForm()
  })

  openUserPopup.addEventListener('click', () => {
    editUserPopup.createEditUserForm()
  })

  newCardForm.addEventListener('submit',(event) => {
    event.preventDefault()
    const card = {
      name: newCardForm.name.value,
      link: newCardForm.link.value
    }
    placesList().addCard(card)
    newCardPopup.close()
  })

  editUserForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputs = {
      name: editUserForm.name.value,
      job: editUserForm.about.value,
    }
    userInfo.setUserInfo(inputs)
    userInfo.updateUserInfo()
    editUserPopup.close()
  })
})()