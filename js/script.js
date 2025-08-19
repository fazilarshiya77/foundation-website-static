// Donation Amount Selection
document.addEventListener('DOMContentLoaded', function() {
    // Donation amount buttons
    const amountButtons = document.querySelectorAll('.btn-amount');
    const customAmountInput = document.getElementById('customAmount');
    
    if (amountButtons.length > 0) {
        amountButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                amountButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Set custom amount input value
                const amount = this.getAttribute('data-amount');
                if (amount !== 'custom' && customAmountInput) {
                    customAmountInput.value = amount;
                } else if (amount === 'custom' && customAmountInput) {
                    customAmountInput.focus();
                }
            });
        });
    }
    
    // Custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            // Remove active class from all preset buttons when custom amount is entered
            amountButtons.forEach(btn => {
                if (btn.getAttribute('data-amount') !== 'custom') {
                    btn.classList.remove('active');
                }
            });
            
            // Add active class to custom button
            const customButton = document.querySelector('.btn-amount[data-amount="custom"]');
            if (customButton && this.value) {
                customButton.classList.add('active');
            }
        });
    }
    
    // Form submissions
    const donationForm = document.getElementById('donationForm');
    const contactForm = document.getElementById('contactForm');
    
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const customAmount = document.getElementById('customAmount').value;
            const monthlyPayment = document.getElementById('monthlyPayment').checked;
            
            // Basic validation
            if (!fullName || !email) {
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!customAmount || customAmount <= 0) {
                alert('Please select or enter a donation amount.');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you ${fullName}! Your ${monthlyPayment ? 'monthly ' : ''}donation of $${customAmount} is being processed.`);
            
            // Reset form
            this.reset();
            amountButtons.forEach(btn => btn.classList.remove('active'));
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            alert(`Thank you ${name}! Your message has been sent. We'll get back to you soon.`);
            
            // Reset form
            this.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar collapse on mobile after clicking a link
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.value-card, .impact-card, .contact-card, .program-item');
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Utility function for email validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function for phone validation
function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Add scroll-to-top functionality
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scrollToTop');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Create scroll-to-top button dynamically
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--teal-color);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--coral-color)';
        this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--teal-color)';
        this.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(button);
}

// Initialize scroll-to-top button
createScrollToTopButton();