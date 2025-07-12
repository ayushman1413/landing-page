// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

class MobileNavigation {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animate-on-scroll');
        this.navbar = document.getElementById('navbar');
        
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
        
        window.addEventListener('scroll', () => this.handleNavbarScroll());
    }
    
    handleNavbarScroll() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

class SmoothScrolling {
    constructor() {
        this.navLinks = document.querySelectorAll('a[href^="#"]');
        this.init();
    }
    
    init() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 70; 
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

class ContactForm {
    constructor() {
        this.form = document.querySelector('.contact-form');
        if (this.form) {
            this.formStatus = this.form.querySelector('.form-status');
            this.init();
        }
    }
    
    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        if (this.validateForm(data)) {
            this.sendEmail(data);
        } else {
            this.showMessage('Please fill in all required fields.', 'error');
        }
    }
    
    validateForm(data) {
        return data.name && data.email && data.subject && data.message;
    }
    
    sendEmail(data) {
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
        };
        
        this.showMessage('Sending message...', 'info');
        
        emailjs.send('service_ayush', 'template_yzgd8em', templateParams)
            .then(() => {
                this.showMessage('Your message has been sent successfully!', 'success');
                this.form.reset();
            }, (error) => {
                console.error('Email sending failed:', error);
                this.showMessage('Failed to send message. Please try again later.', 'error');
            });
    }
    
    showMessage(message, type) {
        this.formStatus.textContent = message;
        this.formStatus.className = `form-status ${type}`;
    }
}

class LazyLoading {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        this.imageObserver.unobserve(entry.target);
                    }
                });
            });
            
            this.images.forEach(img => this.imageObserver.observe(img));
        } else {
            this.images.forEach(img => this.loadImage(img));
        }
    }
    
    loadImage(img) {
        img.src = img.dataset.src;
        img.classList.add('loaded');
    }
}

class WatchFaceAnimation {
    constructor() {
        this.timeElement = document.querySelector('.time');
        this.init();
    }
    
    init() {
        if (this.timeElement) {
            this.updateTime();
            setInterval(() => this.updateTime(), 1000);
        }
    }
    
    updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        this.timeElement.textContent = `${hours}:${minutes}`;
    }
}

class ParallaxEffect {
    constructor() {
        this.heroSection = document.querySelector('.hero');
        this.watchMockup = document.querySelector('.watch-mockup');
        this.init();
    }
    
    init() {
        if (this.heroSection && this.watchMockup) {
            window.addEventListener('scroll', () => this.handleScroll());
        }
    }
    
    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < this.heroSection.offsetHeight) {
            this.watchMockup.style.transform = `translateY(${rate}px)`;
        }
    }
}

class KeyboardNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeToggle.click();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileNavigation();
    new ScrollAnimations();
    new SmoothScrolling();
    new ContactForm();
    new LazyLoading();
    new WatchFaceAnimation();
    new ParallaxEffect();
    new KeyboardNavigation();

    // Get Started button scroll to #features
    const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Watch Demo button open modal
    const watchDemoBtn = document.querySelector('.hero-buttons .btn-secondary');
    const demoModal = document.getElementById('demoModal');
    const modalCloseBtn = document.getElementById('modalClose');

    if (watchDemoBtn && demoModal && modalCloseBtn) {
        watchDemoBtn.addEventListener('click', () => {
            demoModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // prevent background scroll
        });

        modalCloseBtn.addEventListener('click', () => {
            demoModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });

        demoModal.addEventListener('click', (e) => {
            if (e.target === demoModal) {
                demoModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && demoModal.getAttribute('aria-hidden') === 'false') {
                demoModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    }

    document.body.classList.add('loaded');
});

const keyboardNavigationCSS = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }
    
    body.loaded {
        opacity: 1;
        transition: opacity 0.3s ease-in-out;
    }
    
    body {
        opacity: 0;
    }
`;

const style = document.createElement('style');
style.textContent = keyboardNavigationCSS;
document.head.appendChild(style);

window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}
