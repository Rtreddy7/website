//hero-slider
document.addEventListener("DOMContentLoaded", function () {

  (function () {
    const hero = document.querySelector(".hero");
    if (!hero) {
      return;
    }

    const contentSlides = hero.querySelectorAll(".content-slide");
    const imageSlides = hero.querySelectorAll(".image-slide");
    const indicators = hero.querySelectorAll(".indicator");

    let current = 0;
    let isAnimating = false;
    let autoSlide = null;
    const total = contentSlides.length;
    const delay = 5000;
    const animationDuration = 800;

    function showSlide(nextIndex) {
      if (isAnimating) {
        return;
      }

      isAnimating = true;

      contentSlides[current].classList.remove("active");
      imageSlides[current].classList.remove("active");

      contentSlides[current].classList.add("exit");
      imageSlides[current].classList.add("exit");

      indicators[current].classList.remove("active");

      setTimeout(function () {
        contentSlides[current].classList.remove("exit");
        imageSlides[current].classList.remove("exit");

        current = nextIndex;

        requestAnimationFrame(function () {
          contentSlides[current].classList.add("active");
          imageSlides[current].classList.add("active");
          indicators[current].classList.add("active");
        });

        isAnimating = false;
      }, animationDuration);
    }

    function startAutoSlide() {
      autoSlide = setInterval(function () {
        let next = current + 1;
        if (next >= total) {
          next = 0;
        }
        showSlide(next);
      }, delay);
    }

    function stopAutoSlide() {
      if (autoSlide !== null) {
        clearInterval(autoSlide);
        autoSlide = null;
      }
    }

    indicators.forEach(function (indicator, index) {
      indicator.addEventListener("click", function () {
        if (index === current) {
          return;
        }
        stopAutoSlide();
        showSlide(index);
        startAutoSlide();
      });
    });

    hero.addEventListener("mouseenter", stopAutoSlide);
    hero.addEventListener("mouseleave", startAutoSlide);

    let startX = 0;
    let endX = 0;

    hero.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
    });

    hero.addEventListener("touchend", function (e) {
      endX = e.changedTouches[0].clientX;

      if (startX - endX > 50) {
        let next = current + 1;
        if (next >= total) {
          next = 0;
        }
        showSlide(next);
      }

      if (endX - startX > 50) {
        let prev = current - 1;
        if (prev < 0) {
          prev = total - 1;
        }
        showSlide(prev);
      }
    });

    startAutoSlide();
  })();

 

  const impact = document.querySelector(".oppty-impact");
  const process = document.querySelector(".oppty-process");
  const services = document.querySelector(".services-3d");
  const ostList = document.getElementById("ostList")


  let impactPlayed = false;
  let processPlayed = false;
  let servicesPlayed = false;

  function isInView(element, offset) {
    if (!element) {
      return false;
    }
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight - offset;
  }
