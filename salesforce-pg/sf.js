const slider = document.querySelector('.sf-card-row');

let scrollSpeed = 0.4;

slider.innerHTML += slider.innerHTML;

let scrollPosition = 0;

function autoScroll() {
  scrollPosition += scrollSpeed;
  slider.scrollLeft = scrollPosition;

  if (scrollPosition >= slider.scrollWidth / 2) {
    scrollPosition = 0;
  }

  requestAnimationFrame(autoScroll);
}

autoScroll();
