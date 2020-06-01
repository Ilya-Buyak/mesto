class UserInfo{
  constructor(obj) {
    this.name = obj.name
    this.job = obj.job
    this.api = obj.api
    this.formName = obj.editUserForm.name
    this.formJob = obj.editUserForm.about
    this.btn = obj.editUserForm.querySelector('button')
  }

  setUserInfo () {
    this.api.editUser({ name: this.formName.value, job: this.formJob.value })
      .then((res) => {
        this.updateUserInfo(res.name, res.about);
      })
      .then(() => this.btn.textContent = 'Сохранить')
      .catch(err => console.log(err));
  }

  updateUserInfo (name, job) {
    this.name.textContent = name;
    this.job.textContent = job;
  }
}


