 // Theme Toggle Functionality
 function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
        localStorage.removeItem('theme');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
        // Note: localStorage not available, would normally save theme preference
    }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px var(--shadow)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Animated Counter
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

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 500);
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger specific animations
            if (entry.target.classList.contains('stats')) {
                // Animate counters
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
            
            if (entry.target.classList.contains('skills-bars')) {
                // Animate progress bars
                setTimeout(() => {
                    animateProgressBars();
                }, 300);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.section-title, .stat-item, .skills-text, .skills-bars, .experience-card, .contact-info, .contact-form, .stats');
    elementsToObserve.forEach(el => observer.observe(el));
});

// Form Submission
function handleSubmit(event) {
    event.preventDefault();
    
    // Create loading effect
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        event.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Download CV Function
function downloadCV() {
   
    // Create a sample CV content
    try{

    
    const cvContent = `
CURRICULUM VITAE

Name: MERN Stack Developer
Email: developer@email.com
Phone: +92 300 1234567
Location: Attock City, Punjab, Pakistan

PROFESSIONAL SUMMARY
Passionate MERN Stack Developer with nearly 1 year of experience in building modern web applications. 
Proficient in JavaScript, React.js, Node.js, Express.js, and MongoDB. Strong foundation in both 
frontend and backend development with expertise in various UI frameworks and databases.

TECHNICAL SKILLS
• Frontend: HTML5, CSS3, JavaScript, React.js
• Backend: Node.js, Express.js, Python, Java
• Databases: MongoDB, MySQL
• UI Frameworks: Tailwind CSS, Bootstrap, Chakra UI, ShadCN
• Tools & Technologies: Git, RESTful APIs, JWT Authentication

EXPERIENCE
MERN Stack Developer (2024 - Present)
• Developed responsive web applications using React.js and Node.js
• Built RESTful APIs with Express.js and MongoDB integration
• Implemented modern UI designs using various CSS frameworks
• Collaborated on 25+ projects with focus on user experience

PROJECTS
• E-commerce Platform - Full-stack application with payment integration
• Task Management System - React-based productivity application
• Blog Platform - Content management system with admin panel
• Weather App - Real-time weather application with API integration

EDUCATION
Bachelor's Degree in Computer Science
Relevant coursework in Web Development, Database Management, Software Engineering

ACHIEVEMENTS
• 500+ GitHub commits demonstrating consistent coding practice
• Successfully completed 25+ web development projects
• Proficient in 10+ programming languages and frameworks
• Strong problem-solving and analytical skills

LANGUAGES
• English (Fluent)
• Urdu (Native)

INTERESTS
Web Development, Open Source Contribution, Learning New Technologies, UI/UX Design
    `;

    // Create and download the CV file
    const blob = new Blob([cvContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MERN_Stack_Developer_CV.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
catch (error) {
    console.error('Error downloading CV:', error);
    alert('Failed to download CV. Please try again or contact me directly.');
}
}
// Add floating animation to hero elements
function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
        element.style.animationDuration = `${8 + Math.random() * 4}s`;
    });
}

// Initialize animations on page load
window.addEventListener('load', () => {
    addFloatingAnimation();
    
    // Add stagger effect to stat items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add stagger effect to experience cards
    const expCards = document.querySelectorAll('.experience-card');
    expCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.2}s`;
    });
});

// Mobile menu toggle (for future enhancement)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Typing effect for hero text (enhanced version)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add scroll-triggered animations for better performance
const scrollElements = document.querySelectorAll('.skill-item, .contact-item');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('scrolled');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);