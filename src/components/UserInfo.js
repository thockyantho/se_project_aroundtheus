export default class UserInfo {
  constructor(nameElement, descriptionElement, avatarElement) {
    this.nameElement = nameElement;
    this.descriptionElement = descriptionElement;
    this.avatarElement = avatarElement;
  }

  getUserInfo() {
    const userInput = {
      name: this.nameElement.textContent,
      description: this.descriptionElement.textContent,
    };

    return userInput;
  }

  setUserInfo(data) {
    this.nameElement.textContent = data.name;
    this.descriptionElement.textContent = data.description;
  }

  setAvatar(avatar) {
    this.avatarElement.src = avatar;
    this.avatarElement.alt = this.nameElement.textContent;
  }
}
