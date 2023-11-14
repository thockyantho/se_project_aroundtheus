export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkRequest(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkRequest);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(this._checkRequest);
  }

  getUserInfoAndCards() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .then(([userInfo, cards]) => {
        return { userInfo, cards };
      })
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  updateProfileInfo(inputValues) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: inputValues.name,
        about: inputValues.about,
      }),
    }).then(this._checkRequest);
  }

  addNewCard(inputValues) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(inputValues),
    }).then(this._checkRequest);
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkRequest);
  }

  addingLike(cardId) {
    return fetch(`${baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkRequest);
  }

  removingLike(cardId) {
    return fetch(`${baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._checkRequest);
  }

  updatingAvatar(newAvatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: newAvatar,
      }),
    }).then(this._checkRequest);
  }

  updatingLikeStatus(isLiked, cardId) {
    if (isLiked) {
      return this.deletingLikes(cardId);
    } else {
      return this.addingLikes(cardId);
    }
  }
}
