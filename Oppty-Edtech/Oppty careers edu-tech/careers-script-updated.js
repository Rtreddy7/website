// Navigation
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Scroll Effect for Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
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
})

// Position Filters
const filterButtons = document.querySelectorAll('.filter-btn');
const positionRows = document.querySelectorAll('.position-row');
const noMatch = document.querySelector('.no-match');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const department = button.getAttribute('data-department');
        let visibleCount = 0;
        
        positionRows.forEach((row, index) => {
            const rowDepartment = row.getAttribute('data-department');
            
            if (department === 'all' || rowDepartment === department) {
                row.style.display = 'flex';
                visibleCount++;
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateX(0)';
                }, index * 50);
            } else {
                row.style.opacity = '0';
                row.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    row.style.display = 'none';
                }, 300);
            }
        });
        
        // Show/hide no match message
        if (visibleCount === 0) {
            noMatch.style.display = 'block';
        } else {
            noMatch.style.display = 'none';
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animations
document.querySelectorAll('.section-header, .reason-item, .benefit-detail').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const isDecimal = target.toString().includes('.');
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            if (isDecimal) {
                element.textContent = start.toFixed(1);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (isDecimal) {
                element.textContent = target.toFixed(1);
            } else {
                element.textContent = target + '+';
            }
        }
    };
    
    updateCounter();
};

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach(item => {
                const text = item.textContent;
                const hasDecimal = text.includes('.');
                
                if (hasDecimal) {
                    const number = parseFloat(text.replace(/[^0-9.]/g, ''));
                    item.textContent = '0.0';
                    setTimeout(() => animateCounter(item, number), 500);
                } else {
                    const number = parseInt(text.replace(/[^0-9]/g, ''));
                    if (number) {
                        item.textContent = '0';
                        setTimeout(() => animateCounter(item, number), 500);
                    }
                }
            });
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

// Observe stat containers
document.querySelectorAll('.hero-stats').forEach(container => {
    statsObserver.observe(container);
});

// Duplicate marquee content for seamless loop
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
    const items = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML += items; // Duplicate for infinite scroll
}

// Duplicate slider content for seamless loop
const sliderTrack = document.querySelector('.slider-track');
if (sliderTrack) {
    const slides = sliderTrack.innerHTML;
    sliderTrack.innerHTML += slides; // Duplicate for infinite scroll
}

// Apply Now Button Handlers
const applyButtons = document.querySelectorAll('.btn-apply');
applyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const positionRow = this.closest('.position-row');
        const positionTitle = positionRow.querySelector('h3').textContent;
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // In a real application, this would open an application form
        alert(`Thank you for your interest in the ${positionTitle} position!\n\nYou will be redirected to our application portal.`);
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Parallax Effect for Hero Shapes
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            shapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05);
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// Hover Effect for Position Rows
positionRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
        this.style.borderLeftWidth = '6px';
    });
    
    row.addEventListener('mouseleave', function() {
        this.style.borderLeftWidth = '4px';
    });
});

// Process Steps Animation on Scroll
const processSteps = document.querySelectorAll('.process-step');
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.3 });

processSteps.forEach(step => {
    step.style.animationPlayState = 'paused';
    processObserver.observe(step);
});

// Add subtle hover animations to benefit items in marquee
const benefitItems = document.querySelectorAll('.benefit-item');
benefitItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        // Pause animation on hover
        marqueeTrack.style.animationPlayState = 'paused';
    });
    
    item.addEventListener('mouseleave', function() {
        // Resume animation
        marqueeTrack.style.animationPlayState = 'running';
    });
});

// Culture slider pause on hover
const cultureSlider = document.querySelector('.culture-slider');
if (cultureSlider) {
    cultureSlider.addEventListener('mouseenter', function() {
        sliderTrack.style.animationPlayState = 'paused';
    });
    
    cultureSlider.addEventListener('mouseleave', function() {
        sliderTrack.style.animationPlayState = 'running';
    });
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Magnetic effect for CTA buttons
const ctaButtons = document.querySelectorAll('.btn-cta-primary, .btn-cta-secondary, .btn-primary-large');
ctaButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Add stagger effect to reason items
const reasonItems = document.querySelectorAll('.reason-item');
const reasonObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

reasonItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    reasonObserver.observe(item);
});

// Gradient text shimmer effect
const gradientText = document.querySelector('.gradient-text');
if (gradientText) {
    setInterval(() => {
        gradientText.style.backgroundPosition = '200% center';
        setTimeout(() => {
            gradientText.style.backgroundPosition = '0% center';
        }, 1500);
    }, 3000);
}

// Add subtle parallax to section backgrounds
const sections = document.querySelectorAll('.why-join, .benefits, .life-at-oppty, .open-positions, .hiring-process');
window.addEventListener('scroll', () => {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (scrollPercent > 0 && scrollPercent < 1) {
            const translateY = scrollPercent * 30;
            section.style.backgroundPositionY = `${translateY}px`;
        }
    });
});

console.log('🚀 Oppty Careers - Enhanced Experience Loaded!');










    const modal = document.getElementById("applyModal");
    const applyBtns = document.querySelectorAll(".btn-apply");
    const closeBtn = document.querySelector(".close-modal");
    const overlay = document.querySelector(".apply-overlay");

    applyBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
        modal.classList.remove("active");
    });

