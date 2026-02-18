document.addEventListener('DOMContentLoaded', function () {
    
    // 1. Typed.js Initialization
    if (typeof Typed !== 'undefined') {
        var typed = new Typed('#element', {
            strings: ['Web Developer.', 'Software Engineer.', 'DevOps Enthusiast.', 'Trader & Investor.'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    } else {
        console.error('Typed.js not loaded');
    }

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 3. Fade-in-on-scroll Animation
    const animatedSections = document.querySelectorAll('.animated-section');
    if (animatedSections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Optional: only animate once
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });

        animatedSections.forEach(section => {
            observer.observe(section);
        });
    }

    // 4. Change navbar style on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('bg-dark-bg/80', 'backdrop-blur-lg');
            } else {
                header.classList.remove('bg-dark-bg/80', 'backdrop-blur-lg');
            }
        });
    }
});