'use strict';

class UserInfo {

  constructor(object) {
    this.userName = object.userName;
    this.userJob = object.userJob;
    this._api = object.api;
    this._userAva = object.userAva;
  }

  setUserInfo = (profileNameInput, profileAboutInput) => {
    this._api.editUserInfo(profileNameInput, profileAboutInput)
      .then((res) => {
        this.updateUserInfo(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUserInfo = (res) => {
    this.userName.textContent = res.name;
    this.userJob.textContent = res.about;
    this._userAva.setAttribute('style', `background-image: url(${res.avatar})`);
  }
  
}
