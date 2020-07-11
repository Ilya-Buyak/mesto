export class CardList {
  constructor(options) {
    this.container = options.container;
    this.createCard = options.createCard;
  }

  addCard (elem,userId) {
    this.container.appendChild(this.createCard(elem,userId))
  }
  render (cards,userId)  {
    cards.forEach((elem) => {
      this.addCard(elem,userId)
    })
  }
}