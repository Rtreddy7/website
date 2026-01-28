document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  let animated = false;

  function formatNumber(value, suffix) {
    if (suffix.includes("K")) {
      return Math.floor(value / 1000) + suffix;
    }
    return value + suffix;
  }

  function animateCounters() {
    if (animated) return;

    const section = document.querySelector(".stats-grid");
    const rect = section.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8) {
      animated = true;

      counters.forEach(counter => {
        const target = +counter.dataset.target;
        const suffix = counter.dataset.suffix || "";
        let current = 0;
        const duration = 2000;
        const startTime = performance.now();

        function update(time) {
          const progress = Math.min((time - startTime) / duration, 1);
          current = Math.floor(progress * target);

          counter.textContent = formatNumber(current, suffix);

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = formatNumber(target, suffix);
          }
        }

        requestAnimationFrame(update);
      });
    }
  }

  window.addEventListener("scroll", animateCounters);
  animateCounters();
});


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
