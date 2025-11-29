// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// Smooth Scroll
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// Hero Buttons
const btnProjects = document.getElementById('btn-projects');
const btnContact = document.getElementById('btn-contact');

if (btnProjects) {
  btnProjects.addEventListener('click', () => scrollToSection('projects'));
}

if (btnContact) {
  btnContact.addEventListener('click', () => scrollToSection('contact'));
}

// Animate skill levels on scroll
const skillItems = document.querySelectorAll('.skill-item');
let skillsAnimated = false;

function animateSkills() {
  if (skillsAnimated) return;

  skillItems.forEach((item, index) => {
    const level = item.getAttribute('data-level');
    const progressBar = item.querySelector('.progress-fill');
    const percentageLabel = item.querySelector('.skill-percentage');

    if (progressBar) {
      // Reset width to 0 for animation
      progressBar.style.width = '0%';

      // Animate to target width with staggered delay
      setTimeout(() => {
        progressBar.style.width = level + '%';

        // Animate percentage counter
        if (percentageLabel) {
          animateCounter(percentageLabel, 0, parseInt(level), 1500);
        }
      }, index * 100 + 200);
    }
  });

  skillsAnimated = true;
}

function animateCounter(element, start, end, duration) {
  const startTime = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(start + (end - start) * progress);
    element.textContent = current + '%';

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkills();
    }
  });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}

// Project cards animation on scroll
const projectCards = document.querySelectorAll('.project-card');
const projectsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'perspective(1000px) rotateY(0deg) translateY(0)';
      }, index * 100);
    }
  });
}, { threshold: 0.1 });

projectCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'perspective(1000px) rotateY(10deg) translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  projectsObserver.observe(card);
});

// Typing Animation for Hero Title
const typingText = document.getElementById('typing-text');
const titles = ['ML Engineer', 'Data Scientist', 'AI Researcher', 'Python Developer', 'Deep Learning Expert'];
let currentTitleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
  const currentTitle = titles[currentTitleIndex];

  if (isDeleting) {
    typingText.textContent = currentTitle.substring(0, currentCharIndex - 1);
    currentCharIndex--;
    typeSpeed = 50;
  } else {
    typingText.textContent = currentTitle.substring(0, currentCharIndex + 1);
    currentCharIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && currentCharIndex === currentTitle.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && currentCharIndex === 0) {
    isDeleting = false;
    currentTitleIndex = (currentTitleIndex + 1) % titles.length;
    typeSpeed = 500; // Pause before starting new title
  }

  setTimeout(typeWriter, typeSpeed);
}

// Start typing animation after page load
window.addEventListener('load', () => {
  setTimeout(typeWriter, 2000); // Start after 2 seconds
  createParticles(); // Start particle effect
  createGlobalParticles(); // Start global particles
});

// Particle Effect
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position and animation delay
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 5) + 's';

    particlesContainer.appendChild(particle);
  }
}

// Global floating particles for entire website
function createGlobalParticles() {
  const body = document.body;
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'global-particle';
    particle.style.cssText = `
      position: fixed;
      width: 2px;
      height: 2px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: globalFloat ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * 10}s;
    `;

    body.appendChild(particle);
  }
}

// Add global particle animation CSS
const globalParticleCSS = `
  @keyframes globalFloat {
    0% {
      transform: translateY(100vh) translateX(0) rotate(0deg);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px) rotate(360deg);
      opacity: 0;
    }
  }
`;

// Inject the CSS
const style = document.createElement('style');
style.textContent = globalParticleCSS;
document.head.appendChild(style);

// Dark/Light Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Animated Counters
const counters = document.querySelectorAll('.stat-number');
let countersAnimated = false;

function animateCounters() {
  if (countersAnimated) return;

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current) + '+';
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + '+';
        counter.classList.add('animate');
      }
    };

    updateCounter();
  });

  countersAnimated = true;
}

// Intersection Observer for counters
const countersObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
    }
  });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('#about');
if (aboutSection) {
  countersObserver.observe(aboutSection);
}

