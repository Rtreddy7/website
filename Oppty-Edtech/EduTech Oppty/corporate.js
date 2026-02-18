/**
 * OPPTY EduTech - Corporate Page Logic
 * Handled within corporate.js
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("OPPTY Corporate Training Page Loaded");

    // Animation for Hero Content
    const heroElements = document.querySelectorAll('.hero-content > *');
    
    heroElements.forEach((element, index) => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease-out';

        // Trigger reveal with delay
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});


  (() => {
  const triggerBtn = document.getElementById("loginAuthTrigger");
  const modal = document.getElementById("loginAuthModal");
  const closeBtn = document.getElementById("loginAuthClose");

  const sendOtpBtn = document.getElementById("loginAuthSendOtpBtn");
  const otpSection = document.getElementById("loginAuthOtpSection");
  const verifyOtpBtn = document.getElementById("loginAuthVerifyOtpBtn");
  const successMsg = document.getElementById("loginAuthSuccess");

  if (!triggerBtn || !modal) return;

  /* OPEN MODAL */
  triggerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
    
  });
});

////////////////////////////////////////////////////////////////////////////////////

// Function to reveal cards on scroll
const revealOnScroll = () => {
    const cards = document.querySelectorAll('.market-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
};

// Initial states for cards
document.querySelectorAll('.market-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);

////////////////////////////////////////////////////////////////////////////

// Adding a subtle hover effect for the 'Reliable' feeling
document.querySelectorAll('.skill-box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.transform = 'translateY(-5px)';
    });
    box.addEventListener('mouseleave', () => {
        box.style.transform = 'translateY(0)';
    });
});

////////////////////////////////////////////////////////////////////

// Subtle animation to emphasize "High Standard" growth
document.addEventListener('scroll', () => {
    const roiItems = document.querySelectorAll('.roi-item');
    roiItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
});

// Initial state for ROI items
document.querySelectorAll('.roi-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.6s ease-out';
});

//////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const courseBoxes = document.querySelectorAll('.js-entrance');

    const animateOnScroll = () => {
        courseBoxes.forEach((box, index) => {
            const rect = box.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                // Staggered reveal based on index
                setTimeout(() => {
                    box.classList.add('reveal');
                }, index * 100);
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial trigger
});

//////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat-number');
    const speed = 100;

    const animateStats = () => {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const current = +stat.innerText;
            const increment = target / speed;

            if (current < target) {
                stat.innerText = Math.ceil(current + increment);
                setTimeout(animateStats, 20);
            } else {
                stat.innerText = target;
            }
        });
    };

    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateStats();
        }
    }, { threshold: 0.6 });

    observer.observe(document.querySelector('.oppty-impact-stats'));
});
//////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////
