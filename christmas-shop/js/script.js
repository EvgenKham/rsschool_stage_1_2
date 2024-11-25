document.addEventListener("DOMContentLoaded", function () {

  const menu = document.querySelector('.header__nav');
  const menuItem = document.querySelectorAll('.nav-menu__item');
  const burger = document.querySelector('.burger');
  const body = document.body;

  //Open/close navigation menu
  body.addEventListener('click', (e) => {
    if (e.target === burger) {
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
  const regexp = '.*gifts\.html.*';
  if (currentUrl.match(regexp)) {
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
  const newYear = 'January 01 2025 00:00:00 GMT+00:00';

  function getTime(end){
    let total = Date.parse(end) - Date.parse(new Date());
    let seconds = Math.floor( (total / 1000) % 60 );
    let minutes = Math.floor( (total / 1000 / 60) % 60 );
    let hours = Math.floor( (total / (1000 * 60 * 60)) % 24 );
    let days = Math.floor( total / (1000 * 60 * 60 * 24) );
    return [days, hours, minutes, seconds];
  }

  setInterval(() => {
    const [days, hours, minutes, seconds] = getTime(newYear);
    day.innerHTML = days;
    hour.innerHTML = hours;
    minute.innerHTML = minutes;
    second.innerHTML = seconds;
  },1000)

  const slider = document.querySelector('.slider__row');
  const btnLeft = document.querySelector('.left');
  const btnRight = document.querySelector('.right');

  let widthMove = 0;

  btnRight.addEventListener('click', () => {
    console.log(slider);
    btnLeft.classList.remove('btn-disable');
    slider.style.transform = `translateX(-${widthMove += 25}%)`;
  });

  btnLeft.addEventListener('click', () => {
    console.log(slider);
    btnLeft.classList.remove('btn-disable');
    slider.style.transform = `translateX(-${widthMove -= 25}%)`;
  });
  
});