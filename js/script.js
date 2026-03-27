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

    // 5. Dark/Light Mode Toggle
    const themeModeBtn = document.getElementById('theme-mode-btn');
    const themeModeIcon = themeModeBtn?.querySelector('svg');
    
    if (themeModeBtn) {
        themeModeBtn.addEventListener('click', () => {
            const isDarkMode = document.body.classList.contains('light-mode');
            
            if (isDarkMode) {
                document.body.classList.remove('light-mode');
                localStorage.setItem('theme-mode', 'dark');
                // Sun icon for dark mode
                themeModeIcon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" fill="currentColor"/>';
            } else {
                document.body.classList.add('light-mode');
                localStorage.setItem('theme-mode', 'light');
                // Moon icon for light mode
                themeModeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>';
            }
        });
        
        // Load saved mode on page load
        const savedMode = localStorage.getItem('theme-mode') || 'dark';
        if (savedMode === 'light') {
            document.body.classList.add('light-mode');
            themeModeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>';
        }
    }

    // 6. Color Theme Selector with multiple color values
    const colorThemeBtn = document.getElementById('color-theme-btn');
    const colorMenu = document.getElementById('color-menu');
    const colorOptions = document.querySelectorAll('.color-option');
    const customColorPicker = document.getElementById('custom-color-picker');

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

        if (customColorPicker) {
            customColorPicker.addEventListener('input', (e) => {
                const hexColor = e.target.value;
                applyCustomTheme(hexColor);
            });
            // Keep menu open when interacting with color picker
            customColorPicker.parentElement.parentElement.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }

    // Helper to darken color slightly for hover state
    function adjustColor(color, amount) {
        return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
    }

    // Apply custom theme
    function applyCustomTheme(hexColor) {
        document.body.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-pink', 'theme-orange', 'theme-custom');
        document.body.classList.add('theme-custom');
        
        const hoverColor = adjustColor(hexColor, -20); // Darken by roughly 20 units
        
        document.documentElement.style.setProperty('--accent-color', hexColor);
        document.documentElement.style.setProperty('--accent-hover', hoverColor);
        
        localStorage.setItem('preferred-theme', 'custom');
        localStorage.setItem('custom-theme-color', hexColor);
    }

    // Apply theme function with CSS variables
    function applyTheme(theme) {
        if (theme === 'custom') {
            const savedCustom = localStorage.getItem('custom-theme-color') || '#00aaff';
            applyCustomTheme(savedCustom);
            if (customColorPicker) customColorPicker.value = savedCustom;
            return;
        }

        const colors = themeColors[theme] || themeColors.blue;
        
        // Remove all theme classes
        document.body.classList.remove('theme-blue', 'theme-purple', 'theme-green', 'theme-pink', 'theme-orange', 'theme-custom');
        
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