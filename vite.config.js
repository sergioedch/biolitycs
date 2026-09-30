import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  plugins: [injectHTML()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        noticias: resolve(__dirname, 'noticias.html'),
        detalle: resolve(__dirname, 'noticia-detalle.html')
      }
    }
  }
});