//impact section
  function playImpact() {
    const statsContainer = impact.querySelector(".impact-stats");
    const statCards = impact.querySelectorAll(".stat-card");
    const numbers = impact.querySelectorAll(".stat-card h3");

    statsContainer.classList.add("active");

    statCards.forEach(function (card, index) {
      setTimeout(function () {
        card.classList.add("active");
      }, index * 120);
    });

    numbers.forEach(function (num) {
      const target = parseInt(num.getAttribute("data-target"), 10);
      let current = 0;
      const step = Math.ceil(target / 60);

      const counter = setInterval(function () {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(counter);
        }
        num.textContent =
          current >= 2000 ? Math.floor(current / 1000) + "K" : current + "+";
      }, 20);
    });
  }

  //process-section
  function playProcess() {
    const track = process.querySelector(".process-track");
    const cards = process.querySelectorAll(".process-card");
    const arrows = process.querySelectorAll(".process-arrow");

    track.classList.add("active");

    cards.forEach(function (card, index) {
      setTimeout(function () {
        card.classList.add("active");
      }, 300 + index * 140);
    });

    setTimeout(function () {
      arrows.forEach(function (arrow) {
        arrow.classList.add("active");
      });
    }, 300 + cards.length * 140 + 300);
  }

  function playServices() {
    services.classList.add("active");
  }

  function onScroll() {
    if (impact && !impactPlayed && isInView(impact, 150)) {
      playImpact();
      impactPlayed = true;
    }

    if (process && !processPlayed && isInView(process, 200)) {
      playProcess();
      processPlayed = true;
    }

    if (services && !servicesPlayed && isInView(services, 200)) {
      playServices();
      servicesPlayed = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  
//services-slider

  (function () {
    if (!services) {
      return;
    }

    const slides = Array.prototype.slice.call(
      services.querySelectorAll(".service-slide")
    );
    const prevBtn = services.querySelector(".services-slider__btn--prev");
    const nextBtn = services.querySelector(".services-slider__btn--next");

    let currentIndex = 0;
    let isAnimating = false;
    const total = slides.length;

    function updateSlides() {
      slides.forEach(function (slide) {
        slide.removeAttribute("data-current");
        slide.removeAttribute("data-next");
        slide.removeAttribute("data-previous");
        slide.setAttribute("data-hidden", "");
      });

      const current = slides[currentIndex];
      const next = slides[(currentIndex + 1) % total];
      const prev = slides[(currentIndex - 1 + total) % total];

      current.removeAttribute("data-hidden");
      next.removeAttribute("data-hidden");
      prev.removeAttribute("data-hidden");

      current.setAttribute("data-current", "");
      next.setAttribute("data-next", "");
      prev.setAttribute("data-previous", "");
    }

    function move(direction) {
      if (isAnimating) {
        return;
      }

      isAnimating = true;

      if (direction === 1) {
        currentIndex = currentIndex + 1;
        if (currentIndex >= total) {
          currentIndex = 0;
        }
      }

      if (direction === -1) {
        currentIndex = currentIndex - 1;
        if (currentIndex < 0) {
          currentIndex = total - 1;
        }
      }

      updateSlides();

      setTimeout(function () {
        isAnimating = false;
      }, 800);
    }

    prevBtn.addEventListener("click", function () {
      move(-1);
    });

    nextBtn.addEventListener("click", function () {
      move(1);
    });

    updateSlides();
  })();
});

//ost-list
(function () {
  const ostList = document.querySelector('.ost-list');
  if (!ostList) {
    return;
  }

  const items = Array.from(ostList.children);
  items.forEach(function (item) {
    ostList.appendChild(item.cloneNode(true));
  });

  let offset = 0;
  const listWidth = ostList.scrollWidth / 2;

  function tick() {
    offset -= 0.6;

    if (Math.abs(offset) >= listWidth) {
      offset = 0;
    }

    ostList.style.transform = 'translateX(' + offset + 'px)';
    requestAnimationFrame(tick);
  }

  tick();
})();

//testimonials
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const testimonials = Array.from(document.querySelectorAll('.testimonial'))
    if (testimonials.length === 0) {
      return
    }

    let current = 0
    const total = testimonials.length
    let autoTimer = null
    let isPaused = false

    function updateClasses() {
      testimonials.forEach(function (item) {
        item.classList.remove('active')
        item.classList.remove('next')
        item.classList.remove('previous')
      })

      testimonials[current].classList.add('active')

      let nextIndex = current + 1
      if (nextIndex >= total) {
        nextIndex = 0
      }

      let prevIndex = current - 1
      if (prevIndex < 0) {
        prevIndex = total - 1
      }

      testimonials[nextIndex].classList.add('next')
      testimonials[prevIndex].classList.add('previous')
    }

    function startAuto() {
      if (autoTimer !== null) {
        return
      }

      autoTimer = setInterval(function () {
        if (isPaused) {
          return
        }

        current = current + 1
        if (current >= total) {
          current = 0
        }

        updateClasses()
      }, 4000)
    }

    function stopAuto() {
      if (autoTimer !== null) {
        clearInterval(autoTimer)
        autoTimer = null
      }
    }

    testimonials.forEach(function (card, index) {
      card.addEventListener('mouseenter', function () {
        isPaused = true
        stopAuto()

        current = index
        updateClasses()
      })

      card.addEventListener('mouseleave', function () {
        isPaused = false
        startAuto()
      })
    })

    updateClasses()
    startAuto()
  })
})()



