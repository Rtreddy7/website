//about us

document.addEventListener("DOMContentLoaded", () => {
  const abList = document.getElementById("abList");
  if (!abList) return;

  const items = Array.from(abList.children);
  items.forEach(item => abList.appendChild(item.cloneNode(true)));

  let offset = 0;
  const listWidth = abList.scrollWidth / 2;

  function tick() {
    offset -= 0.6;

    if (Math.abs(offset) >= listWidth) {
      offset = 0;
    }

    abList.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(tick);
  }

  tick();
});


const aboutusReviewsData = [
  {
    text: "Oppty’s innovative solutions transformed our business!",
    name: "Arjun Mehta",
    role: "E-Commerce Entrepreneur"
  },
  {
    text: "My new website is everything that I wanted… they started with a plan and executed it.",
    name: "Manpreet",
    role: "Entrepreneur"
  },
  {
    text: "High code quality, understanding of requirements, flexibility, efficiency.",
    name: "Aryan",
    role: "Entrepreneur"
  }
];


const reviewDots = document.querySelectorAll('.aboutus-reviews .dot');
const reviewText = document.querySelector('.aboutus-reviews .review-text');
const reviewName = document.querySelector('.aboutus-reviews .review-name');
const reviewRole = document.querySelector('.aboutus-reviews .review-role');

reviewDots.forEach(dot => {
  dot.addEventListener('click', () => {

    reviewDots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');

    const reviewIndex = Number(dot.dataset.index);

    reviewText.textContent = aboutusReviewsData[reviewIndex].text;
    reviewName.textContent = aboutusReviewsData[reviewIndex].name;
    reviewRole.textContent = aboutusReviewsData[reviewIndex].role;
  });
});