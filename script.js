
// DOM Elements
const loader = document.querySelector('.loader');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');
const backgroundCanvas = document.getElementById('background-canvas');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-item');

// Wait for page to load
window.addEventListener('load', () => {
  // Hide loader after 2 seconds
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2000);
  
  // Initialize animations
  initAnimations();
  
  // Initialize background canvas
  initBackground();
});

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  navToggle.classList.toggle('active');
});

// Close mobile nav when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// Scroll Events
window.addEventListener('scroll', () => {
  // Navbar background change on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Reveal elements on scroll
  checkScroll();
});

// Contact Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (!name || !email || !subject || !message) {
      alert('Merci de remplir tous les champs du formulaire.');
      return;
    }
    
    // In a real scenario, you would send this data to a server
    // For now, we'll just show an alert
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
    contactForm.reset();
  });
}

// Initialize animations on page load
function initAnimations() {
  // Immediately activate hero section animations
  document.querySelectorAll('#hero .reveal, #hero .reveal-left, #hero .reveal-right').forEach(el => {
    setTimeout(() => {
      el.classList.add('active');
    }, 300);
  });
  
  // Check for elements in viewport on initial load
  checkScroll();
}

// Check which elements are in viewport and animate them
function checkScroll() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.85) {
      section.classList.add('active');
    }
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Account for fixed navbar
        behavior: 'smooth'
      });
    }
  });
});

// Background Canvas Animation
function initBackground() {
  if (!backgroundCanvas) return;
  
  const ctx = backgroundCanvas.getContext('2d');
  
  // Set canvas dimensions
  function setCanvasDimensions() {
    backgroundCanvas.width = window.innerWidth;
    backgroundCanvas.height = window.innerHeight;
  }
  
  setCanvasDimensions();
  window.addEventListener('resize', setCanvasDimensions);
  
  // Particle settings
  const particleCount = 100;
  const particles = [];
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * backgroundCanvas.width,
      y: Math.random() * backgroundCanvas.height,
      radius: Math.random() * 2 + 0.5,
      color: `rgba(131, 131, 131, ${Math.random() * 0.2 + 0.1})`,
      speedX: Math.random() * 0.3 - 0.15,
      speedY: Math.random() * 0.3 - 0.15
    });
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    
    // Update and draw particles
    particles.forEach(particle => {
      // Move
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = backgroundCanvas.width;
      if (particle.x > backgroundCanvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = backgroundCanvas.height;
      if (particle.y > backgroundCanvas.height) particle.y = 0;
      
      // Draw
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
    
    // Connect particles with lines if they're close enough
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(131, 131, 131, ${0.2 * (1 - distance / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}
