// ========================================
// Portfolio Site JavaScript
// Warm Editorial Design
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initAnimations();
    initHoverEffects();
    initCarousel();
    initPortraitTilt();
});

// ========================================
// Navigation
// ========================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => navObserver.observe(section));
}

// ========================================
// Scroll Effects
// ========================================
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.getElementById('navbar')?.offsetHeight || 80;
                const targetPosition = target.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Animations
// ========================================
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.about-card, .expertise-card, .experience-card, ' +
        '.impact-card, .credential-item, .preview-card, ' +
        '.contact-method, .social-link, .section-header, ' +
        '.about-header, .writing-content, .contact-content'
    );

    animateElements.forEach((el, index) => {
        el.classList.add('animate-ready');
        el.style.transitionDelay = `${index * 0.05}s`;
        observer.observe(el);
    });

    // Hero animation on load
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 100);
    }

    if (heroVisual) {
        heroVisual.style.opacity = '0';
        heroVisual.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroVisual.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            heroVisual.style.opacity = '1';
            heroVisual.style.transform = 'translateY(0)';
        }, 300);
    }
}

// ========================================
// Hover Effects
// ========================================
function initHoverEffects() {
    // Card tilt effect on hover
    const cards = document.querySelectorAll('.expertise-card, .impact-card:not(.featured)');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Preview cards floating animation
    const previewCards = document.querySelectorAll('.preview-card');

    previewCards.forEach((card, index) => {
        card.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        card.style.animationDelay = `${index * 0.3}s`;
    });

    // Add floating animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }

        .preview-card.offset {
            animation-name: float-offset !important;
        }

        .preview-card.offset-more {
            animation-name: float-offset-more !important;
        }

        @keyframes float-offset {
            0%, 100% { transform: translate(30px, 40px); }
            50% { transform: translate(30px, 30px); }
        }

        @keyframes float-offset-more {
            0%, 100% { transform: translate(60px, 80px); }
            50% { transform: translate(60px, 70px); }
        }

        /* Stagger animations for grid items */
        .about-card:nth-child(1) { transition-delay: 0s !important; }
        .about-card:nth-child(2) { transition-delay: 0.1s !important; }
        .about-card:nth-child(3) { transition-delay: 0.2s !important; }

        .expertise-card:nth-child(1) { transition-delay: 0s !important; }
        .expertise-card:nth-child(2) { transition-delay: 0.1s !important; }
        .expertise-card:nth-child(3) { transition-delay: 0.2s !important; }

        .impact-card:nth-child(1) { transition-delay: 0s !important; }
        .impact-card:nth-child(2) { transition-delay: 0.15s !important; }
        .impact-card:nth-child(3) { transition-delay: 0.3s !important; }
        .impact-card:nth-child(4) { transition-delay: 0.45s !important; }
        .impact-card:nth-child(5) { transition-delay: 0.6s !important; }

        .experience-card:nth-child(1) { transition-delay: 0s !important; }
        .experience-card:nth-child(2) { transition-delay: 0.1s !important; }
        .experience-card:nth-child(3) { transition-delay: 0.2s !important; }
        .experience-card:nth-child(4) { transition-delay: 0.3s !important; }
        .experience-card:nth-child(5) { transition-delay: 0.4s !important; }
        .experience-card:nth-child(6) { transition-delay: 0.5s !important; }

        /* Active nav link style */
        .nav-link.active {
            color: var(--color-coral);
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Carousel
// ========================================
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const dots = document.querySelectorAll('.dot');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 24; // card width + gap
    const visibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth) || 1;
    const maxIndex = Math.max(0, cards.length - visibleCards);

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });

        // Update button states
        if (prevBtn) prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        if (nextBtn) nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = Math.min(index, maxIndex);
            updateCarousel();
        });
    });

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < maxIndex) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateCarousel();
            isDragging = false;
        }
    });

    track.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Initialize
    updateCarousel();

    // Recalculate on resize
    window.addEventListener('resize', debounce(() => {
        const newVisibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth) || 1;
        const newMaxIndex = Math.max(0, cards.length - newVisibleCards);
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
            updateCarousel();
        }
    }, 200));
}

// ========================================
// Portrait Tilt Effect
// ========================================
function initPortraitTilt() {
    const portrait = document.getElementById('portrait-tilt');
    if (!portrait) return;

    const maxTilt = 15; // Maximum tilt angle in degrees

    portrait.addEventListener('mousemove', (e) => {
        const rect = portrait.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate tilt angles
        const rotateX = ((y - centerY) / centerY) * -maxTilt;
        const rotateY = ((x - centerX) / centerX) * maxTilt;

        // Apply transform with CSS custom properties
        portrait.style.setProperty('--rotateX', `${rotateX}deg`);
        portrait.style.setProperty('--rotateY', `${rotateY}deg`);
        portrait.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    portrait.addEventListener('mouseleave', () => {
        // Reset transform smoothly
        portrait.style.transition = 'transform 0.5s ease-out';
        portrait.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';

        // Remove transition after animation completes
        setTimeout(() => {
            portrait.style.transition = 'transform 0.1s ease-out';
        }, 500);
    });

    portrait.addEventListener('mouseenter', () => {
        portrait.style.transition = 'transform 0.1s ease-out';
    });
}

// ========================================
// Utility Functions
// ========================================

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
