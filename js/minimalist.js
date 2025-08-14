// Minimalist CV JavaScript
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

    // Add PDF download functionality
    const downloadButton = document.createElement('button');
    downloadButton.innerHTML = '<i class="fas fa-download"></i> Download PDF';
    downloadButton.className = 'download-button';
    downloadButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #333;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        font-family: 'Montserrat', sans-serif;
        font-size: 14px;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;
    
    downloadButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--button-hover)';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 12px var(--shadow-hover)';
    });
    
    downloadButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--button-bg)';
        this.style.transform = '';
        this.style.boxShadow = '0 2px 8px var(--shadow)';
    });
    
    downloadButton.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
        this.style.cursor = 'wait';
        
        const link = document.createElement('a');
        link.href = PDF_URL;
        link.download = 'David_Ardila_CV.pdf';
        link.target = '_blank';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.cursor = 'pointer';
        }, 1000);
    });
    
    // Add download button to page
    document.body.appendChild(downloadButton);

    // Global download function for footer button
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

    // Responsive positioning for fixed button
    function updateButtonPosition() {
        if (window.innerWidth <= 768) {
            downloadButton.style.top = '10px';
            downloadButton.style.right = '10px';
            downloadButton.style.padding = '8px 12px';
            downloadButton.style.fontSize = '12px';
        } else {
            downloadButton.style.top = '20px';
            downloadButton.style.right = '20px';
            downloadButton.style.padding = '10px 15px';
            downloadButton.style.fontSize = '14px';
        }
    }

    updateButtonPosition();
    window.addEventListener('resize', updateButtonPosition);

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
});

// Theme toggle function
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeToggle.className = 'fas fa-moon';
    }
});
