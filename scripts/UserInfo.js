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
      /*REVIEW. Надо исправить. Нашла всё-таки одну ошибочку у Вас)(. Форма профиля закроется раньше, чем придёт какой-либо ответ от сервера,
 а нужно, чтобы она закрылась после того, как придёт успешный ответ, а если придёт неуспешный и попадёт в блок .catch, форма вообще не
 должна закрыаться, Вы в этом случае сможете предложить пользователю попробовать ещё раз, или он выйдет из формы по крестику.
 Так вот, чтобы получилось закрытие именно по такой схеме, как я описала, инструкцию закрытия надо поместить во второй метод .then(в принципе,
 достаточно и одного метода then для обработки асинхронного ответа), туда, где сейчас я эту инструкцию закоментировала, а оттуда,
 где она сейчас у Вас находится в index.js, эту инструкцию надо убрать. Закрытие у Вас происходит раньше ответа, потому что ответ сервера асинхронен,
 он придёт не сразу после вызова api.editUser, и пока он не пришёл выполнятся все инструкции, лежащие вне метода then асинхронной обработки
 успешного ответа, так как только метод then ждёт ответа сервера, приостановив выполнение своих инструкций до прихода этого ответа.
 */
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


