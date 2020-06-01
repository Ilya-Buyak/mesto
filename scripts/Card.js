class Card {
  constructor(elem,id,api,createPopupImg) {
    this.elem = elem
    this.createPopupImg = createPopupImg
    this.like = this.like.bind(this)
    this.remove = this.remove.bind(this)
    this.id = id
    this.api = api
  }

  create () {
    const template = document.querySelector('#card-template').content.querySelector('.place-card');
    const newCard = template.cloneNode(true);
    this.cardElement = newCard;
    this.likeIcon = this.cardElement.querySelector('.place-card__like-icon')
    this.deleteIcon = this.cardElement.querySelector('.place-card__delete-icon')
    this.picture = this.cardElement.querySelector('.place-card__image')
    this.cardElement.dataset.id = this.elem._id
    this.cardElement.querySelector('.place-card__name').textContent = this.elem.name;
    this.likeIcon.classList.add(`${this.isLikedByMe(this.elem.likes,this.id)}`)
    this.picture.style.backgroundImage = `url(${this.elem.link})`
    this.picture.dataset.url = this.elem.link;
    this.deleteIcon.style.display = `${this.isAddedByMe(this.elem,this.id)}`
    this.cardElement.querySelector('.place-card__like-counter').textContent = this.elem.likes.length;
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

  isLikedByMe(allLikes, myId) {
    const isCardLiked = allLikes.some( elem => elem._id === myId );

    if (isCardLiked) {
      return 'place-card__like-icon_liked';
    }
  }

  isAddedByMe(card, myId) {
    if (card.owner._id === myId) {
      return 'block'
    }
  }

  like (event) {
    event.stopPropagation()

    if (this.likeIcon.classList.contains('place-card__like-icon') &&
      !(this.likeIcon.classList.contains('place-card__like-icon_liked'))) {
      this.api.likeCard(this.cardElement, 'PUT')
        .then(res => {
          this.likeIcon.classList.add('place-card__like-icon_liked');
          this.likeIcon.nextElementSibling.textContent = `${res.likes.length}`;
        })
        .catch(err => console.log(err));
    }else if (this.likeIcon.classList.contains('place-card__like-icon_liked')) {
      this.api.likeCard(this.cardElement, 'DELETE')
        .then(res => {
          this.likeIcon.classList.remove('place-card__like-icon_liked');
          this.likeIcon.nextElementSibling.textContent = `${res.likes.length}`;
        })
        .catch(err => console.log(err));
    }
  }

  remove (event) {
    event.stopPropagation()
    if (confirm('Вы действительно хотите удалить карточку?')) {
      this.api.deleteCard(this.cardElement)
        .then(() => this.cardElement.remove())
        .then(() => this.removeEventListeners)
        .catch(err => console.log(err));
    }
  }
}
