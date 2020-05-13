function getTemplate(data) {
  const template = document.querySelector('#card-template').content.querySelector('.place-card');
  const newCard = template.cloneNode(true);
  newCard.querySelector('.place-card__name').textContent = data.name;
  newCard.querySelector('.place-card__image').style.backgroundImage = `url(${data.link})`
  newCard.querySelector('.place-card__image').dataset.url = data.link;

  return newCard
}
//функция добавления карточки
function render(card) {
  placesList.appendChild(getTemplate(card));
}
// добавление готовых карточек
function addCards() {
  initialCards.forEach(function (card) {
  render(card)
  })
}
addCards()

// добавление карточек через форму
function addUserCard(event) {
  event.preventDefault();
  const card = {
    name : form.name.value,
    link : form.link.value
  }

  render(card)
}

//функция изменения профиля
function editProfile(event) {
  event.preventDefault();
  const name = editForm.name.value;
  const description = editForm.about.value;

  document.querySelector('.user-info__name').textContent = name;
  document.querySelector('.user-info__job').textContent = description;

}

//функция изменения значения инпутов формы
function changeInputValue() {
  const name = editForm.querySelector('#name');
  const description = editForm.querySelector('#about');
  const currentName = document.querySelector('.user-info__name');
  const currentJob = document.querySelector('.user-info__job');

  name.value = currentName.textContent;
  description.value = currentJob.textContent;
}

//взаимодействие с карточками
placesList.addEventListener('click', function(event) {
  const target = event.target
  if (target.classList.contains('place-card__like-icon')) {
    target.classList.toggle('place-card__like-icon_liked');
  }
  else if (target.classList.contains('place-card__delete-icon')) {
    const currentCard = target.closest('.place-card');
    placesList.removeChild(currentCard);
  }
})



/* REVIEW. Резюме.
Хорошая, продуманная работа. Весь функционал, требуемый по заданию, работает.
Сделаны дополнительные задания по скрытию всплывающих окон при нажатии ESC и полная валидация формы карточки.
Сделано удаление обработчиков событий форм.
Но, нужны некоторые исправления.


Что можно улучшить.

+1. Определять стили элементов надо по системе, принятой для проекта - по системе БЭМ (подробности в ревью в файле validate.js).

+2. Лучше инструкцию по добавлению карточки в общий список занести в отдельную функцию и делать вызов этой функции и в
функции рендера карточек, и в функции-обработчике события сабмита формы карточки (подробности в ревью в файле script.js).

3. Код логично разбит на 6 файлов. Это чётче вырисовывает логику проекта. Но, надо иметь в виду, что сейчас, когда переменные и функции
всех шести файлов находятся в глобальной области видимости, ими легко и удобно пользоваться, так как они доступны
друг другу и их не надо передавать как папараметры. Но, глобальная область таит в себе опасность, так как в больших проектах, где очень
много файлов скриптов, может оказаться, что несколько переменных, или функций, имеющих различный смысл, имеют одинаковые имена, что может лишить
проект работоспособности.
Поэтому в профессиональном программировании стараются не помещать переменные и функции в глобальную область видимости, например,
обёртывая весь код скрипта в IIFE-функцию.

Как это делается и что это даёт можно увидеть на следующем примере:

Пусть у Вас в index.html загружается два скрипта друг за другом: script1.js и script2.js. И в script1.js следующий код:

  function arithmetic(a, b){
    return console.log(a + b);
  };
  arithmetic(2, 3);

  А в script2.js следующий код:

  function arithmetic(a, b){
    return console.log(a * b);
  };
  arithmetic(2, 3);

  Скрипт script2.js при загрузке скриптов переопределит функцию arithmetic в первом скрипте, и при выполнении команды arithmetic(2, 3); в первом скрипте,
  будет выполняться умножение, а не сложение. Если бы код первого скрипта был обёрнут в IIFE функцию, например так:

  (function () {
  function arithmetic(a, b){
    return console.log(a + b);
  };
  arithmetic(2, 3);
  })();

переопределения бы не произошло, потому что интерпретатор js посчитал бы, что функции arithmetic в первом и во втором скрипте -
разные функции, так как у них разные обласи видимости (локальная в первом скрипте и глобальная во втором).

Об IIFE функциях можно почитать здесь https://learn.javascript.ru/closures-module , здесь
https://developer.mozilla.org/ru/docs/%D0%A1%D0%BB%D0%BE%D0%B2%D0%B0%D1%80%D1%8C/IIFE и
здесь https://habr.com/ru/company/ruvds/blog/419997/


Что надо исправить.
______________________

+1. Сделать функцию валидации форм validateForm независимой от объекта события event (подробности в ревью в файле validate.js).
+2. Вместо наименования поля link использовать тип поля - "url" (подробности в ревью в файле validate.js).
+3. Функции disabledForm и disabledEditForm имеют практически один и тот же код, поэтому из этих функций надо сделать одну,
введя в неё нужные параметры, чтобы устранить дублирование кода (подробности в ревью в файле validate.js).
+4. Нужно до конца правильной сделать валидацию формы профиля. Сейчас она работает правильно, когда Вы выходите из формы по сабмиту, но,
если выйти из формы по крестику, или ESC, предварительно сделав информацию в полях невалидной, то при повторном входе в форму на ней видны
сообщения об ошибках. оставшиеся от предыдущего неправильного ввода, чего быть не должно, так как на форме при её открытии всегда находится
валидная информация. Поэтому в слушателе открытия формы профиля. нужно производить удаление сообщений об ошибках. Это как раз и можно будет
сделать с помощью вызовов функции валидации форм, когда Вы выполните п. 1 из этой категории.

_____________________________________________________________________________________________________________________________________________

REVIEW2. Резюме2.

Ошибки исправлены, учтены рекомендации.

Что можно улучшить.
1.Можно не определять const url в функции checkInputValidity, а сразу проверять, какой у поля тип.

Задание принято.

Желаю дальнейших успехов в обучении!

*/