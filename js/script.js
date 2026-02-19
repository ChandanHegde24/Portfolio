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

    // 5. Color Theme Selector with multiple color values
    const colorThemeBtn = document.getElementById('color-theme-btn');
    const colorMenu = document.getElementById('color-menu');
    const colorOptions = document.querySelectorAll('.color-option');

    const themeColors = {
        blue: { main: '#00aaff', hover: '#0088cc' },
        purple: { main: '#a855f7', hover: '#9333ea' },
        green: { main: '#10b981', hover: '#059669' },
        pink: { main: '#ec4899', hover: '#db2777' },
        orange: { main: '#f97316', hover: '#ea580c' }
    };

    if (colorThemeBtn && colorMenu) {
        // Toggle color menu
        colorThemeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            colorMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!colorThemeBtn.contains(e.target) && !colorMenu.contains(e.target)) {
                colorMenu.classList.add('hidden');
            }
        });

        // Handle color theme selection
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                applyTheme(theme);
                colorMenu.classList.add('hidden');
            });
        });
    }

    // Apply theme function with CSS variables
    function applyTheme(theme) {
        const colors = themeColors[theme] || themeColors.blue;
        
        // Remove all theme classes
        document.body.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-pink', 'theme-orange');
        
        // Add new theme class
        document.body.classList.add(`theme-${theme}`);
        
        // Set CSS custom properties on root
        document.documentElement.style.setProperty('--accent-color', colors.main);
        document.documentElement.style.setProperty('--accent-hover', colors.hover);
        
        // Save to localStorage
        localStorage.setItem('preferred-theme', theme);
        
        console.log(`Theme changed to ${theme}:`, colors);
    }

    // Load saved theme on page load
    const savedTheme = localStorage.getItem('preferred-theme') || 'blue';
    applyTheme(savedTheme);
});