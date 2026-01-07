document.addEventListener("DOMContentLoaded", () => {
  const ostList = document.getElementById("ostList");
  if (!ostList) return;

  const items = Array.from(ostList.children);
  items.forEach(item => ostList.appendChild(item.cloneNode(true)));

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


// document.addEventListener("DOMContentLoaded", () => {
//   const images = document.querySelectorAll(".service-pg-img-cont img");
//   let activeIndex = 0;

//   images.forEach((img, i) => {
//     img.style.display = i === 0 ? "block" : "none";
//   });

//   images.forEach(img => {
//     img.addEventListener("click", () => {
//       images[activeIndex].style.display = "none";
//       activeIndex = (activeIndex + 1) % images.length;
//       images[activeIndex].style.display = "block";
//     });
//   });
// });
