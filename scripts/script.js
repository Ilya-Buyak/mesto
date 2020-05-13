function getTemplate(data) {
  const template = document.querySelector('#card-template').content.querySelector('.place-card');
  const newCard = template.cloneNode(true);
  newCard.querySelector('.place-card__name').textContent = data.name;
  newCard.querySelector('.place-card__image').style.backgroundImage = `url(${data.link})`
  newCard.querySelector('.place-card__image').dataset.url = data.link;

  return newCard
}
//функция добавления карточки
function render(card) {
  placesList.appendChild(getTemplate(card));
}
// добавление готовых карточек
function addCards() {
  initialCards.forEach(function (card) {
  render(card)
  })
}
addCards()

// добавление карточек через форму
function addUserCard(event) {
  event.preventDefault();
  const card = {
    name : form.name.value,
    link : form.link.value
  }

  render(card)
}

//функция изменения профиля
function editProfile(event) {
  event.preventDefault();
  const name = editForm.name.value;
  const description = editForm.about.value;

  document.querySelector('.user-info__name').textContent = name;
  document.querySelector('.user-info__job').textContent = description;

}

//функция изменения значения инпутов формы
function changeInputValue() {
  const name = editForm.querySelector('#name');
  const description = editForm.querySelector('#about');
  const currentName = document.querySelector('.user-info__name');
  const currentJob = document.querySelector('.user-info__job');

  name.value = currentName.textContent;
  description.value = currentJob.textContent;
}

//взаимодействие с карточками
placesList.addEventListener('click', function(event) {
  const target = event.target
  if (target.classList.contains('place-card__like-icon')) {
    target.classList.toggle('place-card__like-icon_liked');
  }
  else if (target.classList.contains('place-card__delete-icon')) {
    const currentCard = target.closest('.place-card');
    placesList.removeChild(currentCard);
  }
})