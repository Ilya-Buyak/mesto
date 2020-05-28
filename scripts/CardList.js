class CardList {
  constructor(container,cards,card) {
    this.container = container;
    this.cards = cards;
    this.card = card;
  }

  addCard = (elem) => {
    this.container.appendChild(this.card(elem))
  }
  render = () => {
    this.cards.forEach((elem) => {
      this.addCard(elem)
    })
  }
}