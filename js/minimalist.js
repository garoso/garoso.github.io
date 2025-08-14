// Minimalist CV JavaScript
let translations = {};

// Load translations
async function loadTranslations(language = 'en') {
    try {
        const response = await fetch(`locales/${language}.json`);
        translations = await response.json();
        applyTranslations();
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// Apply translations to DOM elements
function applyTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);
        if (value) {
            // Handle special cases for elements with HTML content
            if (element.tagName === 'BUTTON' && element.querySelector('i')) {
                // Keep the icon, update only the text
                const icon = element.querySelector('i');
                element.innerHTML = icon.outerHTML + ' ' + value;
            } else if (element.innerHTML.includes('<strong>')) {
                // Handle elements with <strong> tags like languages
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
    });
}

// Get nested object value by dot notation
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : null;
    }, obj);
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Utility function for hover effects
    function addHoverEffect(selector, hoverColor = 'var(--hover-color)') {
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

    // Add hover effects to all interactive elements
    addHoverEffect('.experience-item');
    addHoverEffect('.education-item');
    addHoverEffect('.skill-category');
    addHoverEffect('.languages', 'var(--hover-color)');
    addHoverEffect('.header', 'var(--hover-light)');
    addHoverEffect('.summary-text', 'var(--hover-light)');

    // PDF Download Configuration
    const PDF_URL = 'assets/documents/David_Ardila_CV.pdf';

    // Global download function
    window.downloadPDF = function() {
        const button = event.target.closest('button');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        button.style.cursor = 'wait';
        
        const link = document.createElement('a');
        link.href = PDF_URL;
        link.download = 'David_Ardila_CV.pdf';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.cursor = 'pointer';
        }, 1000);
    };



    // Add subtle animations on scroll
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Observe sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    console.log('Minimalist CV loaded successfully! 🚀');
    
    // Load translations
    loadTranslations('en');
});

// Theme toggle function
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.className = 'fas fa-moon'; // Show moon to switch to dark
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.className = 'fas fa-sun'; // Show sun to switch to light
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.className = 'fas fa-sun'; // Show sun to switch to light
    } else {
        themeToggle.className = 'fas fa-moon'; // Show moon to switch to dark
    }
});

// Global function to change language
window.changeLanguage = function(language) {
    loadTranslations(language);
    localStorage.setItem('language', language);
};

// Toggle language function
window.toggleLanguage = function() {
    const currentLanguage = localStorage.getItem('language') || 'en';
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    changeLanguage(newLanguage);
    
    // Update language toggle button text to show the option to switch to
    const languageToggle = document.querySelector('.language-toggle');
    languageToggle.textContent = newLanguage === 'en' ? 'ES' : 'EN';
};

// Load saved language on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('language') || 'en';
    loadTranslations(savedLanguage);
    
    // Set initial language toggle button text to show the option to switch to
    const languageToggle = document.querySelector('.language-toggle');
    languageToggle.textContent = savedLanguage === 'en' ? 'ES' : 'EN';
});
