document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("contenedor-noticias");

    try {
        const response = await fetch("https://demo.qualitechai.com/api/noticias-biolitycs"); 
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            contenedor.innerHTML = ""; 

            result.data.forEach((noticia, index) => {
                // Retraso escalonado para la animación AOS
                const delay = (index % 3) * 100; 
                
                // Formateo de fecha (Ej. "15 sept 2026")
                const fechaObj = new Date(noticia.fecha_publicacion);
                const fechaFormateada = fechaObj.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });

                const cardHTML = `
                    <div class="col-md-4 mb-4" data-aos="fade-up" data-aos-delay="${delay}">
                        <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden noticia-card">
                            <!-- Contenedor de Imagen con position relative para el badge -->
                            <div class="position-relative">
                                ${noticia.imagen_portada 
                                    ? `<img src="${noticia.imagen_portada}" class="w-100 object-fit-cover" alt="${noticia.titulo}" style="height: 240px;">` 
                                    : `<div class="bg-light text-muted d-flex align-items-center justify-content-center" style="height: 240px;">Sin imagen</div>`
                                }
                                <!-- Etiqueta de Fecha Flotante -->
                                <div class="position-absolute top-0 start-0 bg-primary text-white px-3 py-2 m-3 rounded-3 shadow-sm fw-bold fs-7">
                                    ${fechaFormateada}
                                </div>
                            </div>
                            
                            <!-- Cuerpo de la tarjeta -->
                            <div class="card-body d-flex flex-column p-4">
                                <h5 class="card-title fw-bold text-corporate-blue mb-3 clamp-title">
                                    ${noticia.titulo}
                                </h5>
                                <p class="card-text text-secondary mb-4 clamp-text">
                                    ${noticia.resumen || 'Descubre más detalles sobre este artículo y mantente informado con Biolitycs Lab.'}
                                </p>
                                
                                <!-- Botón alineado al fondo -->
                                <div class="mt-auto">
                                    <a href="noticia-detalle.php?slug=${noticia.slug}" class="text-decoration-none fw-bold text-corporate-blue d-inline-flex align-items-center btn-leer-mas">
                                        Leer artículo
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ms-2 icono-flecha">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                contenedor.innerHTML += cardHTML;
            });
        } else {
            contenedor.innerHTML = `<div class="col-12 text-center py-5"><p class="text-muted">No hay noticias publicadas por el momento.</p></div>`;
        }
    } catch (error) {
        console.error("Error al cargar las noticias:", error);
        contenedor.innerHTML = `<div class="col-12 text-center py-5"><p class="text-danger">Ocurrió un error al cargar las noticias. Inténtalo más tarde.</p></div>`;
    }
});