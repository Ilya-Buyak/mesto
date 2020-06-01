(function () {
  const avatar = document.querySelector('.user-info__photo')
  const avatarForm = document.querySelector('#edit-user-avatar form')
  const currentName = document.querySelector('.user-info__name');
  const currentJob = document.querySelector('.user-info__job');
  const openNewCardPopup = document.querySelector('.user-info__button');
  const openUserPopup = document.querySelector('.user-info__edit-button');
  const editUserForm = document.querySelector('#edit-user-info form')
  const newCardForm = document.querySelector('#add-new-card form')


  const popupImg = () => new PopupImg(document.querySelector('#img-popup'))
  const newCardPopup = () => new Popup(document.querySelector('#add-new-card'))
  const editUserPopup = () => new Popup(document.querySelector('#edit-user-info'))
  const avatarPopup = () => new Popup(document.querySelector('#edit-user-avatar'))


  const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort11',
    headers: {
      authorization: '46b85523-a3a1-423c-b097-4274578b9eb9',
      'Content-Type': 'application/json'
    }
  });

  function loadPage() {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([user, cards]) => {
        avatar.style.backgroundImage = `url('${user.avatar}')`
        userInfo.updateUserInfo(user.name, user.about);
        placesList().render(cards,user._id);
      })
      .catch(err => console.log(err));
  }

  const userInfo = new UserInfo( {
    name: currentName,
    job: currentJob,
    editUserForm,
    api
  })

  function placesList () {
    return new CardList(
      document.querySelector('.places-list'),
      createCard);
  }
  function createPopupImg (pictureUrl) {
    return popupImg().createPopup(pictureUrl)
  }

  function createCard (...arg) {
    return new Card(...arg,api,createPopupImg).create()
  }

  function formValidator (...arg) {
    return new FormValidator(...arg).formValidity()
  }

  loadPage();

  avatar.addEventListener('click', () => {
    avatarForm.reset()
    avatarPopup().open()
    formValidator(avatarForm)
  })


  openNewCardPopup.addEventListener('click', () => {
    newCardForm.reset()
    newCardPopup().open()
    formValidator(newCardForm)
  })

  openUserPopup.addEventListener('click', () => {
    editUserPopup().open()
    editUserForm.name.value = currentName.textContent
    editUserForm.about.value = currentJob.textContent
    formValidator(editUserForm)
  })

  newCardForm.addEventListener('submit',(event) => {
    event.preventDefault()
    newCardForm.querySelector('button').textContent = 'Загрузка...'
    api.addCard({ name: newCardForm.name.value, link: newCardForm.link.value })
      .then((res) => {
        placesList().addCard(res, res.owner._id);
      })
      .then(() => newCardForm.querySelector('button').textContent = '+')
      .then(newCardPopup().close)
      .catch(err => console.log(err));
  })

  editUserForm.addEventListener('submit', (event) => {
    event.preventDefault()
    editUserForm.querySelector('button').textContent = 'Загрузка...'
    userInfo.setUserInfo()
    editUserPopup().close()
  })

  avatarForm.addEventListener('submit', (event) => {
    event.preventDefault()
    avatarForm.querySelector('button').textContent = 'Загрузка...'
    api.editAvatar(avatarForm.link.value)
      .then((res) => {
        avatar.style.backgroundImage = `url('${res.avatar}')`;
      })
      .then(() => avatarForm.querySelector('button').textContent = 'Сохранить')
      .then(avatarPopup().close)
      .catch(err => console.log(err));
  })
})()