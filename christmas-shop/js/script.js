document.addEventListener("DOMContentLoaded", function () {

  //Checking for work only on gifts.html page
  const currentUrl = window.location.href;
  const regexp = /gifts.html$/;
  if (currentUrl.match(regexp)) {
    const pageUp = document.querySelector(".btn-to-up");

    // Show/hide button when scrolling
    window.addEventListener("scroll", function () {
      if (window.scrollY >= 300) {
        pageUp.style.display = "flex";
      } else {
        pageUp.style.display = "none";
      }
    });

    //Move to page of top after clicking the button
    pageUp.addEventListener("click", function () {
      document.documentElement.scrollTop = 0;
    });
  }



});