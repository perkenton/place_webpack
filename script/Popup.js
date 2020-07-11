'use strict';

class Popup {

  open = (popupName) => {
    this.popup = popupName;
    this.popup.classList.add('popup_is-opened');
    this.addListeners(popupName);
  }

  close = () => {
    this.popup.classList.remove('popup_is-opened');
    this._removeListeners();
  }

  _closePopupEverywhere = (event) => {
    if (event.target.classList.contains('popup_is-opened')) {
      this.close();
    }
  }

  _closePopupEscape = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  addListeners = (popupName) => {
    this.popup = popupName;
    this.popup.querySelector('.popup__close').addEventListener('click', this.close);
    this.popup.addEventListener('mousedown', this._closePopupEverywhere);
    document.addEventListener('keydown', this._closePopupEscape);
  }

  _removeListeners = () => {
    this.popup.querySelector('.popup__close').removeEventListener('click', this.close);
    this.popup.addEventListener('mousedown', this._closePopupEverywhere);
    document.addEventListener('keydown', this._closePopupEscape);
  }

}
