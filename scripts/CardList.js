class CardList {
  constructor(container,card) {
    this.container = container;
    this.card = card;
  }

  addCard (elem,userId) {
    this.container.appendChild(this.card(elem,userId))
  }
  render (cards,userId)  {
    cards.forEach((elem) => {
      this.addCard(elem,userId)
    })
  }
}