
//hero-slider
const heroSlides = document.querySelectorAll('.oppty-hero-slide');
let heroIndex = 0;
const duration = 600;

function changeHeroSlide() {
  const currentSlide = heroSlides[heroIndex];

  currentSlide.classList.remove('active');
  currentSlide.classList.add('exit');
  setTimeout(() => {
    currentSlide.classList.remove('exit');

    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add('active');
  }, duration);
}

heroSlides[0].classList.add('active');

setInterval(changeHeroSlide, 5000);



//ot-slider

const otTrack = document.getElementById("otTrack");
const otCards = document.querySelectorAll(".ot-card");
const otDots = document.getElementById("otDots");

const visible = 2;
const total = otCards.length;
let current = 0;
let autoInterval;
let isResetting = false;

function createDots() {
  for (let i = 0; i < total; i++) {
    const d = document.createElement("span");
    d.addEventListener("click", () => {
      current = i;
      moveSlider(true);
      restartAuto();
    });
    otDots.appendChild(d);
  }
}

function updateDots() {
  [...otDots.children].forEach((d, i) => {
    d.classList.toggle("active", i === current);
  });
}

function moveSlider(withAnim = true) {
  const cardWidth = otCards[0].offsetWidth + 40;

  otTrack.style.transition = withAnim
    ? "transform 0.9s ease"
    : "none";

  otTrack.style.transform =
    `translateX(-${current * cardWidth}px)`;

  updateDots();
}

function nextSlide() {
  if (current < total - visible) {
    current++;
    moveSlider(true);
  } else {
    isResetting = true;
    current++;
    moveSlider(true);

    setTimeout(() => {
      otTrack.style.transition = "none";
      current = 0;
      otTrack.style.transform = "translateX(0)";
      updateDots();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          otTrack.style.transition = "transform 0.9s ease";
          isResetting = false;
        });
      });
    }, 900);
  }
}

function startAuto() {
  autoInterval = setInterval(() => {
    if (!isResetting) nextSlide();
  }, 4000);
}

function restartAuto() {
  clearInterval(autoInterval);
  startAuto();
}

createDots();
moveSlider(false);
startAuto();


//ost-slider

const ostList = document.getElementById("ostList")

const items = Array.from(ostList.children)
items.forEach(item => ostList.appendChild(item.cloneNode(true)))

let offset = 0
let listWidth = ostList.scrollWidth / 2

function tick() {
    offset -= 0.6
    if (Math.abs(offset) >= listWidth) offset = 0
    ostList.style.transform = `translateX(${offset}px)`
    requestAnimationFrame(tick)
}

tick()



//partners-slider

const grid = document.querySelector('.oppty-partners-grid');

const track = document.createElement('div');
track.className = 'oppty-partners-grid-track';

const images = Array.from(grid.children);

images.forEach(img => track.appendChild(img));

images.forEach(img => {
    const clone = img.cloneNode(true);
    track.appendChild(clone);
});

grid.innerHTML = '';
grid.appendChild(track);





