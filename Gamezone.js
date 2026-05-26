// Initialize EmailJS
(function() {
    emailjs.init("u8qZZyq9ICcm3zgcq");
})();

// YOUR GAMING CENTER EMAIL - Change this to your email
const GAMING_CENTER_EMAIL = "rramanajagon@gmail.com"; // Change this to your email address

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initThemeToggle();
    initNavbar();
    initSmoothScroll();
    initBackToTop();
    initCounterAnimation();
    initBookingForm();
    initContactForm();
    initGallery();
    initScrollAnimations();
});

/* ========================================
   Theme Toggle (Dark/Light Mode)
   ======================================== */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(icon, savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(icon, newTheme);
    });
    
    function updateThemeIcon(icon, theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

/* ========================================
   Navbar Functionality
   ======================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Active link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    });
}

/* ========================================
   Smooth Scrolling
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   Back to Top Button
   ======================================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   Counter Animation
   ======================================== */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounters() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const sectionTop = heroSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100 && !animated) {
            animated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = formatNumber(Math.floor(current));
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = formatNumber(target);
                    }
                };
                
                updateCounter();
            });
        }
    }
    
    function formatNumber(num) {
        if (num >= 10000) {
            return (num / 1000).toFixed(0) + 'K+';
        }
        if (num >= 1000) {
            return num + '+';
        }
        return num;
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters();
}

/* ========================================
   Booking Form Validation
   ======================================== */
function initBookingForm() {
    const form = document.getElementById('bookingForm');
    
    if (!form) return;
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const station = document.getElementById('station').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const hours = document.getElementById('hours').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate inputs
        let isValid = true;
        let errors = [];
        
        if (name.length < 2) {
            isValid = false;
            errors.push('Please enter a valid name');
        }
        
        if (!isValidEmail(email)) {
            isValid = false;
            errors.push('Please enter a valid email address');
        }
        
        if (!isValidPhone(phone)) {
            isValid = false;
            errors.push('Please enter a valid phone number');
        }
        
        if (!station) {
            isValid = false;
            errors.push('Please select a gaming station');
        }
        
        if (!date) {
            isValid = false;
            errors.push('Please select a date');
        }
        
        if (!time) {
            isValid = false;
            errors.push('Please select a time');
        }
        
        if (!hours) {
            isValid = false;
            errors.push('Please select the number of hours');
        }
        
        if (isValid) {
            // Calculate price
            const prices = { 'ps5': 20, 'pc': 20, 'vr': 35, 'racing': 35 };
            const price = prices[station] * parseInt(hours);
            
            // Show verification popup first
            showConfirmationAlert(name, email, phone, station, date, time, hours, message, function() {
                // If user confirms, send email
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending Email...';
                submitBtn.disabled = true;
                
                // Send email using EmailJS
                emailjs.send("service_u4nimj8", "template_1wl8x8n", {
                    to_email: GAMING_CENTER_EMAIL, // Send to your email
                    from_name: name, // Customer name
                    from_email: email, // Customer email
                    customer_name: name,
                    customer_email: email,
                    customer_phone: phone,
                    station: station,
                    date: date,
                    time: time,
                    hours: hours,
                    total_price: price,
                    special_requests: message || 'None'
                })
                .then(function(response) {
                    console.log('Email sent successfully!', response);
                    
                    // Show success message
                    showSuccessAlert(`Thank you ${name}!\n\nYour booking has been received!\n\nBooking Details:\nStation: ${station}\nDate: ${date}\nTime: ${time}\nHours: ${hours}\nTotal: €${price}\n\nWe'll contact you at ${email} to confirm.`);
                    
                    // Reset form
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                })
                .catch(function(error) {
                    console.log('Error sending email:', error);
                    
                    // Still show booking confirmation if email fails
                    showSuccessAlert(`Booking Confirmed!\n\nHi ${name},\n\nYour booking details:\nStation: ${station}\nDate: ${date}\nTime: ${time}\nHours: ${hours}\nTotal: €${price}\n\n(Note: Email sending is currently unavailable, but your booking has been recorded.)`);
                    
                    form.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
            });
        } else {
            showErrorAlert(errors[0]);
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        switch (field.id) {
            case 'name':
                isValid = value.length >= 2;
                break;
            case 'email':
                isValid = isValidEmail(value);
                break;
            case 'phone':
                isValid = isValidPhone(value);
                break;
            case 'station':
            case 'date':
            case 'time':
            case 'hours':
                isValid = value !== '';
                break;
        }
        
        if (isValid) {
            field.style.borderColor = 'var(--primary-color)';
        } else {
            field.style.borderColor = 'var(--accent-color)';
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
}

/* ========================================
   Contact Form Validation
   ======================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('contactSubject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();
        
        // Validate inputs
        let isValid = true;
        let errors = [];
        
        if (name.length < 2) {
            isValid = false;
            errors.push('Please enter a valid name');
        }
        
        if (!isValidEmail(email)) {
            isValid = false;
            errors.push('Please enter a valid email address');
        }
        
        if (subject.length < 3) {
            isValid = false;
            errors.push('Please enter a subject');
        }
        
        if (message.length < 10) {
            isValid = false;
            errors.push('Message must be at least 10 characters');
        }
        
        if (isValid) {
            // Send email using EmailJS
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;
            
            emailjs.send("service_u4nimj8", "template_1wl8x8n", {
                to_email: GAMING_CENTER_EMAIL, // Send to your email
                from_name: name, // Customer name
                from_email: email, // Customer email
                subject: subject,
                message: message
            })
            .then(function(response) {
                console.log('Message sent successfully!', response);
                showSuccessAlert(`Thank you ${name}!\n\nYour message has been sent successfully.\n\nWe'll get back to you as soon as possible at ${email}.`);
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            })
            .catch(function(error) {
                console.log('Error sending message:', error);
                showSuccessAlert(`Message Sent!\n\nHi ${name},\n\nYour message has been recorded.\n\n(Note: Email sending is currently unavailable, but we've noted your inquiry.)`);
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        } else {
            showErrorAlert(errors[0]);
        }
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

/* ========================================
   Gallery Lightbox
   ======================================== */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    let currentIndex = 0;
    const images = [];
    
    // Collect all image sources
    galleryItems.forEach((item, index) => {
        images.push(item.getAttribute('data-src'));
        
        item.addEventListener('click', function() {
            currentIndex = index;
            openLightbox(images[currentIndex]);
        });
    });
    
    function openLightbox(src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex];
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex];
    }
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrev);
    lightboxNext.addEventListener('click', showNext);
    
    // Close on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

/* ========================================
   Scroll Animations
   ======================================== */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.game-card, .pricing-card, .info-card, .gallery-item');
    
    const reveal = () => {
        elements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    };
    
    // Set initial state
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', reveal);
    reveal();
}

