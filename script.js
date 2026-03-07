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
        this.setupCardSpotlight();
        if (!this.reduceMotion) {
            this.setupGalaxyBackground();
        }
    }

    // Add this new method to your Portfolio class
    setupGalaxyBackground() {
        // Check if we're on a page that should have the background
        const pagesWithBackground = ['home', 'projects', 'certificates', 'contact'];
        if (pagesWithBackground.includes(this.currentPage)) {
            window.galaxyBg = new GalaxyBackground();
        }
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

    // Add mouse tracking for card spotlight effects
    setupCardSpotlight() {
        const cards = document.querySelectorAll('.project-card, .certificate-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mouse-x', '50%');
                card.style.setProperty('--mouse-y', '50%');
            });
        });
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
    // Add to your existing setupPageTransitions or create new method
    setupPageCleanup() {
        window.addEventListener('beforeunload', () => {
            if (window.galaxyBg && typeof window.galaxyBg.destroy === 'function') {
                window.galaxyBg.destroy();
            }
        });
    }
}

/**
 * Interactive Galaxy Background
 * Vanilla JS implementation inspired by ReactBits.dev
 */

class GalaxyBackground {
    constructor(canvasId = 'galaxy-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.width = 0;
        this.height = 0;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        // Pointer state with smoothing
        this.pointer = {
            x: -9999, y: -9999,      // current smoothed position
            tx: -9999, ty: -9999,    // target position
            px: -9999, py: -9999,    // previous position
            vx: 0, vy: 0,            // velocity
            active: false
        };

        // Star system configuration
        this.STAR_LAYERS = 3;
        this.BASE_STAR_COUNT = 350;
        this.COLORS = ['#ffffff', '#a5c9ff', '#6b8dd6', '#e8d5b7', '#7dd3fc'];
        this.stars = [];
        this.particles = [];

        this.animationId = null;
        this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this.init();
    }

    init() {
        if (this.reduceMotion) return;

        this.resize();
        this.initStars();
        this.setupEventListeners();
        this.animate();
    }

    resize() {
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.canvas.width = Math.floor(this.width * this.dpr);
        this.canvas.height = Math.floor(this.height * this.dpr);
        this.canvas.style.width = this.width + 'px';
        this.canvas.style.height = this.height + 'px';
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

        // Scale star count with area, capped for performance
        const area = this.width * this.height;
        const STAR_COUNT = Math.min(
            Math.floor(area / 4000) + this.BASE_STAR_COUNT,
            1000
        );

        this.initStars(STAR_COUNT);
    }

    initStars(count = null) {
        this.stars.length = 0;
        const starCount = count || Math.min(
            Math.floor((this.width * this.height) / 5500) + this.BASE_STAR_COUNT,
            800
        );

        for (let layer = 0; layer < this.STAR_LAYERS; layer++) {
            const layerCount = Math.floor(starCount / this.STAR_LAYERS);
            const depth = (layer + 1) / this.STAR_LAYERS; // 0.33, 0.66, 1.0

            for (let i = 0; i < layerCount; i++) {
                this.stars.push({
                    x: this.rand(0, this.width),
                    y: this.rand(0, this.height),
                    z: depth * (0.6 + Math.random() * 0.4), // depth factor
                    baseSize: this.rand(0.4, 2.2),
                    size: 0,
                    alpha: this.rand(0.4, 0.9),
                    twinkleSpeed: this.rand(0.004, 0.025),
                    twinkleOffset: this.rand(0, Math.PI * 2),
                    driftX: this.rand(-0.08, 0.08),
                    driftY: this.rand(-0.06, 0.06),
                    color: this.COLORS[Math.floor(Math.random() * this.COLORS.length)],
                    layer: layer
                });
            }
        }
    }

