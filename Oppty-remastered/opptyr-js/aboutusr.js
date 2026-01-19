(function () {
  function animateStat(el) {
    var text = el.innerText.trim();
    var isK = text.indexOf('K') !== -1;
    var isPlus = text.indexOf('+') !== -1;

    var base = parseInt(text.replace(/\D/g, ''), 10);
    var target = base;

    if (isK) {
      target = base * 1000;
    }

    var current = 0;
    var step = Math.ceil(target / 80);

    var interval = setInterval(function () {
      current += step;

      if (current >= target) {
        if (isK) {
          el.innerText = base + 'K';
        } else if (isPlus) {
          el.innerText = base + '+';
        } else {
          el.innerText = base;
        }
        clearInterval(interval);
      } else {
        if (isK) {
          el.innerText = Math.floor(current / 1000) + 'K';
        } else {
          el.innerText = current;
        }
      }
    }, 20);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var numbers = document.querySelectorAll('.stat-number');

    numbers.forEach(function (num) {
      animateStat(num);
    });
  });
})();


(function () {
  const section = document.getElementById('awards');
  const header = section.querySelector('.awards-header');
  const cards = section.querySelectorAll('.award-card');
  let played = false;

  function revealAwards() {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.7 && !played) {
      played = true;
      header.classList.add('active');

      cards.forEach(function (card, index) {
        setTimeout(function () {
          card.classList.add('active');
        }, index * 180);
      });
    }
  }

  window.addEventListener('scroll', revealAwards);
  revealAwards();
})();
