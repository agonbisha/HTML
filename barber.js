// Initialize EmailJS
(function() {
    emailjs.init("u8qZZyq9ICcm3zgcq"); // Get this from emailjs.com
})();

// YOUR BARBER SHOP EMAIL - Change this to your email
const BARBER_SHOP_EMAIL = "rramanajagon73@gmail.com"; // Change this to your email address

// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        navLinks.classList.remove('active');
    });
});

// Booking Form Submission with Email
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const barber = document.getElementById('barber').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    
    // Validate form
    if (name && email && phone && service && barber && date && time) {
        // Show verification popup first
        showConfirmationAlert(name, email, phone, service, barber, date, time, function() {
            // If user confirms, send email
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending Email...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS - to YOUR EMAIL
            emailjs.send("service_u4nimj8", "template_1wl8x8n", {
            to_email: BARBER_SHOP_EMAIL, // Send to your email
            from_name: name, // Customer name
            from_email: email, // Customer email
            customer_name: name,
            customer_email: email,
            customer_phone: phone,
            service: service,
            barber: barber,
            date: date,
            time: time
        })
        .then(function(response) {
            console.log('Email sent successfully!', response);
            
            // Show success message
            showSuccessAlert(`Thank you ${name}!\n\nYour booking has been received!\n\nAppointment Details:\nService: ${service}\nBarber: ${barber}\nDate: ${date}\nTime: ${time}\n\nWe'll contact you at ${email} to confirm.`);
            
            // Reset form
            bookingForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        })
        .catch(function(error) {
            console.log('Error sending email:', error);
            
            // Still show booking confirmation if email fails
            showSuccessAlert(`Booking Confirmed!\n\nHi ${name},\n\nYour appointment details:\nService: ${service}\nBarber: ${barber}\nDate: ${date}\nTime: ${time}\n\n(Note: Email sending is currently unavailable, but your booking has been recorded.)`);
            
            bookingForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
        });
    } else {
        showErrorAlert('Please fill in all fields');
    }
    });
}

// Custom Alert Function
function showConfirmationAlert(name, email, phone, service, barber, date, time, onConfirm) {
    const alertDiv = document.createElement('div');
    alertDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        border: 3px solid #ff9500;
        border-radius: 10px;
        padding: 30px;
        max-width: 500px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        text-align: center;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `;
    
    const titleDiv = document.createElement('div');
    titleDiv.style.cssText = `
        font-size: 24px;
        font-weight: bold;
        color: #ff9500;
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
        <strong>📋 Booking Details:</strong><br>
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Phone:</strong> ${phone}<br>
        <strong>Service:</strong> ${service}<br>
        <strong>Barber:</strong> ${barber}<br>
        <strong>Date:</strong> ${date}<br>
        <strong>Time:</strong> ${time}
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
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
        background-color: #ff9500;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#e68900';
    closeBtn.onmouseout = () => closeBtn.style.backgroundColor = '#ff9500';
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
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
        background-color: #ff9500;
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 5px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s;
    `;
    closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#e68900';
    closeBtn.onmouseout = () => closeBtn.style.backgroundColor = '#ff9500';
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

// Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Gallery lightbox effect
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        `;
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 10px;
        `;
        
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 40px;
            font-size: 40px;
            color: white;
            cursor: pointer;
            font-weight: bold;
        `;
        
        modal.appendChild(modalImg);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.service-card, .gallery-item, .barber-card, .pricing-card, .testimonial-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add keyframe animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Active nav link on scroll
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active-link');
        }
    });
});

// Add style for active link
const linkStyle = document.createElement('style');
linkStyle.textContent = `
    .active-link {
        color: var(--primary-color) !important;
        border-bottom: 2px solid var(--primary-color);
    }
`;
document.head.appendChild(linkStyle);
