import './scss/style.scss'
import * as bootstrap from 'bootstrap'
import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', () => {

  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  smoothLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        const navbarCollapse = document.querySelector('.navbar-collapse.show');
        if (navbarCollapse) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });
  setTimeout(() => {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => link.classList.remove('active'));

          const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px'
    });
    sections.forEach(section => {
      observer.observe(section);
    });

  }, 800);

});