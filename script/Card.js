'use strict';

class Card {
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
     // - С замечание согласен, но не понял какие элементы искать в конструкторе. Ведь они добавляются на каждую карточку
     // отдельно при ее создании и ищутся относительно нового элемента (карточки) и до этого в разметке их нет.

     /* В таком случае проще всего будет найти данные элементы в методе create, например таким образом:
     this.likeButton = this.newCard.querySelector('.place-card__like-icon'); и использовать likeButton в методах
     _addListeners и _removeListeners. Также для других элементов соответственно */

     /** REVIEW: Можно лучше:
     * 
     * Поиск элементов с классами .place-card__like-icon, .place-card__delete-icon place-card__image и  происходит дважды -
     * в методах _addListeners и _removeListeners, лучше всего вынести поиск данных элементов в конструктор класса,
     * потом использовать в нужных методах. Таким образом код будет выглядеть чище и аккуратнее. 
     */
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
