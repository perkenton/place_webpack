'use strict';

class Api {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }


  _fetchPromise = (partOfUrl) => {
    return fetch(`${this.url}${partOfUrl}`, {
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
    return fetch(`${this.url}users/me`, {
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