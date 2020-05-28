class UserInfo {
  constructor(name, job) {
    this.name = name
    this.job = job
  }

  setUserInfo = (inputs) => {
    this.name = inputs.name;
    this.job = inputs.job;
  }

  updateUserInfo = () => {
    document.querySelector('.user-info__name').textContent = this.name;
    document.querySelector('.user-info__job').textContent = this.job;
  }
}


