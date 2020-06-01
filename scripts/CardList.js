class CardList {
  constructor(container,createCard) {
    this.container = container;
    this.createCard = createCard;
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