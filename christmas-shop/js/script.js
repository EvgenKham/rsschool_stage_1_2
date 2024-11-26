document.addEventListener("DOMContentLoaded", function () {

  const WIDTH_SLIDER = 1993;
  const WIDTH_PADDINGS = 16;
  let widthWindow = window.innerWidth;
  let visibleSlider = widthWindow - WIDTH_PADDINGS;
  let [widthClick, countClick] = calculateWidthClick(widthWindow, visibleSlider);

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
  const newYear = 'January 01 2025 00:00:00 GMT+00:00';

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

    const slider = document.querySelector('.slider__row');
    const btnLeft = document.querySelector('.left');
    const btnRight = document.querySelector('.right');

    let click = 0;

    //Action when click the right arrow button
    btnRight.addEventListener('click', (event) => {
      if (event.target === btnRight) {
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
      if (event.target === btnLeft) {
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

});