    // Spawn particle burst (supernova effect)
    spawnBurst(x, y, amount = 40) {
        for (let i = 0; i < amount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = this.rand(0.6, 3.5);
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: this.rand(30, 75),
                maxLife: 75,
                size: this.rand(0.7, 3.2),
                hue: this.rand(190, 250),
                alpha: this.rand(0.6, 1)
            });
        }
    }

    // Draw nebula-like background gradient that follows mouse
    drawBackground() {
        const centerX = this.width / 2 + (this.pointer.tx - this.width / 2) * 0.08;
        const centerY = this.height / 2 + (this.pointer.ty - this.height / 2) * 0.08;
        const radius = Math.max(this.width, this.height) * 0.9;

        const gradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
        );
        gradient.addColorStop(0, 'rgba(31, 59, 115, 0.15)');
        gradient.addColorStop(0.4, 'rgba(26, 43, 88, 0.08)');
        gradient.addColorStop(0.7, 'rgba(10, 22, 51, 0.04)');
        gradient.addColorStop(1, 'transparent');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Subtle vignette
        this.ctx.fillStyle = 'rgba(5, 8, 20, 0.3)';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // Draw individual star with glow effects
    drawStar(star, time) {
        // Twinkle animation
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const pulse = 0.65 + twinkle * 0.35;
        star.size = star.baseSize * pulse * star.z;

        // Distance to pointer for interaction
        const dx = star.x - this.pointer.x;
        const dy = star.y - this.pointer.y;
        const d = Math.hypot(dx, dy);
        const influenceRadius = 220;
        const influence = this.pointer.active ? Math.max(0, 1 - d / influenceRadius) : 0;

        // Parallax offset based on mouse velocity
        const parallax = star.z * 1.6;
        const offsetX = this.pointer.vx * parallax * 0.55;
        const offsetY = this.pointer.vy * parallax * 0.55;

        // Repel effect when pointer is near
        const repelStrength = influence * 16 * star.z;
        const rx = d > 1 ? (dx / d) * repelStrength : 0;
        const ry = d > 1 ? (dy / d) * repelStrength : 0;

        // Final position
        const x = star.x + offsetX + rx;
        const y = star.y + offsetY + ry;

        // Dynamic alpha and color
        const baseAlpha = star.alpha * (0.7 + twinkle * 0.3);
        const alpha = Math.min(baseAlpha + influence * 0.4, 1);

        // Draw star core
        this.ctx.beginPath();
        this.ctx.arc(x, y, star.size, 0, Math.PI * 2);
        this.ctx.fillStyle = star.color;
        this.ctx.globalAlpha = alpha;
        this.ctx.fill();

        // Glow effect for prominent stars
        if (star.z > 0.65 && star.size > 1.3) {
            const glowRadius = star.size * (3.5 + influence * 2);
            const glowAlpha = (0.12 + influence * 0.25) * alpha;

            const glow = this.ctx.createRadialGradient(x, y, 0, x, y, glowRadius);
            glow.addColorStop(0, star.color + 'cc');
            glow.addColorStop(0.4, star.color + '44');
            glow.addColorStop(1, 'transparent');

            this.ctx.beginPath();
            this.ctx.arc(x, y, glowRadius, 0, Math.PI * 2);
            this.ctx.fillStyle = glow;
            this.ctx.globalAlpha = glowAlpha;
            this.ctx.fill();
        }

        // Highlight burst when strongly influenced
        if (influence > 0.25) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, star.size * 1.8, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(125, 211, 252, ${influence * 0.3})`;
            this.ctx.globalAlpha = 0.6;
            this.ctx.fill();
        }

        this.ctx.globalAlpha = 1;
    }

    // Update star positions with physics
    updateStars(time) {
        // Smooth pointer following with easing
        this.pointer.x += (this.pointer.tx - this.pointer.x) * 0.08;
        this.pointer.y += (this.pointer.ty - this.pointer.y) * 0.08;

        // Calculate velocity for parallax
        this.pointer.vx = (this.pointer.x - this.pointer.px) * 0.18;
        this.pointer.vy = (this.pointer.y - this.pointer.py) * 0.18;
        this.pointer.px = this.pointer.x;
        this.pointer.py = this.pointer.y;

        // Parallax center offset
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const parallaxX = (this.pointer.x - centerX) * 0.015;
        const parallaxY = (this.pointer.y - centerY) * 0.015;

        this.stars.forEach(star => {
            // Apply parallax based on depth
            star.x += parallaxX * star.z * 0.4;
            star.y += parallaxY * star.z * 0.4;

            // Subtle organic drift
            star.x += Math.sin(time * 0.00015 + star.twinkleOffset) * star.driftX * star.z;
            star.y += Math.cos(time * 0.00012 + star.twinkleOffset) * star.driftY * star.z;

            // Wrap around edges with buffer
            const buffer = 60;
            if (star.x < -buffer) star.x = this.width + buffer;
            if (star.x > this.width + buffer) star.x = -buffer;
            if (star.y < -buffer) star.y = this.height + buffer;
            if (star.y > this.height + buffer) star.y = -buffer;
        });
    }

    // Update and draw particles
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // Physics
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.982; // friction
            p.vy *= 0.982;
            p.vy += 0.02; // subtle gravity
            p.life--;

            // Remove dead particles
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // Visuals
            const t = p.life / p.maxLife;
            const size = p.size * (0.5 + t * 0.8);
            const alpha = Math.max(0, t * p.alpha);

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, size, 0, Math.PI * 2);

            // Color shift from cyan to purple as it fades
            const hue = p.hue + (1 - t) * 30;
            this.ctx.fillStyle = `hsla(${hue}, 90%, 75%, ${alpha})`;
            this.ctx.fill();

            // Add glow to larger particles
            if (size > 1.5) {
                this.ctx.beginPath();
                const glow = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 2.5);
                glow.addColorStop(0, `hsla(${hue}, 100%, 80%, ${alpha * 0.6})`);
                glow.addColorStop(1, 'transparent');
                this.ctx.fillStyle = glow;
                this.ctx.fill();
            }
        }
    }

    // Main animation loop
    animate(time = 0) {
        if (this.reduceMotion) return;

        // Clear canvas with fade for subtle trails
        this.ctx.fillStyle = 'rgba(10, 14, 28, 0.25)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw atmospheric background
        this.drawBackground();

        // Update systems
        this.updateStars(time);

        // Sort stars by depth for proper layering
        this.stars.sort((a, b) => a.z - b.z);

        // Draw stars
        this.stars.forEach(star => this.drawStar(star, time));

        // Draw and update particles
        this.updateParticles();

        this.animationId = requestAnimationFrame(() => this.animate(time + 16));
    }

    // Pointer event handlers
    handlePointerMove(x, y) {
        this.pointer.tx = x;
        this.pointer.ty = y;
        this.pointer.active = true;

        // Initialize previous position on first move
        if (this.pointer.px === -9999) {
            this.pointer.x = this.pointer.px = x;
            this.pointer.y = this.pointer.py = y;
        }
    }

    handlePointerEnd() {
        this.pointer.active = false;
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.resize(), { passive: true });

        window.addEventListener('mousemove', (e) => {
            this.handlePointerMove(e.clientX, e.clientY);
        }, { passive: true });

        window.addEventListener('mouseleave', () => this.handlePointerEnd());

        window.addEventListener('mousedown', (e) => {
            this.spawnBurst(e.clientX, e.clientY, 50);
        });

        // Touch support
        window.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                const t = e.touches[0];
                this.handlePointerMove(t.clientX, t.clientY);
                this.spawnBurst(t.clientX, t.clientY, 38);
            }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const t = e.touches[0];
                this.handlePointerMove(t.clientX, t.clientY);
            }
        }, { passive: true });

        window.addEventListener('touchend', () => this.handlePointerEnd());
        window.addEventListener('touchcancel', () => this.handlePointerEnd());
    }

    // Utility functions
    rand(min, max) {
        return Math.random() * (max - min) + min;
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if galaxy background container exists
    if (document.getElementById('galaxy-background')) {
        window.galaxyBg = new GalaxyBackground();
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.galaxyBg && typeof window.galaxyBg.destroy === 'function') {
        window.galaxyBg.destroy();
    }
});

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});