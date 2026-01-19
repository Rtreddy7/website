function initServicesFilter() {
  const filterButtons = document.querySelectorAll(".services-filters button");
  const serviceCards = document.querySelectorAll(".service-card");

  if (!filterButtons.length || !serviceCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      serviceCards.forEach((card) => {
        if (filter === "all" || card.classList.contains(filter)) {
          card.classList.remove("is-hidden");
        } else {
          card.classList.add("is-hidden");
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", initServicesFilter);

function initCoreServicesAnimation() {
  const cards = document.querySelectorAll(".core-service-card");
  if (!cards.length) return;

  function revealCards() {
    const triggerPoint = window.innerHeight * 0.85;

    cards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerPoint) {
        setTimeout(() => {
          card.classList.add("show");
        }, index * 120);
      }
    });
  }

  window.addEventListener("scroll", revealCards);
  revealCards();
}

document.addEventListener("DOMContentLoaded", initCoreServicesAnimation);

document.addEventListener("DOMContentLoaded", () => {
  const ostList = document.getElementById("ostList");
  if (!ostList) return;

  const items = Array.from(ostList.children);
  items.forEach((item) => ostList.appendChild(item.cloneNode(true)));

  let offset = 0;
  const listWidth = ostList.scrollWidth / 2;

  function tick() {
    offset -= 0.6;

    if (Math.abs(offset) >= listWidth) {
      offset = 0;
    }

    ostList.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(tick);
  }

  tick();
});
