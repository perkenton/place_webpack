'use strict';

class FormValidator {

  constructor(form, errorMessages) {
    this.form = form;
    this.errorMessages = errorMessages;
  }


  _isValid = (input) => {
    input.setCustomValidity('');

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.empty);
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.wrongLength);
      return false;
    }

    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(this.errorMessages.wrongUrl);
      return false;
    }

    return input.checkValidity();
  }

  _isInputValid = (input) => {
    const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
    const valid = this._isValid(input);
    errorElem.textContent = input.validationMessage;
    return valid;
  }

  setSubmitButtonState = (button, state) => {
    if (state) {
      button.removeAttribute('disabled');
      button.classList.add('popup__button_is-active');
    } else {
      button.setAttribute('disabled', '');
      button.classList.remove('popup__button_is-active');
    }
  }

  _handlerInputForm = (event) => {
    const input = event.target;
    const submit = event.currentTarget.querySelector('.button');
    const inputs = [...event.currentTarget.elements].slice(0, -1);

    this._isInputValid(input);

    if (inputs.every(this._isValid)) {
      this.setSubmitButtonState(submit, true);
    } else {
      this.setSubmitButtonState(submit, false);
    }
  }

  resetErrors = (thePopup) => {
    const [...errorElems] = thePopup.querySelectorAll('.input-error');
    errorElems.forEach((elem) => {
      elem.textContent = '';
    });

    const [...inputs] = thePopup.querySelectorAll('.popup__input');
    inputs.forEach((elem) => {
      elem.setCustomValidity('');
    });
  }

  addListener = () => {
    this.form.addEventListener('input', this._handlerInputForm, true);
  }

}
