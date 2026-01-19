(function () {
  const awardsSection = document.querySelector(".awards-section");
  let awardsAnimated = false;

  function animateAwardsOnScroll() {
    if (awardsAnimated) return;

    const sectionTop = awardsSection.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 150;

    if (sectionTop < triggerPoint) {
      awardsSection.classList.add("show");
      awardsAnimated = true;
      window.removeEventListener("scroll", animateAwardsOnScroll);
    }
  }

  window.addEventListener("scroll", animateAwardsOnScroll);
})();

(function () {
  const whySection = document.querySelector(".why-oppty-section");
  let animated = false;

  function animateWhySection() {
    if (animated) return;

    const top = whySection.getBoundingClientRect().top;
    const trigger = window.innerHeight - 150;

    if (top < trigger) {
      whySection.classList.add("show");
      animated = true;
      window.removeEventListener("scroll", animateWhySection);
    }
  }

  window.addEventListener("scroll", animateWhySection);
})();

(function () {
  const section = document.querySelector(".partners-section");
  let done = false;

  function animatePartners() {
    if (done) return;

    const top = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 150;

    if (top < triggerPoint) {
      section.classList.add("show");
      done = true;
      window.removeEventListener("scroll", animatePartners);
    }
  }

  window.addEventListener("scroll", animatePartners);
})();

function testimonialSlider() {
  const slides = document.querySelectorAll(".review-item");
  const dots = document.querySelectorAll(".review-dots span");

  if (!slides.length || !dots.length) return;

  let index = 0;
  let interval = null;

  const showSlide = (i) => {
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));

    slides[i].classList.add("active");
    dots[i].classList.add("active");
    index = i;
  };

  const nextSlide = () => {
    index = (index + 1) % slides.length;
    showSlide(index);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      clearInterval(interval);
      interval = setInterval(nextSlide, 6000);
    });
  });

  interval = setInterval(nextSlide, 6000);
}

document.addEventListener("DOMContentLoaded", testimonialSlider);
