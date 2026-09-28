import './scss/style.scss'
import * as bootstrap from 'bootstrap'
import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', () => {

  const currentPath = window.location.pathname;
  const isHome = currentPath === '/' || currentPath.includes('index.html');

  // MAGIA 1: Si vienes desde noticias.html dando clic a "Contacto", el navegador saltará a /#contacto. 
  // Esto limpia el "#contacto" de la URL un instante después de cargar para dejarla limpia.
  if (isHome && window.location.hash) {
    setTimeout(() => {
      history.replaceState(null, null, '/');
    }, 100);
  }

  // 1. Lógica de Scroll y Navegación Inteligente
  const navLinksAll = document.querySelectorAll('.nav-link, .btn-primary');

  navLinksAll.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (!href || !href.includes('#')) return;

      const hashIndex = href.indexOf('#');
      const path = href.substring(0, hashIndex);
      const hash = href.substring(hashIndex);

      const isTargetHome = path === '/' || path === '';

      if (isHome && isTargetHome) {
        e.preventDefault(); 
        
        const targetElement = document.querySelector(hash);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // MAGIA 2: Forzamos a la URL a quedarse solo como "/" sin el hash
          history.replaceState(null, null, '/');

          const navbarCollapse = document.querySelector('.navbar-collapse.show');
          if (navbarCollapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      }
    });
  });

  // 2. Marcar "activo" manualmente si estamos en noticias.html
  if (currentPath.includes('noticias.html')) {
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    const noticiasLink = document.querySelector('.nav-link[href="/noticias.html"]');
    if (noticiasLink) noticiasLink.classList.add('active');
  }

  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
  });

  // 3. Observer para iluminar el menú mientras haces scroll
  setTimeout(() => {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          if (!currentPath.includes('noticias.html')) {
             navLinks.forEach(link => link.classList.remove('active'));
             
             const activeLink = document.querySelector(`.nav-link[href="/#${id}"]`);
             if (activeLink) {
               activeLink.classList.add('active');
             }
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