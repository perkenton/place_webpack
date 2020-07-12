import Popup from './Popup.js';

'use strict';

export default class PopupImage extends Popup {
  constructor(popupImage) {
    super();
    this.popupImage = popupImage;
  }

  open = (link) => {
    this.popupImage.classList.add('popup_is-opened');
    this.popupImage.querySelector('.popup__image').setAttribute('src', link);
    this.addListeners(this.popupImage);
  }
}