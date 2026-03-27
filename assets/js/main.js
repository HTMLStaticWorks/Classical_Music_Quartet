/**
 * Classical Music Quartet - Main JavaScript
 * Handles Theme Toggle, RTL Toggle, Mobile Menu, Sticky Header, and Scroll-to-top
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeBtns = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const htmlElement = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        htmlElement.classList.add('dark');
    }

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            htmlElement.classList.toggle('dark');
            const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', currentTheme);
        });
    });

    // 2. RTL Toggle
    const rtlBtns = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mobile');
    const savedLayout = localStorage.getItem('layout') || 'ltr';
    htmlElement.setAttribute('dir', savedLayout);

    rtlBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentLayout = htmlElement.getAttribute('dir') === 'ltr' ? 'rtl' : 'ltr';
            htmlElement.setAttribute('dir', currentLayout);
            localStorage.setItem('layout', currentLayout);
        });
    });

    // 3. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            // Animate hamburger icon (optional)
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
            } else {
                menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
            }
        });
    }

    // 4. Sticky Header Behavior
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-white/95', 'dark:bg-gray-900/95', 'shadow-md', 'backdrop-blur-sm');
            header.classList.remove('bg-transparent');
        } else {
            header.classList.add('bg-transparent');
            header.classList.remove('bg-white/95', 'dark:bg-gray-900/95', 'shadow-md', 'backdrop-blur-sm');
        }
    });

    // 5. Scroll-to-top Button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.remove('opacity-0', 'invisible');
                scrollTopBtn.classList.add('opacity-100', 'visible');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'invisible');
                scrollTopBtn.classList.remove('opacity-100', 'visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Active State Indicator
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('text-amber-600', 'dark:text-amber-500', 'font-semibold');
        }
    });

    // 7. Form Validation (General)
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            let valid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            inputs.forEach(input => {
                const errorSpan = input.nextElementSibling;
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('border-red-500');
                    if (errorSpan && errorSpan.classList.contains('error-msg')) {
                        errorSpan.classList.remove('hidden');
                    }
                } else {
                    input.classList.remove('border-red-500');
                    if (errorSpan && errorSpan.classList.contains('error-msg')) {
                        errorSpan.classList.add('hidden');
                    }
                    
                    // Email validation specifically
                    if (input.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            valid = false;
                            input.classList.add('border-red-500');
                        }
                    }
                }
            });

            if (!valid) {
                e.preventDefault();
                alert('Please fill out all required fields correctly.');
            }
        });
    });
});
