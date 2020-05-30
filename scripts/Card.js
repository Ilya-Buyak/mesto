class Card{
  constructor(elem,createPopupImg) {
    this.elem = elem
    this.createPopupImg = createPopupImg
    this.like = this.like.bind(this)
    this.remove = this.remove.bind(this)
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
    if (window.innerWidth > 768) {
      this.likeIcon.addEventListener('click', this.like);
      this.deleteIcon.addEventListener('click', this.remove);
      this.picture.addEventListener('click', this.openPopup)
    } else {
      this.likeIcon.addEventListener('touchend', this.like);
      this.deleteIcon.addEventListener('touchend', this.remove);
      this.picture.addEventListener('touchend', this.openPopup)
    }
  }

  removeEventListeners () {
    if (window.innerWidth > 768) {
      this.likeIcon.removeEventListener('click', this.like);
      this.deleteIcon.removeEventListener('click', this.remove);
      this.picture.removeEventListener('click', this.openPopup)
    } else {
      this.likeIcon.removeEventListener('touchend', this.like);
      this.deleteIcon.removeEventListener('touchend', this.remove);
      this.picture.removeEventListener('touchend', this.openPopup)
    }
  }

  like () {
    this.likeIcon.classList.toggle('place-card__like-icon_liked')
  }

  remove () {
    this.cardElement.remove()
    this.removeEventListeners()
  }
}
