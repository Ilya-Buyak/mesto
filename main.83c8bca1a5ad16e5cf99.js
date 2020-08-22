!function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([function(e,t,r){},function(e,t,r){"use strict";r.r(t);r(0);class s{constructor(e){this.baseUrl=e.baseUrl,this.headers=e.headers}getUserInfo(){return fetch(this.baseUrl+"/users/me",{headers:this.headers}).then(e=>e.ok?e.json():Promise.reject("Ошибка: "+e.status))}getCards(){return fetch(this.baseUrl+"/cards",{headers:this.headers}).then(e=>e.ok?e.json():Promise.reject("Ошибка: "+e.status))}editUser(e){return fetch(this.baseUrl+"/users/me",{method:"PATCH",headers:this.headers,body:JSON.stringify({name:e.name,about:e.job})}).then(e=>e.ok?e.json():Promise.reject("Ошибка: "+e.status))}addCard(e){return fetch(this.baseUrl+"/cards",{method:"POST",headers:this.headers,body:JSON.stringify({name:e.name,link:e.link})}).then(e=>e.ok?e.json():Promise.reject("Ошибка: "+e.status))}deleteCard(e){return fetch(`${this.baseUrl}/cards/${e.dataset.id}`,{method:"DELETE",headers:this.headers,body:JSON.stringify({_id:e.dataset.id})}).then(e=>e.ok?e.json():Promise.reject("Ошибка: "+e.status))}likeCard(e,t){return fetch(`${this.baseUrl}/cards/like/${e.dataset.id}`,{method:""+t,headers:this.headers,body:JSON.stringify({likes:e.likes})}).then(e=>e.ok?e.json():Promise.reject("Ошибка: "+e.status))}editAvatar(e){return fetch(this.baseUrl+"/users/me/avatar",{method:"PATCH",headers:this.headers,body:JSON.stringify({avatar:e})}).then(e=>e.ok?e.json():Promise.reject("Ошибка: "+e.status))}}class n{constructor(e,t,r,s){this.elem=e,this.createPopupImg=s,this.like=this.like.bind(this),this.remove=this.remove.bind(this),this.id=t,this.api=r}create(){const e=document.querySelector("#card-template").content.querySelector(".place-card").cloneNode(!0);return this.cardElement=e,this.likeIcon=this.cardElement.querySelector(".place-card__like-icon"),this.deleteIcon=this.cardElement.querySelector(".place-card__delete-icon"),this.picture=this.cardElement.querySelector(".place-card__image"),this.cardElement.dataset.id=this.elem._id,this.cardElement.querySelector(".place-card__name").textContent=this.elem.name,this.likeIcon.classList.add(""+this.isLikedByMe(this.elem.likes,this.id)),this.picture.style.backgroundImage=`url(${this.elem.link})`,this.picture.dataset.url=this.elem.link,this.deleteIcon.style.display=""+this.isAddedByMe(this.elem,this.id),this.cardElement.querySelector(".place-card__like-counter").textContent=this.elem.likes.length,this.openPopup=()=>this.createPopupImg(this.picture.dataset.url),this.setEventListeners(),e}setEventListeners(){this.likeIcon.addEventListener("click",this.like),this.deleteIcon.addEventListener("click",this.remove),this.picture.addEventListener("click",this.openPopup)}removeEventListeners(){this.likeIcon.removeEventListener("click",this.like),this.deleteIcon.removeEventListener("click",this.remove),this.picture.removeEventListener("click",this.openPopup)}isLikedByMe(e,t){if(e.some(e=>e._id===t))return"place-card__like-icon_liked"}isAddedByMe(e,t){if(e.owner._id===t)return"block"}like(e){e.stopPropagation(),this.likeIcon.classList.contains("place-card__like-icon_liked")?this.likeIcon.classList.contains("place-card__like-icon_liked")&&this.api.likeCard(this.cardElement,"DELETE").then(e=>{this.likeIcon.classList.remove("place-card__like-icon_liked"),this.likeIcon.nextElementSibling.textContent=""+e.likes.length}).catch(e=>console.log(e)):this.api.likeCard(this.cardElement,"PUT").then(e=>{this.likeIcon.classList.add("place-card__like-icon_liked"),this.likeIcon.nextElementSibling.textContent=""+e.likes.length}).catch(e=>console.log(e))}remove(e){e.stopPropagation(),confirm("Вы действительно хотите удалить карточку?")&&this.api.deleteCard(this.cardElement).then(()=>this.cardElement.remove()).then(()=>this.removeEventListeners).catch(e=>console.log(e))}}class i{constructor(e){this.container=e.container,this.createCard=e.createCard}addCard(e,t){this.container.appendChild(this.createCard(e,t))}render(e,t){e.forEach(e=>{this.addCard(e,t)})}}class o{constructor(e){this.form=e}resetErrors(){this.inputs=Array.from(this.form.querySelectorAll("input")),this.inputs.forEach(e=>{e.nextElementSibling.textContent=""})}checkInputValidity(e){if(this.errorElement=this.form.querySelector("#error-"+e.id),"url"!==e.type){if(e.validity.valueMissing)return this.errorElement.textContent="Это обязательное поле",!1;if(1===e.value.length||e.value.length>30)return this.errorElement.textContent="Должно быть от 2 до 30 символов",!1}else if(!e.validity.valid)return this.errorElement.textContent="Здесь должна быть ссылка",!1;return this.errorElement.textContent="",!0}handleValidate(e){this.checkInputValidity(e.target),this.setSubmitButtonState()}setSubmitButtonState(){let e=!0;this.inputs=Array.from(this.form.querySelectorAll("input")),this.btn=this.form.querySelector(".button"),this.inputs.forEach(t=>{t.checkValidity()||(e=!1)}),e?(this.btn.removeAttribute("disabled"),this.btn.classList.remove("popup__button_disabled")):(this.btn.disabled=!0,this.btn.classList.add("popup__button_disabled"))}formValidity(){this.setSubmitButtonState(),this.resetErrors(),this.form.addEventListener("input",this.handleValidate.bind(this))}}class a{constructor(e){this.popupElement=e,this.close=this.close.bind(this),this.closeByEsc=this.closeByEsc.bind(this)}closeByEsc(e){"Escape"===e.key&&this.close()}setEventListeners(){document.addEventListener("keyup",this.closeByEsc),window.innerWidth>768?this.popupElement.querySelector(".popup__close").addEventListener("click",this.close):this.popupElement.querySelector(".popup__close").addEventListener("touchend",this.close)}open(){this.popupElement.classList.add("popup_is-opened"),this.setEventListeners()}close(){this.popupElement.classList.remove("popup_is-opened"),document.removeEventListener("keyup",this.closeByEsc)}}class c extends a{constructor(e){super(e)}createPopup(e){this.background=this.popupElement.querySelector(".popup-img__background"),this.background.src=e,this.open()}}class l{constructor(e){this.name=e.name,this.job=e.job,this.api=e.api,this.formElement=e.editUserForm,this.btn=e.editUserForm.querySelector("button"),this.popup=e.editUserPopup()}setUserInfo(){this.api.editUser({name:this.formElement.name.value,job:this.formElement.about.value}).then(e=>{this.updateUserInfo(e.name,e.about)}).then(()=>{this.btn.textContent="Сохранить",this.popup.close()}).catch(e=>console.log(e))}updateUserInfo(e,t){this.name.textContent=e,this.job.textContent=t}}!function(){const e=document.querySelector(".user-info__photo"),t=document.querySelector("#edit-user-avatar form"),r=document.querySelector(".user-info__name"),d=document.querySelector(".user-info__job"),u=document.querySelector(".user-info__button"),h=document.querySelector(".user-info__edit-button"),p=document.querySelector("#edit-user-info form"),m=document.querySelector("#add-new-card form"),b=()=>new a(document.querySelector("#add-new-card")),f=()=>new a(document.querySelector("#edit-user-info")),y=()=>new a(document.querySelector("#edit-user-avatar")),k=new s({baseUrl:"https://nomoreparties.co/cohort11",headers:{authorization:"46b85523-a3a1-423c-b097-4274578b9eb9","Content-Type":"application/json"}});const v=new l({name:r,job:d,editUserForm:p,api:k,editUserPopup:f});function E(){return new i({container:document.querySelector(".places-list"),createCard:S})}function _(e){return new c(document.querySelector("#img-popup")).createPopup(e)}function S(...e){return new n(...e,k,_).create()}function g(...e){return new o(...e).formValidity()}Promise.all([k.getUserInfo(),k.getCards()]).then(([t,r])=>{e.style.backgroundImage=`url('${t.avatar}')`,v.updateUserInfo(t.name,t.about),E().render(r,t._id)}).catch(e=>console.log(e)),e.addEventListener("click",()=>{t.reset(),y().open(),g(t)}),u.addEventListener("click",()=>{m.reset(),b().open(),g(m)}),h.addEventListener("click",()=>{f().open(),p.name.value=r.textContent,p.about.value=d.textContent,g(p)}),m.addEventListener("submit",e=>{e.preventDefault(),m.querySelector("button").textContent="Загрузка...",k.addCard({name:m.name.value,link:m.link.value}).then(e=>{E().addCard(e,e.owner._id)}).then(()=>m.querySelector("button").textContent="+").then(b().close).catch(e=>console.log(e))}),p.addEventListener("submit",e=>{e.preventDefault(),p.querySelector("button").textContent="Загрузка...",v.setUserInfo()}),t.addEventListener("submit",r=>{r.preventDefault(),t.querySelector("button").textContent="Загрузка...",k.editAvatar(t.link.value).then(r=>{e.style.backgroundImage=`url('${r.avatar}')`,t.querySelector("button").textContent="Сохранить",y().close()}).catch(e=>console.log(e))})}()}]);