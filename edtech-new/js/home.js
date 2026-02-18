// Accordion Functionality for the next section
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
        
        // Using your Teal for active state via JS if needed
        if(item.classList.contains('active')) {
            header.style.backgroundColor = '#018790';
        } else {
            header.style.backgroundColor = '#001A33';
        }
    });
});


//////////////////////////////////////////////////////////////////////////////////////////

const counterElements = document.querySelectorAll('.stat-number');

const countUp = (element) => {
    const target = +element.getAttribute('data-target');
    const current = +element.innerText;
    const increment = target / 100;

    if (current < target) {
        element.innerText = Math.ceil(current + increment);
        setTimeout(() => countUp(element), 20);
    } else {
        element.innerText = target;
    }
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUp(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.7 });

counterElements.forEach(el => observer.observe(el));



////////////////////////////////////////////////////////////////////////////////