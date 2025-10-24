// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.2)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .client-item, .contact-item, .leader-card, .gallery-item, .detail-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const company = contactForm.querySelector('input[placeholder="Company Name"]').value;
        const service = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Create mailto link
        const subject = `Event Inquiry from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\nMessage: ${message}`;
        const mailtoLink = `mailto:Vantageviewtnt@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        alert('Thank you for your inquiry! Your email client should open with a pre-filled message.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const number = parseInt(text.replace(/\D/g, ''));
                    animateCounter(stat, number);
                    stat.textContent = number + '+';
                } else if (text === '100%') {
                    stat.textContent = '100%';
                } else if (text === '2025') {
                    stat.textContent = '2025';
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Service cards hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.03)';
        card.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    });
});

// Client items hover effect
document.querySelectorAll('.client-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.08)';
        item.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.3)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
        item.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Performance optimized initialization
document.addEventListener('DOMContentLoaded', () => {
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            setTimeout(() => {
                typeWriter(heroTitle, originalText, 50);
            }, 500);
        }
    });
    
    // Initialize lazy loading for images
    initLazyLoading();
    
    // Initialize intersection observer for animations
    initScrollAnimations();
    
// Initialize analytics tracking
initAnalytics();

// Check Calendly loading
window.addEventListener('load', function() {
    setTimeout(function() {
        if (typeof Calendly !== 'undefined') {
            console.log('Calendly loaded successfully');
        } else {
            console.error('Calendly failed to load');
        }
    }, 2000); // Wait 2 seconds for Calendly to load
});

// Track gallery interactions if on gallery page
    if (window.location.pathname.includes('gallery.html')) {
        initGalleryAnalytics();
    }
});

// Image Modal Functionality
let currentImageIndex = 0;
const imagePaths = [
    // 12 carefully selected images from the Alcon BPI Clareon Launch (all from album-d445997216-downloads-pt1)
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3171-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3172-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3173-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3174-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3175-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3176-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3177-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3178-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3179-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3182-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3183-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3184-optimized.jpg'
];

function openModal(imagePath) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    currentImageIndex = imagePaths.indexOf(imagePath);
    modalImage.src = imagePath;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= imagePaths.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = imagePaths.length - 1;
    }
    
    const modalImage = document.getElementById('modalImage');
    modalImage.src = imagePaths[currentImageIndex];
}

// Close modal when clicking outside the image
document.addEventListener('click', (e) => {
    const modal = document.getElementById('imageModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Lazy loading implementation
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('imageModal');
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// Google Analytics Event Tracking
function trackEvent(eventName, eventCategory, eventLabel, value) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: eventCategory,
            event_label: eventLabel,
            value: value
        });
    }
}

// Track page interactions
function initAnalytics() {
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('navigation_click', 'Navigation', this.textContent.trim());
        });
    });

    // Track service card clicks
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent.trim();
            trackEvent('service_view', 'Services', serviceName);
        });
    });

    // Track client logo clicks
    document.querySelectorAll('.client-item').forEach(client => {
        client.addEventListener('click', function() {
            const clientName = this.querySelector('img').alt || 'Unknown Client';
            trackEvent('client_click', 'Clients', clientName);
        });
    });

    // Track contact form interactions
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            trackEvent('form_submit', 'Contact', 'Contact Form');
        });
    }

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
            maxScroll = scrollPercent;
            trackEvent('scroll_depth', 'Engagement', `${scrollPercent}%`);
        }
    });
}

// Gallery-specific analytics
function initGalleryAnalytics() {
    // Track gallery image clicks
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        item.addEventListener('click', function() {
            const imageName = this.querySelector('img').src.split('/').pop();
            trackEvent('gallery_image_click', 'Gallery', imageName, index + 1);
        });
    });

    // Track modal interactions
    const modal = document.getElementById('imageModal');
    if (modal) {
        // Track modal open
        const originalOpenModal = window.openModal;
        window.openModal = function(imagePath) {
            const imageName = imagePath.split('/').pop();
            trackEvent('modal_open', 'Gallery', imageName);
            originalOpenModal(imagePath);
        };

        // Track modal navigation
        const originalChangeImage = window.changeImage;
        window.changeImage = function(direction) {
            trackEvent('modal_navigation', 'Gallery', direction > 0 ? 'Next' : 'Previous');
            originalChangeImage(direction);
        };

        // Track modal close
        const originalCloseModal = window.closeModal;
        window.closeModal = function() {
            trackEvent('modal_close', 'Gallery', 'Close');
            originalCloseModal();
        };
    }

    // Track gallery scroll depth
    let galleryScrollDepth = 0;
    const galleryContainer = document.querySelector('.gallery-grid');
    if (galleryContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const scrollPercent = Math.round((entry.boundingClientRect.top / window.innerHeight) * 100);
                    if (scrollPercent > galleryScrollDepth && scrollPercent % 20 === 0) {
                        galleryScrollDepth = scrollPercent;
                        trackEvent('gallery_scroll', 'Gallery', `${scrollPercent}%`);
                    }
                }
            });
        });

        document.querySelectorAll('.gallery-item').forEach(item => {
            observer.observe(item);
        });
    }
}

// EmailJS Configuration
(function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("s_Ry3i7Nb2sIrzVlk");
    console.log('EmailJS initialized with public key: s_Ry3i7Nb2sIrzVlk');
})();

// Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Prevent any form submission
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            console.log('Form submitted, preventing default behavior');
            
            // Call the email sending function
            handleFormSubmission();
            return false;
        });
        
        // Also prevent form submission on button click
        const submitButton = contactForm.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                console.log('Submit button clicked, preventing default behavior');
                
                // Call the email sending function
                handleFormSubmission();
                return false;
            });
        }
    } else {
        console.error('Contact form not found');
    }
});

// Separate function to handle form submission
function handleFormSubmission() {
    
    // Get form data
    const formData = {
        from_name: document.getElementById('from_name').value,
        from_email: document.getElementById('from_email').value,
        company_name: document.getElementById('company_name').value,
        service_type: document.getElementById('service_type').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not loaded');
        showNotification('Email service not available. Please try again later.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    console.log('Sending email with EmailJS...');
    // Send email using EmailJS
    emailjs.send('service_7jiskop', 'template_iyh9wer', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Track successful form submission
            trackEvent('form_submit_success', 'Contact', 'Contact Form');
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
            
            // Track failed form submission
            trackEvent('form_submit_error', 'Contact', 'Contact Form');
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
}

// Calendly Integration
function openCalendly() {
    // Track Calendly open event
    trackEvent('calendly_open', 'Booking', 'Calendar Icon Click');
    
    // Check if Calendly is loaded
    if (typeof Calendly === 'undefined') {
        console.error('Calendly not loaded');
        showNotification('Booking service not available. Please try again later.', 'error');
        return;
    }
    
    console.log('Opening Calendly popup...');
    // Your actual Calendly username
    Calendly.initPopupWidget({
        url: 'https://calendly.com/admin-globalvantageview'
    });
}

// Notification System
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Service Worker Registration for caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Detect if running on custom domain or GitHub Pages
        const isCustomDomain = window.location.hostname.includes('globalvantageview.com');
        const swPath = isCustomDomain ? '/sw.js' : '/vantage-view/sw.js';
        
        navigator.serviceWorker.register(swPath)
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
