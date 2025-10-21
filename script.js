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
});

// Image Modal Functionality
let currentImageIndex = 0;
const imagePaths = [
    // Initial images from album-d445997216-downloads-pt1
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3170-optimized.jpg',
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
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3184-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3186-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3191-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3194-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3198-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3201-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3202-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3203-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3207-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3209-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3211-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3212-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3213-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3214-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3215-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3220-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3221-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3224-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3226-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3229-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3233-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3236-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3241-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3242-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3244-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3245-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3248-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3250-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3251-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3254-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3258-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3259-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3260-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3261-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3263-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3264-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3265-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3267-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3268-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3270-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3272-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3274-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3278-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3282-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3283-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3289-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3291-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3292-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3293-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3294-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3296-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3297-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3301-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3305-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3306-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3308-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3313-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3315-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3316-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3318-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3322-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3327-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3330-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3333-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3334-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3335-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3337-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3338-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3339-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3341-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3342-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3346-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3347-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3351-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3353-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3355-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3356-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3359-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3362-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3364-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3373-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3375-optimized.jpg',
    'ALCON Images/album-d445997216-downloads-pt1/IMGL3377-optimized.jpg',
    // Additional images from BPI_Clareon_Launch
    'ALCON Images/BPI_Clareon_Launch/20250703_182139259.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_182330889.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_182836705.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_182854096.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_183000127.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_183022669.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_183052258.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_183214471.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_183414227.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_183654875.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_184029978.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_184706339.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_184719917.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_184925967.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_184947674.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_185043378.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_185103495.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_185325896.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_185456640.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_185517639.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_185549531.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_210832481.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213158503.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213221870.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213243780.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213421780.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213453238.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213520670.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213640125.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213805648.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213902244.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213930411.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_213945548.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_214018363.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_214108335.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_214303972.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_214338934.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_214606587.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_214631040.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_214828710.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_214904898.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_214936834.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_214947880.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_215019726.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_215307985.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_215321117.jpg',
    'ALCON Images/BPI_Clareon_Launch/20250703_215348770.jpg'
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

// Calendly Integration
function openCalendly() {
    // Replace 'your-calendly-username' with your actual Calendly username
    Calendly.initPopupWidget({
        url: 'https://calendly.com/vantageviewtnt'
    });
}

// Service Worker Registration for caching
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Detect if running on GitHub Pages
        const isGitHubPages = window.location.hostname.includes('github.io');
        const swPath = isGitHubPages ? '/vantage-view/sw.js' : '/sw.js';
        
        navigator.serviceWorker.register(swPath)
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
