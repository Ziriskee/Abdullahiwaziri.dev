/**
 * Multi-page Portfolio with Theme Toggle
 * Author: Abdullahi Waziri Bello
 * Repository: https://github.com/Ziriskee/Abdullahiwaziri.dev
 */

class Portfolio {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ==================== INITIALIZATION ====================
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';

        if (page.includes('projects.html')) return 'projects';
        if (page.includes('certificates.html')) return 'certificates';
        if (page.includes('contact.html')) return 'contact';
        return 'home';
    }

    init() {
        this.injectAnimationStyles();
        this.setupTheme();
        this.setupNavigation();
        this.setupPageSpecificFeatures();
        this.setupSharedFeatures();
        this.setupLazyLoading();
        this.setupPageTransitions();
    }

    // ==================== THEME MANAGEMENT ====================
    setupTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);

        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            // Click handler
            themeToggle.addEventListener('click', () => this.toggleTheme(themeToggle));

            // Keyboard handler
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme(themeToggle);
                }
            });
        }
    }

    toggleTheme(button) {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);

        button.classList.add('theme-changing');
        setTimeout(() => button.classList.remove('theme-changing'), 300);
    }

    // ==================== NAVIGATION ====================
    setupNavigation() {
        this.updateActiveNavLink();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }

    updateActiveNavLink() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if ((this.currentPage === 'home' && href === 'index.html') ||
                (this.currentPage !== 'home' && href.includes(this.currentPage))) {
                link.classList.add('active');
            }
        });
    }

    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');

        if (!hamburger || !navLinks) return;

        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        };

        const closeMenu = () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', toggleMenu);

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    setupSmoothScrolling() {
        // Same-page anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href.includes('.html#') || href === '#') return;

                e.preventDefault();
                this.scrollToElement(href);
            });
        });

        // Cross-page anchor handling (e.g., projects.html#echo-fetch)
        if (window.location.hash && window.location.pathname.includes('.html')) {
            setTimeout(() => this.scrollToElement(window.location.hash, true), 300);
        }
    }

    scrollToElement(selector, highlight = false) {
        const target = document.querySelector(selector);
        if (!target) return;

        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({ top: targetPosition, behavior: 'smooth' });

        if (highlight) {
            target.style.outline = '2px solid var(--accent-color)';
            setTimeout(() => { target.style.outline = ''; }, 2000);
        }
    }

    // ==================== PAGE-SPECIFIC FEATURES ====================
    setupPageSpecificFeatures() {
        const features = {
            'home': () => this.setupHomePage(),
            'projects': () => this.setupProjectsPage(),
            'certificates': () => this.setupCertificatesPage(),
            'contact': () => this.setupContactPage()
        };
        features[this.currentPage]?.();
    }

    setupHomePage() {
        this.setupScrollAnimations();
        this.setupCounterAnimation();
    }

    setupProjectsPage() {
        this.setupProjectAnimations();
    }

    setupCertificatesPage() {
        this.setupCertificateAnimations();
        this.setupCertificateModal(); // ✅ Now properly inside class
    }

    setupContactPage() {
        this.setupContactForm();
    }

    // ==================== CERTIFICATE MODAL (Fixed & Integrated) ====================
    setupCertificateModal() {
        const modal = document.getElementById('certificateModal');
        if (!modal) return;

        const modalImg = document.getElementById('modalImage');
        const captionText = document.getElementById('modalCaption');
        const closeBtn = modal.querySelector('.modal-close');

        const openModal = (imageSrc, title) => {
            // Show loading state
            modalImg.style.opacity = '0.5';
            modalImg.alt = 'Loading...';

            modal.style.display = 'block';
            captionText.textContent = title;
            document.body.style.overflow = 'hidden';

            // Load image with error handling
            const img = new Image();
            img.onload = () => {
                modalImg.src = imageSrc;
                modalImg.alt = title;
                modalImg.style.opacity = '1';
            };
            img.onerror = () => {
                console.warn(`Failed to load certificate image: ${imageSrc}`);
                modalImg.src = 'images/placeholder-certificate.jpg'; // Fallback image
                modalImg.alt = 'Certificate image not available';
                modalImg.style.opacity = '1';
            };
            img.src = imageSrc;
        };

        const closeModal = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            modalImg.style.opacity = '1'; // Reset for next open
        };

        // Open modal triggers
        document.querySelectorAll('.view-certificate-btn, .view-certificate').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal(btn.dataset.image, btn.dataset.title);
            });
        });

        // Close triggers
        closeBtn?.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
        });
    }
    // ==================== ANIMATIONS ====================
    setupSharedFeatures() {
        this.setupHeaderScroll();
        this.setupFadeInAnimations();
    }

    setupFadeInAnimations() {
        // Use will-change for better performance
        const animatedElements = document.querySelectorAll('.project-card, .skill-item, .fact-item, .timeline-item, .certificate-card, .faq-item');

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.willChange = 'opacity, transform'; // Performance hint
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.style.willChange = 'auto'; // Reset after animation
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        animatedElements.forEach(el => observer.observe(el));
    }

    setupHeaderScroll() {
        const header = document.querySelector('header');

        const handleScroll = this.debounce(() => {
            header?.classList.toggle('scrolled', window.scrollY > 50);
        }, 100);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupFadeInAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.project-card, .skill-item, .fact-item, .timeline-item, .certificate-card, .faq-item')
            .forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                observer.observe(el);
            });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.hero-text, .about-content, .timeline')
            .forEach(el => observer.observe(el));
    }

    setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number');
        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    setupProjectAnimations() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px)');
            card.addEventListener('mouseleave', () => card.style.transform = 'translateY(-5px)');
        });
    }

    setupCertificateAnimations() {
        document.querySelectorAll('.certificate-card').forEach(card => {
            card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-5px)');
            card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
        });
    }

    // ==================== CONTACT FORM ====================
    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        // Prevent default form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Validate form
            if (!this.validateForm(data)) {
                this.showNotification('Please fill in all required fields correctly.', 'error');
                return;
            }

            // Construct mailto link
            const subject = encodeURIComponent(data.subject);
            const body = encodeURIComponent(
                `Name: ${data.name}\n` +
                `Email: ${data.email}\n\n` +
                `${data.message}`
            );

            // Open email client
            window.location.href = `mailto:waziriabdullahi36@gmail.com?subject=${subject}&body=${body}`;

            // Show success message
            this.showNotification('Opening your email client...', 'success');

            // Reset form after delay
            setTimeout(() => {
                form.reset();
                form.querySelectorAll('.form-group').forEach(group => group.classList.remove('focused'));
            }, 1000);
        });

        // Floating labels
        form.querySelectorAll('input, textarea, select').forEach(input => {
            const toggleFocus = () => {
                input.parentElement.classList.toggle('focused', !!input.value || document.activeElement === input);
            };
            input.addEventListener('focus', toggleFocus);
            input.addEventListener('blur', toggleFocus);
            if (input.value) input.parentElement.classList.add('focused');
        });
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        if (!this.validateForm(data)) {
            this.showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // ⚠️ SIMULATED SUBMISSION - Replace with Formspree/EmailJS for production
        setTimeout(() => {
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            form.querySelectorAll('.form-group').forEach(group => group.classList.remove('focused'));
        }, 2000);
    }

    validateForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return data.name && data.email && data.subject && data.message && emailRegex.test(data.email);
    }

    // ==================== NOTIFICATIONS ====================
    showNotification(message, type = 'info') {
        // Remove existing notification
        document.querySelector('.notification')?.remove();

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.setAttribute('role', 'alert');
        notification.setAttribute('aria-live', 'polite');
        notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${this.getNotificationIcon(type)}" aria-hidden="true"></i>
            <span>${message}</span>
        </div>`;

        Object.assign(notification.style, {
            position: 'fixed', top: '100px', right: '20px',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            borderRadius: 'var(--radius-lg)', color: 'white',
            fontWeight: '500', zIndex: '10000',
            transform: 'translateX(100%)', transition: 'transform 0.3s ease',
            maxWidth: '400px', background: this.getNotificationColor(type),
            boxShadow: 'var(--shadow-lg)',
            borderLeft: `4px solid ${this.getNotificationBorderColor(type)}`
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    getNotificationIcon(type) {
        return { success: 'check-circle', error: 'exclamation-circle', info: 'info-circle' }[type] || 'info-circle';
    }

    getNotificationColor(type) {
        return { success: '#10b981', error: '#ef4444', info: '#3b82f6' }[type] || '#3b82f6';
    }

    getNotificationBorderColor(type) {
        return { success: '#059669', error: '#dc2626', info: '#2563eb' }[type] || '#2563eb';
    }

    // ==================== UTILITIES ====================
    injectAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
            .theme-changing { transform: scale(1.1) rotate(180deg); }
            .form-group.focused label { transform: translateY(-20px) scale(0.85); color: var(--primary-color); }
            .form-group { position: relative; }
            .form-group label { transition: all 0.3s ease; transform-origin: left top; }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            .fa-spin { animation: fa-spin 1s infinite linear; }
            @keyframes fa-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            * { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
        `;
        document.head.appendChild(style);
    }

    // ==================== UTILITIES ====================
    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if (images.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Load image
                    if (img.dataset.src) {
                        const originalSrc = img.src;
                        img.src = img.dataset.src;

                        // Handle load success
                        img.onload = () => {
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        };

                        // Handle load error
                        img.onerror = () => {
                            console.warn(`Failed to load image: ${img.dataset.src}`);
                            img.src = originalSrc; // Fallback to original
                            img.classList.add('loaded');
                            observer.unobserve(img);
                        };
                    } else {
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, { threshold: 0.1 });

        images.forEach(img => observer.observe(img));
    }

    setupPageTransitions() {
        window.addEventListener('beforeunload', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
        });
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
        });
    }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});