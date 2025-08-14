// Internationalization Module
class I18n {
    constructor() {
        this.translations = {};
    }

    async load(language = 'en') {
        try {
            const response = await fetch(`locales/${language}.json`);
            this.translations = await response.json();
            this.apply();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    apply() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const value = this.getNestedValue(key);
            if (value) {
                this.updateElement(element, value);
            }
        });
    }

    getNestedValue(path) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : null;
        }, this.translations);
    }

    updateElement(element, value) {
        if (element.tagName === 'BUTTON' && element.querySelector('i')) {
            const icon = element.querySelector('i');
            element.innerHTML = icon.outerHTML + ' ' + value;
        } else if (element.innerHTML.includes('<strong>')) {
            const strongMatch = element.innerHTML.match(/<strong>(.*?)<\/strong>/);
            if (strongMatch) {
                const strongText = strongMatch[1];
                const newValue = value.replace(strongText, `<strong>${strongText}</strong>`);
                element.innerHTML = newValue;
            } else {
                element.textContent = value;
            }
        } else {
            element.textContent = value;
        }
    }
}

// Theme Management Module
class ThemeManager {
    constructor() {
        this.body = document.body;
        this.themeToggle = document.querySelector('.theme-toggle i');
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.body.setAttribute('data-theme', 'dark');
            this.themeToggle.className = 'fas fa-sun';
        } else {
            this.themeToggle.className = 'fas fa-moon';
        }
    }

    toggle() {
        if (this.body.getAttribute('data-theme') === 'dark') {
            this.body.removeAttribute('data-theme');
            this.themeToggle.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            this.body.setAttribute('data-theme', 'dark');
            this.themeToggle.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    }
}

// Language Management Module
class LanguageManager {
    constructor(i18n) {
        this.i18n = i18n;
        this.languageToggle = document.querySelector('.language-toggle');
        this.init();
    }

    init() {
        const savedLanguage = localStorage.getItem('language') || 'en';
        this.i18n.load(savedLanguage);
        this.updateButtonText(savedLanguage);
    }

    toggle() {
        const currentLanguage = localStorage.getItem('language') || 'en';
        const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
        this.i18n.load(newLanguage);
        localStorage.setItem('language', newLanguage);
        this.updateButtonText(newLanguage);
    }

    updateButtonText(language) {
        this.languageToggle.textContent = language === 'en' ? 'ES' : 'EN';
    }
}

// Utility Functions
class Utils {
    static addHoverEffect(selector, hoverColor = 'var(--hover-color)') {
        const elements = document.querySelectorAll(selector);
        elements.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = hoverColor;
                this.style.transition = 'background-color 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    }

    static addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    }
}

// Main Application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize modules
    const i18n = new I18n();
    const themeManager = new ThemeManager();
    const languageManager = new LanguageManager(i18n);

    // Add hover effects
    Utils.addHoverEffect('.experience-item');
    Utils.addHoverEffect('.education-item');
    Utils.addHoverEffect('.skill-category');
    Utils.addHoverEffect('.languages');
    Utils.addHoverEffect('.header', 'var(--hover-light)');
    Utils.addHoverEffect('.summary-text', 'var(--hover-light)');

    // Add scroll animations
    Utils.addScrollAnimations();

    // PDF Download Module
    class PDFDownloader {
        constructor() {
            this.PDF_URL = 'assets/documents/David_Ardila_CV.pdf';
            this.init();
        }

        init() {
            window.downloadPDF = this.download.bind(this);
        }

        download() {
            const button = event.target.closest('button');
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            button.style.cursor = 'wait';
            
            const link = document.createElement('a');
            link.href = this.PDF_URL;
            link.download = 'David_Ardila_CV.pdf';
            link.target = '_blank';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.cursor = 'pointer';
            }, 1000);
        }
    }

    // Initialize PDF downloader
    new PDFDownloader();

    // Global functions for HTML onclick
    window.toggleTheme = () => themeManager.toggle();
    window.toggleLanguage = () => languageManager.toggle();

    console.log('Minimalist CV loaded successfully! 🚀');
});


