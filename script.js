// Price calculator
const priceRates = {
    'airport-lyon-center': 45,
    'airport-partdieu': 40,
    'airport-perrache': 42,
    'airport-oullins': 38,
    'lyon-center-partdieu': 15,
    'lyon-center-perrache': 12,
    'lyon-center-oullins': 20,
    'partdieu-perrache': 10,
    'partdieu-oullins': 18,
    'perrache-oullins': 16
};

function calculatePrice() {
    const depEl = document.getElementById('departure');
    const destEl = document.getElementById('destination');
    const passEl = document.getElementById('passengers');
    const resultDiv = document.getElementById('price-result');
    const priceSpan = document.getElementById('estimated-price');

    if (!depEl || !destEl || !passEl || !resultDiv || !priceSpan) {
        return; // Simulator absent
    }

    const departure = depEl.value;
    const destination = destEl.value;
    const passengers = parseInt(passEl.value, 10) || 1;

    if (!departure || !destination || departure === destination) {
        resultDiv.style.display = 'none';
        return;
    }

    const route = `${departure}-${destination}`;
    const reverseRoute = `${destination}-${departure}`;
    let basePrice = priceRates[route] || priceRates[reverseRoute] || 25;
    if (passengers > 2) basePrice *= 1.2;
    priceSpan.textContent = Math.round(basePrice);
    resultDiv.style.display = 'block';
}

// Attach events after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    ['departure', 'destination', 'passengers'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', calculatePrice);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .contact-method').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
