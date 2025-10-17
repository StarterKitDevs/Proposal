// GETSTARTERKIT Investment Landing Page JavaScript

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = section.offsetTop - navHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Animated counter for statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number based on the target value
        if (target >= 1000) {
            element.textContent = (current / 1000).toFixed(1) + 'B';
        } else if (target > 100) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = current.toFixed(1) + '%';
        }
    }, 16);
}

// Intersection Observer for scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                

                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToObserve = document.querySelectorAll(
        'section, .value-card, .platform-card, .investment-card, .traction-item, .potential-item, .advantage-item'
    );
    
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
}



// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                max-width: 400px;
                padding: 16px;
                border-radius: 8px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
                z-index: 1001;
                animation: slideInRight 0.3s ease-out;
            }
            
            .notification--success {
                background: #0a5d3a;
                border-left: 4px solid #00ff00;
                color: white;
            }
            
            .notification--error {
                background: #5d0a0a;
                border-left: 4px solid #ff4444;
                color: white;
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 12px;
            }
            
            .notification-message {
                flex: 1;
                line-height: 1.4;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Navbar scroll effect
function setupNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Enhanced hover effects for cards
function setupCardEffects() {
    const cards = document.querySelectorAll('.value-card, .platform-card, .investment-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Parallax effect for hero background
function setupParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Add navigation click handlers
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Typing effect for hero headline
function setupTypingEffect() {
    const headline = document.querySelector('.hero-headline');
    if (!headline) return;
    
    const originalText = headline.textContent;
    headline.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        headline.textContent = originalText.substring(0, i + 1);
        i++;
        
        if (i >= originalText.length) {
            clearInterval(typeInterval);
        }
    }, 50);
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('GETSTARTERKIT Investment Landing Page Loaded');
    
    // Initialize all features
    setupScrollAnimations();

    setupNavbarScrollEffect();
    setupCardEffects();
    setupParallaxEffect();
    setupNavigation();
    
    // Add a small delay for typing effect to be more noticeable
    setTimeout(() => {
        setupTypingEffect();
    }, 500);
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Handle window resize events
window.addEventListener('resize', throttle(() => {
    // Recalculate any position-dependent effects here if needed
    console.log('Window resized, recalculating layouts...');
}, 250));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Allow navigation with arrow keys
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.scrollBy(0, 100);
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.scrollBy(0, -100);
    }
});

// Export functions for potential external use
window.GETSTARTERKIT = {
    scrollToSection,
    showNotification,
    animateCounter
};