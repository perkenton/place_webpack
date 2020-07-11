'use strict';

(function() {
  const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка',
  };

  const placesList = document.querySelector('.places-list');
  const userAva = document.querySelector('.user-info__photo');


  // формы

  const formProfile = document.forms.profile;
  const profileNameInput = formProfile.elements.profileName;
  const profileAboutInput = formProfile.elements.profileAbout;
  const userName = document.querySelector('.user-info__name');
  const userJob = document.querySelector('.user-info__job');

  const formAddNewCard = document.forms.new;


  // валидация 

  const formValidator = new FormValidator();

  new FormValidator(formAddNewCard, errorMessages).addListener();
  new FormValidator(formProfile, errorMessages).addListener();


  // создание и отрисовка карточки

  const createCard = (placeName, placeLink) => {
    return new Card({placeName, placeLink, openPopupImage}).create();
  }
  const cardList = new CardList(placesList, createCard);


  // попапы

  const popup = new Popup();
  const popupNewCard = document.querySelector('.popup_new-card');
  const popupProfile = document.querySelector('.popup_profile');


  const config = {
    url: 'https://praktikum.tk/cohort11/',
    headers: {
      authorization: 'de0a6226-ed6a-44a3-a602-c02f5db2fd29',
      'Content-Type': 'application/json'
    }
  }

  const api = new Api(config);
  const userInfo = new UserInfo({userName, userJob, api, userAva});


  // получение информации о пользователе

  api.getUserInfo()
    .then(res => {
      userInfo.updateUserInfo(res);
    })
    
    .catch((err) => {
      console.log(err);
    });


  // отрисовка карточек при загрузке

  api.getCards()
    .then(res => {
      cardList.render(res);
    })
    .catch((err) => {
      console.log(err);
    });


  // редактирование информации о пользователе

  formProfile.addEventListener('submit', (event) => {
    event.preventDefault();

    userInfo.setUserInfo(profileNameInput.value, profileAboutInput.value);

    popup.close();
  });


  // открытие попапа с картинкой

  const popupImage = document.querySelector('.popup_image');
  const openPopupImage = (link) => new PopupImage(popupImage).open(link);


  // открытие попапа добавления карточки

  document.querySelector('.user-info__button').addEventListener('click', () => {
    formValidator.resetErrors(popupNewCard);
    formValidator.setSubmitButtonState(formAddNewCard.querySelector('.button'), false);
    popup.open(popupNewCard);

    formAddNewCard.elements.name.value = '';
    formAddNewCard.elements.link.value = '';
  });


  // открытие попапа редактирования профиля

  document.querySelector('.user-info__edit-button').addEventListener('click', () => {
    formValidator.resetErrors(popupProfile);
    formValidator.setSubmitButtonState(formProfile.querySelector('.button'), true);
    popup.open(popupProfile);

    profileNameInput.value = document.querySelector('.user-info__name').textContent;
    profileAboutInput.value = document.querySelector('.user-info__job').textContent;
  });


  // добавление новой карточки

  formAddNewCard.addEventListener('submit', (event) => {
    event.preventDefault();

    const placeName = event.target.elements.name;
    const placeLink = event.target.elements.link;

    cardList.addCard(placeName.value, placeLink.value);

    formAddNewCard.reset();
    popup.close();
  });


})();

// Отловил баг. Не понял как он работает, но после открытия и закрытия какого-либо из попапов редактирования профиля или
// добавления карточки перестает закрываться попап с картинкой. Слушатели, которые вешались в общем файле на все попапы
// почему-то прекращали работать на попапе с картинкой. Они висели на всех нужных элементах, но не работали. Поэтому
// переделал работу закрытия попапов: при открытии все слушатели вешаются на попап, при закрытии снимаются. Класс Popup
// 8 и 13 строчки.

/* Главное, что вы сумели решить проблему и теперь все работает корректно. Можете обратиться к наставнику, если 
итересно так сказать "докопаться" до сути проблемы, либо поразбираться самому, это всегда хорошая практика */

/** REVIEW:
 * 
 * В целом по работе: 
 * 
 * Все критические ошибки были исправлены, отличная работа! Спасибо за усилия и старания, 
 * удачи в следующем спринте и успехов в дальнейшем обучении
 * 
 * Можно лучше: 
 * Немного поправила формулировку, надеюсь теперь станет немного понятнее, как лучше сделать 
 * 
      – С замечание согласен, но не понял какие элементы искать в конструкторе. Ведь они добавляются на каждую карточку
      отдельно при ее создании и ищутся относительно нового элемента (карточки) и до этого в разметке их нет.

 * 1) Поиск элементов с классами .place-card__like-icon, .place-card__delete-icon place-card__image и  происходит дважды -
 * в методах _addListeners и _removeListeners  класса Card, лучше всего вынести поиск данных элементов в метод create и 
 * переиспользовать в методах _addListeners и _removeListeners. Также для других элементов соответственно
 */