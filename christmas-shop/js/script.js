import gifts from './gifts.json' with { type: "json" };

console.log(gifts);

document.addEventListener("DOMContentLoaded", function () {

  const WIDTH_SLIDER = 1993;
  const WIDTH_PADDINGS = 16;
  let widthWindow = window.innerWidth;
  let visibleSlider = widthWindow - WIDTH_PADDINGS;
  let [widthClick, countClick] = calculateWidthClick(widthWindow, visibleSlider);

  const menu = document.querySelector('.header__nav');
  const menuItem = document.querySelectorAll('.nav-menu__item');
  const burger = document.querySelector('.burger');
  const burgerLines = document.querySelectorAll('.burger__line');
  const body = document.body;
  const bestGiftsContainer = document.querySelector('.best-gifts__card-container');
  const giftsContainer = document.querySelector('.gifts__card-container');
  const tabsContainer = document.querySelector('.gifts__tabs');

  if (bestGiftsContainer) {
    bestGiftsContainer.append(generateCards(4));
  }

  if (giftsContainer) {
    giftsContainer.append(generateCards(36));
  }

  //Open/close navigation menu
  burger.addEventListener('click', (e) => {
    if (e.target === burger || e.target.closest('.burger')){
      burger.classList.toggle('burger_active');
      menu.classList.toggle('header__nav_active');
      //Allow/forbid scroll while nav menu is open
      body.classList.toggle('stop-scroll');
    }
  });

  //Open/close navigation menu when click link of them
  menuItem.forEach(item => {
    item.addEventListener('click', () => {
      burger.classList.toggle('burger_active');
      menu.classList.toggle('header__nav_active');
      //Allow/forbid scroll while nav menu is close
      body.classList.toggle('stop-scroll');
    })
  });

  //Checking for work only on gifts.html page
  const currentUrl = window.location.href;
  const regexpGifts = '.*gifts\.html.*';
  if (currentUrl.match(regexpGifts)) {
    const pageUp = document.querySelector('.btn-to-up');

    //Show/hide button when scrolling
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 300) {
        pageUp.style.display = 'flex';
      } else {
        pageUp.style.display = 'none';
      }
    });

    //Move to page of top after clicking the button
    pageUp.addEventListener("click", () => {
      document.documentElement.scrollTop = 0;
    });
  }

  const day = document.querySelector('#days');
  const hour = document.querySelector('#hours');
  const minute = document.querySelector('#minutes');
  const second = document.querySelector('#seconds');

  //Set the date of new year to UTC+0
  const newYear = 'January 01 2026 00:00:00 GMT+03:00';

  function getTime(end){
    let total = Date.parse(end) - Date.parse(new Date());
    let seconds = Math.floor( (total / 1000) % 60 );
    let minutes = Math.floor( (total / 1000 / 60) % 60 );
    let hours = Math.floor( (total / (1000 * 60 * 60)) % 24 );
    let days = Math.floor( total / (1000 * 60 * 60 * 24) );
    return [days, hours, minutes, seconds];
  }

  //Checking for work only on index.html page
  const regexpHome = '.*index\.html.*';
  if (currentUrl.match(regexpHome)) {
    setInterval(() => {
      const [days, hours, minutes, seconds] = getTime(newYear);
      day.innerHTML = days;
      hour.innerHTML = hours;
      minute.innerHTML = minutes;
      second.innerHTML = seconds;
    },1000)

  }

  const slider = document.querySelector('.slider__row');
  const btnLeft = document.querySelector('.left');
  const btnRight = document.querySelector('.right');

  let click = 0;

  //Checking for work only on Home page
  if (btnLeft && btnRight) {

      //Action when click the right arrow button
    btnRight.addEventListener('click', (event) => {
      if (event.target === btnRight || event.target.closest('.right')) {
        click++;
        if (click > 0 && click <= countClick ){
          btnLeft.classList.remove('btn-disable');
          slider.style.transform = `translateX(-${widthClick * click}px)`;
        }
        if (click === countClick) {
          btnRight.classList.add('btn-disable');
        }
      }
    });

    //Action when click the left arrow button
    btnLeft.addEventListener('click', (event) => {
      if (event.target === btnLeft || event.target.closest('.left')) {
        click--;
        if (click => 0 && click < countClick ){
          btnRight.classList.remove('btn-disable');
          slider.style.transform = `translateX(-${widthClick * click}px)`;
        }
        if (click === 0) {
          btnLeft.classList.add('btn-disable');
        }
      }
    });
  }

  //Calculate the width of one click depends on width of window
  function calculateWidthClick (widthWindow, visibleSlider) {
    let width = 0;
    let count = 0;

    if (widthWindow > 768) {
      if (widthWindow > 1292) {
        widthWindow = 1292;
        visibleSlider = widthWindow - WIDTH_PADDINGS;
      }
      width = Math.floor((WIDTH_SLIDER - visibleSlider) / 3);
      count = 3;
    } else {
      width = Math.floor((WIDTH_SLIDER - visibleSlider) / 6);
      count = 6;
    }
    return [width, count];
  }

  //Reset slider when change width of window
  window.addEventListener('resize', () => {
    widthWindow = window.innerWidth;
    visibleSlider = widthWindow - WIDTH_PADDINGS;
    [widthClick, countClick] = calculateWidthClick(widthWindow, visibleSlider);
    slider.style.transform = `translateX(0px)`;
    btnLeft.classList.add('btn-disable');
    btnRight.classList.remove('btn-disable');
    click = 0;
  })

  const cards = document.querySelectorAll('.card');
  const popup = document.querySelector('.popup');
  const popupOverlay = document.querySelector('.popup__overlay');
  const closePopup = document.querySelector('.popup__close');

  //Open popup if click on card with extra info
  cards.forEach(item => item.addEventListener('click', () => {
    const cardImg = item.firstElementChild.src;
    const cardName = item.lastElementChild.lastElementChild.textContent;
    createPopup(cardImg, cardName);

    popupOverlay.classList.add('popup__active');
    //Allow/forbid scroll while nav menu is open
    body.classList.add('stop-scroll');
  }));

  //Close popup if click on cross button
  closePopup.addEventListener('click', () => {
    popupOverlay.classList.remove('popup__active');
    //Allow/forbid scroll while nav menu is open
    body.classList.remove('stop-scroll');
  });

  //Close popup if click on overlay
  body.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__overlay')){
      popupOverlay.classList.remove('popup__active');
      body.classList.remove('stop-scroll');
    }
  });

  //Create popup
  function createPopup(image, name) {
    const popupImg = document.querySelector('.popup__img');
    const popupCategory = document.querySelector('.popup__category');
    const popupName = document.querySelector('.popup__name');
    const popupSub = document.querySelector('.popup__subscription');
    const superpowersName = document.querySelectorAll('.superpowers__name');

    //Checking
    gifts.forEach(gift => {
      if ((gift.name).toLocaleLowerCase() == name.toLocaleLowerCase()) {
        popupImg.src = image;
        popupCategory.textContent = gift.category;
        //Take the second word from category in order to dye category word
        let category = gift.category.split(' ')[1].toLocaleLowerCase();

        //Reset and dye category
        if ( category === 'work'){
          popupCategory.classList.add(category);
          popupCategory.classList.remove('health');
          popupCategory.classList.remove('harmony');
        }
        if ( category === 'health'){
          popupCategory.classList.add(category);
          popupCategory.classList.remove('work');
          popupCategory.classList.remove('harmony');
        }
        if ( category === 'harmony'){
          popupCategory.classList.add(category);
          popupCategory.classList.remove('work');
          popupCategory.classList.remove('health');
        }

        popupName.textContent = name;
        popupSub.textContent = gift.description;

        //Add amount of power & dye snowflake depend on values from gifts
        superpowersName.forEach(name => {
          for (let key in gift.superpowers){
            if (name.textContent.toLocaleLowerCase() === key) {

              const amount = name.nextElementSibling;
              amount.textContent = gift.superpowers[key];
              const activeSnowflake = gift.superpowers[key].slice(1, 2);

              //Change snowflakes depend on amount before
              const snowflakes = amount.nextElementSibling;
              [...snowflakes.children].forEach(flake => flake.classList.remove('snowflake', 'snowflake_no-active'));
              [...snowflakes.children].forEach((flake, index) => {
                if ((index + 1) <= activeSnowflake){
                  flake.classList.add('snowflake');
                } else {
                  flake.classList.add('snowflake_no-active');
                }
              })
            }
          }
        });
      }
    });
  }

  //Create one card depend on name and category
  function createCard(category, name) {
    let cat = category.split(' ')[1].toLocaleLowerCase();

    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.classList.add('card__image');
    image.src = `assets/images/gift-for-${cat}.png`;
    image.alt = `gift-for-${cat}`;
    card.appendChild(image);

    const cardText = document.createElement('div');
    cardText.classList.add('card__text');

    const header4 = document.createElement('h4');
    header4.classList.add('header-4', 'card__category', cat);
    header4.textContent = category;
    cardText.appendChild(header4);

    const header3 = document.createElement('h3');
    header3.classList.add('header-3', 'card__name');
    header3.textContent = name;
    cardText.appendChild(header3);

    card.appendChild(cardText);

    return card;
  }

  //Get unique random numbers from 0 to length of gifts
  function getRandomNumbers(count) {
    let randomNumbers = [];

    for (let i = 0; randomNumbers.length < count; i++){
      let number = Math.floor(Math.random() * (gifts.length));
      if (randomNumbers.includes(number)){
          continue;
      }
      randomNumbers.push(number);
    }
    return randomNumbers;
  }

  //Generate card container depend on count
  function generateCards (count) {
    let numbers = [];

    if (count === 4) {
      numbers = getRandomNumbers(count);
    } else {
      numbers = [...Array(count).keys() ].map( i => i++);
    }

    let fragment = new DocumentFragment();

    numbers.forEach(item => {
      const category = gifts[item].category;
      const name = gifts[item].name;
      const card = createCard(category, name);
      fragment.append(card);
    });

    return fragment;
  }

  //Show cards depend on chosen category
  if (tabsContainer) {
    tabsContainer.addEventListener('click', (event) => {

      //Get chosen catagory
      const tabCategory = event.target.textContent.toLowerCase();

      //Delete active status all tabs and add active status chosen tab
      // const tabs = document.querySelectorAll('.tab-item');
      [...tabsContainer.children].forEach(tab => tab.classList.remove('active-tab'));
      event.target.classList.add('active-tab');

      const cardsCategory = document.querySelectorAll('.card__category');
      const cards = document.querySelectorAll('.card');

      //Before activate chosen category reset old action
      cards.forEach(item => item.style.display = 'block');

      //Activate cards
      if (tabCategory === 'all') {
          [...giftsContainer.children].forEach(item => item.style.display = 'block');
      } else {
        [...cardsCategory].forEach(category => {
          if (category.textContent.toLowerCase() !== tabCategory) {
            const card = category.closest('.card');
            card.style.display = 'none';
          }
        });
      }
    });
  }

});