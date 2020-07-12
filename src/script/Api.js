'use strict';

export default class Api {
  constructor(config) {
    this.headers = config.headers;
    this.serverUrl = config.serverUrl;
  }


  _fetchPromise = (partOfUrl) => {
    return fetch(`${this.serverUrl}${partOfUrl}`, {
      headers: this.headers
    })

      .then(res => {
        if(res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));

      })
  }

  getCards() {
    return this._fetchPromise(`cards`);
  }

  getUserInfo() {
    return this._fetchPromise(`users/me`);
  }

  editUserInfo(profileName, profileAbout) {
    return fetch(`${this.serverUrl}users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: profileName,
        about: profileAbout
      })
    })

      .then(res => {
        if(res.ok) {
          return res.json();
        }

        return Promise.reject(new Error(`Ошибка: ${res.status}, ${res.statusText}`));
      })  
  }
}