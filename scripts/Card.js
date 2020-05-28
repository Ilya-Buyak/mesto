class Card{
  constructor(elem,createPopupImg) {
    this.elem = elem
    this.createPopupImg = createPopupImg
  }

  create () {
    const template = document.querySelector('#card-template').content.querySelector('.place-card');
    const newCard = template.cloneNode(true);
    newCard.querySelector('.place-card__name').textContent = this.elem.name;
    newCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.elem.link})`
    newCard.querySelector('.place-card__image').dataset.url = this.elem.link;
    this.cardElement = newCard;
    this.likeIcon = this.cardElement.querySelector('.place-card__like-icon')
    this.deleteIcon = this.cardElement.querySelector('.place-card__delete-icon')
    this.picture = this.cardElement.querySelector('.place-card__image')
    this.openPopup = () => this.createPopupImg(this.picture.dataset.url)
    this.setEventListeners()
    return newCard
  }

  setEventListeners () {
    this.likeIcon.addEventListener('click', this.like.bind(this));
    this.likeIcon.addEventListener('touchend', this.like.bind(this));
    this.deleteIcon.addEventListener('click', this.remove.bind(this));
    this.deleteIcon.addEventListener('touchend', this.remove.bind(this));
    this.picture.addEventListener('click', this.openPopup)
  }

  removeEventListeners () {
    this.likeIcon.removeEventListener('click', this.like.bind(this));
    this.likeIcon.removeEventListener('touchend', this.like.bind(this));
    this.deleteIcon.removeEventListener('click', this.remove.bind(this));
    this.deleteIcon.addEventListener('touchend', this.remove.bind(this));
    this.picture.removeEventListener('click', this.openPopup)
  }

  like (event) {
    event.preventDefault()
    this.likeIcon.classList.toggle('place-card__like-icon_liked')
  }

  remove (event) {
    event.preventDefault()
    this.cardElement.remove()
    this.removeEventListeners()
  }
}
