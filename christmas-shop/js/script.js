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

  const timer = document.querySelector('.timer__container');
  

});