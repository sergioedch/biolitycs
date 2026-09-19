import './scss/style.scss'
import * as bootstrap from 'bootstrap'

// 1. Importar AOS y sus estilos
import AOS from 'aos';
import 'aos/dist/aos.css';

// 2. Inicializar AOS
AOS.init({
  duration: 800,
  once: true, 
  offset: 100, 
});