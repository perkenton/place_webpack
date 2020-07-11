'use strict';

class CardList {

  constructor(container, createCard) {
    this.container = container;
    this.createCard = createCard;
  }

  addCard = (placeName, placeLink) => {
    const card = this.createCard(placeName, placeLink);
    this.container.appendChild(card);
  }

  render = (resArr) => {
    resArr.forEach(place => {
      this.addCard(place.name, place.link);
    });
  }

}
