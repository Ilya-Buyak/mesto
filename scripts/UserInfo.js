class UserInfo{
  constructor(options) {
    this.name = options.name
    this.job = options.job
    this.api = options.api
    this.formElement = options.editUserForm
    this.btn = options.editUserForm.querySelector('button')
    this.popup = options.editUserPopup()
  }

  setUserInfo () {
    this.api.editUser({ name: this.formElement.name.value, job: this.formElement.about.value })
      .then((res) => {
        this.updateUserInfo(res.name, res.about);
      })
      .then(() => {
        this.btn.textContent = 'Сохранить';
        this.popup.close()
      })
      .catch(err => console.log(err));
  }

  updateUserInfo (name, job) {
    this.name.textContent = name;
    this.job.textContent = job;
  }
}


