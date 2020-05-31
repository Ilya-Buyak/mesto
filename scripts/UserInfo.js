class UserInfo {
  constructor(name, job,inputsElement) {
    this.name = name
    this.job = job
    this.inputsElement = inputsElement
  }

  setUserInfo () {
    this.inputsElement.name.value = this.name.textContent;
    this.inputsElement.about.value = this.job.textContent;
  }

  updateUserInfo () {
    this.name.textContent = this.inputsElement.name.value;
    this.job.textContent = this.inputsElement.about.value
  }
}