// Parallax Effect
function updateParallax() {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('[data-speed]');

  parallaxElements.forEach(element => {
    const speed = element.getAttribute('data-speed');
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

window.addEventListener('scroll', updateParallax);

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear previous errors
  clearErrors();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const subject = formData.get('subject').trim();
  const message = formData.get('message').trim();

  // Validation
  let isValid = true;

  if (name.length < 2) {
    showError('name', 'Name must be at least 2 characters long');
    isValid = false;
  }

  if (!isValidEmail(email)) {
    showError('email', 'Please enter a valid email address');
    isValid = false;
  }

  if (subject.length < 5) {
    showError('subject', 'Subject must be at least 5 characters long');
    isValid = false;
  }

  if (message.length < 10) {
    showError('message', 'Message must be at least 10 characters long');
    isValid = false;
  }

  if (isValid) {
    // Show sending status
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;

    // Create mailto link with form data
    const mailtoLink = `mailto:bagal9464@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message after a short delay
    setTimeout(() => {
      showFormStatus('success', '✓ Message sent successfully! Your email client has been opened. I\'ll get back to you soon.');
      contactForm.reset();
      submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
      submitBtn.disabled = false;
    }, 500);
  }
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(fieldName, message) {
  const field = document.getElementById(fieldName);
  const errorElement = document.getElementById(`${fieldName}-error`);

  field.classList.add('error');
  field.classList.remove('success');
  errorElement.textContent = message;
  errorElement.classList.add('show');
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  const inputs = document.querySelectorAll('input, textarea');

  errorMessages.forEach(error => {
    error.classList.remove('show');
    error.textContent = '';
  });

  inputs.forEach(input => {
    input.classList.remove('error', 'success');
  });

  formStatus.classList.remove('show', 'success', 'error');
}

function showFormStatus(type, message) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type} show`;

  setTimeout(() => {
    formStatus.classList.remove('show');
  }, 5000);
}

// Real-time validation
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('blur', () => {
    validateField(input);
  });

  input.addEventListener('input', () => {
    if (input.classList.contains('error')) {
      validateField(input);
    }
  });
});

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}-error`);

  let isValid = true;
  let errorMessage = '';

  switch (fieldName) {
    case 'name':
      if (value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters long';
      }
      break;
    case 'email':
      if (!isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
      break;
    case 'subject':
      if (value.length < 5) {
        isValid = false;
        errorMessage = 'Subject must be at least 5 characters long';
      }
      break;
    case 'message':
      if (value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
      }
      break;
  }

  if (isValid) {
    field.classList.remove('error');
    field.classList.add('success');
    errorElement.classList.remove('show');
  } else {
    field.classList.remove('success');
    field.classList.add('error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('show');
  }
}

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // Disable submit button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

    // Show loading status
    formStatus.textContent = 'Sending your message...';
    formStatus.className = 'form-status show info';

    try {
      // Method 1: Using EmailJS (Free service - requires setup)
      // Uncomment and configure after setting up EmailJS account
      /*
      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      }).then(() => {
        showSuccess();
      }).catch(() => {
        showError();
      });
      */

      // Method 2: Mailto fallback (opens email client)
      const mailtoLink = `mailto:bagal9464@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      // Show success message
      setTimeout(() => {
        showSuccess();
      }, 500);

    } catch (error) {
      showError();
    }
  });
}

function showSuccess() {
  formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
  formStatus.className = 'form-status show success';
  contactForm.reset();

  // Reset button
  submitBtn.disabled = false;
  submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';

  // Hide status after 5 seconds
  setTimeout(() => {
    formStatus.classList.remove('show');
  }, 5000);
}

function showError() {
  formStatus.textContent = '✗ Failed to send message. Please try again or email me directly at bagal9464@gmail.com';
  formStatus.className = 'form-status show error';

  // Reset button
  submitBtn.disabled = false;
  submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';

  // Hide status after 7 seconds
  setTimeout(() => {
    formStatus.classList.remove('show');
  }, 7000);
}
