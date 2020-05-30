class UserInfo {
  constructor(name, job) {
    this.name = name
    this.job = job
  }

  setUserInfo (inputElement) {
    this.name = inputElement.name;
    this.job = inputElement.job;
  }

  updateUserInfo () {
    document.querySelector('.user-info__name').textContent = this.name;
    document.querySelector('.user-info__job').textContent = this.job;
  }
}


