function initPage() {
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".arrow.right");
  const prevBtn = document.querySelector(".arrow.left");
  let index = 0,
    interval;

  function activateSlide(i) {
    slides.forEach((slide) => {
      slide.classList.remove("active");
      slide
        .querySelectorAll(".animate")
        .forEach((el) => el.classList.remove("run"));
    });
    slides[i].classList.add("active");
    setTimeout(() => {
      const a = slides[i].querySelectorAll(".animate");
      if (a[0]) a[0].classList.add("run");
      if (a[1]) setTimeout(() => a[1].classList.add("run"), 200);
    }, 50);
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    activateSlide(index);
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    activateSlide(index);
  }

  nextBtn.onclick = nextSlide;
  prevBtn.onclick = prevSlide;
  interval = setInterval(nextSlide, 6000);

  document.querySelectorAll(".tab-item").forEach((tab) => {
    tab.onclick = () => {
      document
        .querySelectorAll(".tab-item, .tab-content")
        .forEach((el) => el.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(tab.dataset.tab).classList.add("active");
    };
  });

  const statsSection = document.querySelector(".why-choose");
  const counters = document.querySelectorAll(".count");
  let statsDone = false;

  function animateStats() {
    if (!statsSection || statsDone) return;

    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75) {
      counters.forEach((counter) => {
        const target = +counter.dataset.target;
        let current = 0;
        const step = Math.max(1, Math.floor(target / 60));

        function update() {
          current += step;
          if (current >= target) {
            counter.innerText = target;
          } else {
            counter.innerText = current;
            requestAnimationFrame(update);
          }
        }

        update();
      });

      statsDone = true;
    }
  }

  window.addEventListener("scroll", animateStats);
  animateStats();

  const filterButtons = document.querySelectorAll(".portfolio-filters button");
  const serviceItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      serviceItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.classList.remove("hide");
        } else {
          item.classList.add("hide");
        }
      });
    });
  });

  const featuresSection = document.querySelector(".features");
  const featureItems = document.querySelectorAll(".feature-item");
  let featuresDone = false;

  function animateFeatures() {
    if (!featuresSection || featuresDone) return;

    const rect = featuresSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      featuresSection.classList.add("animate-in");
      featuresDone = true;
    }
  }

  window.addEventListener("scroll", animateFeatures);
  animateFeatures();

  const ctaSection = document.querySelector(".cta");
  let ctaDone = false;

  function animateCTA() {
    if (!ctaSection || ctaDone) return;

    const rect = ctaSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      ctaSection.classList.add("animate-in");
      ctaDone = true;
    }
  }

  window.addEventListener("scroll", animateCTA);
  animateCTA();

  const testimonialSlides = document.querySelectorAll(".testimonial-slide");
  const testimonialDots = document.querySelectorAll(".testimonial-dots span");
  let testimonialIndex = 0;
  let testimonialInterval;

  function showTestimonial(i) {
    testimonialSlides.forEach((s) => s.classList.remove("active"));
    testimonialDots.forEach((d) => d.classList.remove("active"));

    testimonialSlides[i].classList.add("active");
    testimonialDots[i].classList.add("active");
    testimonialIndex = i;
  }

  function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonialSlides.length;
    showTestimonial(testimonialIndex);
  }

  testimonialDots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showTestimonial(i);
      clearInterval(testimonialInterval);
      testimonialInterval = setInterval(nextTestimonial, 6000);
    });
  });

  testimonialInterval = setInterval(nextTestimonial, 6000);
}

document.addEventListener("DOMContentLoaded", initPage);