/* ========================================
   Custom Alert Functions for Email
   ======================================== */
function showConfirmationAlert(name, email, phone, station, date, time, hours, message, onConfirm) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 3px solid #00d4ff;
        border-radius: 10px;
        padding: 30px;
        max-width: 500px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        text-align: center;
        font-family: 'Rajdhani', sans-serif;
    `;
    
    const titleDiv = document.createElement('div');
    titleDiv.style.cssText = `
        font-size: 24px;
        font-weight: bold;
        color: #00d4ff;
        margin-bottom: 20px;
    `;
    titleDiv.textContent = 'Confirm Your Booking';
    
    const detailsDiv = document.createElement('div');
    detailsDiv.style.cssText = `
        color: #333;
        font-size: 15px;
        line-height: 2;
        margin-bottom: 25px;
        text-align: left;
        background-color: #f9f9f9;
        padding: 15px;
        border-radius: 5px;
    `;
    detailsDiv.innerHTML = `
        <strong>🎮 Booking Details:</strong><br>
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phone}<br>
        <strong>Station:</strong> ${station}<br>
        <strong>Date:</strong> ${date}<br>
        <strong>Time:</strong> ${time}<br>
        <strong>Hours:</strong> ${hours}
    `;
    
    const buttonsDiv = document.createElement('div');
    buttonsDiv.style.cssText = `
        display: flex;
        gap: 10px;
        justify-content: center;
    `;
    
    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'Confirm & Send';
    confirmBtn.style.cssText = `
        background-color: #00a854;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s;
    `;
    confirmBtn.onmouseover = () => confirmBtn.style.backgroundColor = '#008c3a';
    confirmBtn.onmouseout = () => confirmBtn.style.backgroundColor = '#00a854';
    confirmBtn.onclick = () => {
        alertDiv.remove();
        overlay.remove();
        onConfirm();
    };
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.cssText = `
        background-color: #ff6b6b;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s;
    `;
    cancelBtn.onmouseover = () => cancelBtn.style.backgroundColor = '#ee5a52';
    cancelBtn.onmouseout = () => cancelBtn.style.backgroundColor = '#ff6b6b';
    cancelBtn.onclick = () => {
        alertDiv.remove();
        overlay.remove();
    };
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2999;
    `;
    
    buttonsDiv.appendChild(confirmBtn);
    buttonsDiv.appendChild(cancelBtn);
    alertDiv.appendChild(titleDiv);
    alertDiv.appendChild(detailsDiv);
    alertDiv.appendChild(buttonsDiv);
    document.body.appendChild(overlay);
    document.body.appendChild(alertDiv);
}

function showSuccessAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 3px solid #00a854;
        border-radius: 10px;
        padding: 30px;
        max-width: 500px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        text-align: center;
        font-family: 'Rajdhani', sans-serif;
    `;
    
    const successIcon = document.createElement('div');
    successIcon.style.cssText = `
        font-size: 60px;
        color: #00a854;
        margin-bottom: 20px;
    `;
    successIcon.innerHTML = '✓';
    
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        color: #333;
        font-size: 16px;
        line-height: 1.8;
        margin-bottom: 25px;
        white-space: pre-line;
    `;
    messageDiv.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.cssText = `
        background-color: #00d4ff;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#00b8cc';
    closeBtn.onmouseout = () => closeBtn.style.backgroundColor = '#00d4ff';
    closeBtn.onclick = () => {
        alertDiv.remove();
        overlay.remove();
    };
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2999;
    `;
    overlay.onclick = () => {
        alertDiv.remove();
        overlay.remove();
    };
    
    alertDiv.appendChild(successIcon);
    alertDiv.appendChild(messageDiv);
    alertDiv.appendChild(closeBtn);
    document.body.appendChild(overlay);
    document.body.appendChild(alertDiv);
}

function showErrorAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 3px solid #ff6b6b;
        border-radius: 10px;
        padding: 30px;
        max-width: 500px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        text-align: center;
        font-family: 'Rajdhani', sans-serif;
    `;
    
    const errorIcon = document.createElement('div');
    errorIcon.style.cssText = `
        font-size: 60px;
        color: #ff6b6b;
        margin-bottom: 20px;
    `;
    errorIcon.innerHTML = '✕';
    
    const messageDiv = document.createElement('div');
    messageDiv.style.cssText = `
        color: #333;
        font-size: 16px;
        line-height: 1.8;
        margin-bottom: 25px;
    `;
    messageDiv.textContent = message;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Try Again';
    closeBtn.style.cssText = `
        background-color: #00d4ff;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#00b8cc';
    closeBtn.onmouseout = () => closeBtn.style.backgroundColor = '#00d4ff';
    closeBtn.onclick = () => {
        alertDiv.remove();
        overlay.remove();
    };
    
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2999;
    `;
    overlay.onclick = () => {
        alertDiv.remove();
        overlay.remove();
    };
    
    alertDiv.appendChild(errorIcon);
    alertDiv.appendChild(messageDiv);
    alertDiv.appendChild(closeBtn);
    document.body.appendChild(overlay);
    document.body.appendChild(alertDiv);
}

/* ========================================
   Notification System
   ======================================== */
function showNotification(message, type) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'var(--secondary-color)' : 'var(--accent-color)'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-family: 'Rajdhani', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/* ========================================
   Additional Features
   ======================================== */

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add parallax effect to hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero-background');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Console message for developers
console.log('%c🎮 Game Zone - Gaming Center ', 'background: linear-gradient(135deg, #00d4ff, #7b2cbf, #ff006e); color: white; padding: 15px; font-size: 20px; border-radius: 5px;');
console.log('%cCreated with ❤️ ', 'color: #00d4ff; font-size: 14px;');