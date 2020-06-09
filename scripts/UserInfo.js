class UserInfo{
  constructor(obj) {
    this.name = obj.name
    this.job = obj.job
    this.api = obj.api
    this.formElement = obj.editUserForm
    this.btn = obj.editUserForm.querySelector('button')
    this.popup = obj.editUserPopup()
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


