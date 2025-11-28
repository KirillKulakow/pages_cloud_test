import './assets/css/styles.css';

// Mobile navigation toggle
function initMobileNav() {
  const mobileToggle = document.querySelector('.header__mobile-toggle');
  const mobileOverlay = document.querySelector('.mobile-nav-overlay');
  
  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', () => {
      mobileOverlay.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', 
        mobileOverlay.classList.contains('active').toString()
      );
    });

    // Close mobile nav when clicking a link
    mobileOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileOverlay.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

// Form validation and submission
function initRegistrationForm() {
  const form = document.getElementById('registration-form');
  const successMessage = document.getElementById('success-message');
  
  if (!form) return;

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate individual field
  function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    if (input.required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (input.type === 'email' && value && !emailRegex.test(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    } else if (input.minLength && value.length < input.minLength) {
      isValid = false;
      errorMessage = `Minimum ${input.minLength} characters required`;
    }

    // Update UI
    const errorElement = input.parentElement.querySelector('.error-message');
    if (!isValid) {
      input.classList.add('error');
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
      }
    } else {
      input.classList.remove('error');
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    }

    return isValid;
  }

  // Validate all fields
  function validateForm() {
    const inputs = form.querySelectorAll('input[required]');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!validateField(input)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  // Add blur validation for real-time feedback
  form.querySelectorAll('input').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        validateField(input);
      }
    });
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitBtn = form.querySelector('.registration-form__submit');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      form.style.display = 'none';
      if (successMessage) {
        successMessage.classList.add('show');
      }

      // Store in localStorage (for demo purposes)
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      console.log('Form submitted:', data);
      
    } catch (error) {
      console.error('Submission error:', error);
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      alert('An error occurred. Please try again.');
    }
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}

// Intersection Observer for animations
function initScrollAnimations() {
  // Skip animations on mobile devices to prevent layout issues
  if (window.innerWidth <= 768) {
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation to benefits
  document.querySelectorAll('.benefit').forEach((benefit, index) => {
    benefit.style.opacity = '0';
    benefit.style.transform = 'translateY(20px)';
    benefit.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(benefit);
  });
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initRegistrationForm();
  initSmoothScroll();
  initHeaderScroll();
  initScrollAnimations();
});

// Export functions for testing
export {
  initMobileNav,
  initRegistrationForm,
  initSmoothScroll,
  initHeaderScroll,
  initScrollAnimations
};
