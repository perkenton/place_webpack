'use strict';

export default class Card {
  constructor(objCard) {
    this.placeName = objCard.placeName;
    this.placeLink = objCard.placeLink;
    this.openPopupImage = objCard.openPopupImage;
  }

  _template = () => {
    const markup = `
      <div class="place-card">
        <div class="place-card__image">
          <button class="place-card__delete-icon"></button>
        </div>
        <div class="place-card__description">
          <h3 class="place-card__name"></h3>
          <button class="place-card__like-icon"></button>
        </div>
      </div>
    `;

    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', markup);
    return element.firstElementChild;
  }

  create = () => {
    this.newCard = this._template();

    this.newCard.querySelector('.place-card__name').textContent = this.placeName;
    this.newCard.querySelector('.place-card__image').setAttribute('style', `background-image: url(${this.placeLink})`);

    this._addListeners();

    return this.newCard;
  }

  _openImage = () => {
    this.openPopupImage(this.placeLink);
  }

  _like = () => {
    this.newCard.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
  }

  _delete = (event) => {
    this._removeListeners();
    this.newCard.remove();
    event.stopPropagation();
  }

  _addListeners = () => {
    this.newCard.querySelector('.place-card__like-icon').addEventListener('click', this._like);
    this.newCard.querySelector('.place-card__delete-icon').addEventListener('click', this._delete);
    this.newCard.querySelector('.place-card__image').addEventListener('click', this._openImage);
  }

  _removeListeners = () => {
    this.newCard.querySelector('.place-card__like-icon').removeEventListener('click', this._like);
    this.newCard.querySelector('.place-card__delete-icon').removeEventListener('click', this._delete);
    this.newCard.querySelector('.place-card__image').removeEventListener('click', this._openImage);
  }

}
