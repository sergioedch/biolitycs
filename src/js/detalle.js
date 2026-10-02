document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("detalle-noticia");
    if (!contenedor) return;

    // 1. Verificar si PHP ya nos dejó la noticia lista en memoria
    let noticia = window.INITIAL_NOTICIA_DATA;

    // 2. Si no viene de PHP, intentar hacer fetch por cliente (Fallback)
    if (!noticia) {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        if (!slug) {
            mostrarError("No se especificó ningún artículo.");
            return;
        }

        try {
            const response = await fetch(`https://demo.qualitechai.com/api/noticias-biolitycs/${slug}`);
            const result = await response.json();

            if (result.success && result.data) {
                noticia = result.data;
            } else {
                mostrarError("Artículo no encontrado.");
                return;
            }
        } catch (error) {
            console.error("Error al cargar la noticia:", error);
            mostrarError("Ocurrió un error al cargar el artículo.");
            return;
        }
    }

    // 3. Renderizar el contenido con la noticia (ya sea obtenida de PHP o de JS)
    renderizarNoticia(noticia, contenedor);
});

function renderizarNoticia(noticia, contenedor) {
    const fechaObj = new Date(noticia.fecha_publicacion);
    const fechaFormateada = fechaObj.toLocaleDateString('es-MX', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });

    contenedor.innerHTML = `
        <article class="row justify-content-center fade-in">
            <div class="col-lg-9 col-xl-8">
                <div class="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
                    
                    <header class="mb-4 text-center">
                        <h1 class="fw-bolder mb-4 text-corporate-blue display-5 lh-sm">${noticia.titulo}</h1>
                        
                        <div class="d-flex flex-wrap justify-content-center align-items-center gap-3 text-muted fs-6">
                            <div class="d-flex align-items-center gap-2">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                Por <span class="fw-semibold text-dark">${noticia.autor || 'Redacción'}</span>
                            </div>
                            <span class="text-secondary d-none d-sm-inline">•</span>
                            <div class="d-flex align-items-center gap-2">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                ${fechaFormateada}
                            </div>
                        </div>
                    </header>

                    <hr class="text-muted opacity-25 mb-5">

                    ${noticia.imagen_portada ? `
                    <figure class="mb-5 shadow-sm rounded-4 overflow-hidden position-relative imagen-destacada">
                        <img class="img-fluid w-100 object-fit-cover" src="${noticia.imagen_portada}" alt="${noticia.titulo}" style="max-height: 500px;" />
                    </figure>` : ''}

                    <section class="lh-lg contenido-editor text-dark">
                        ${noticia.contenido}
                    </section>
                    
                    <hr class="text-muted opacity-25 mt-5 mb-4">
                    
                    <div class="text-center">
                        <a href="/noticias.html" class="btn btn-primary rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2 btn-volver transition-all">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="19" y1="12" x2="5" y2="12"></line>
                                <polyline points="12 19 5 12 12 5"></polyline>
                            </svg>
                            Volver a Noticias
                        </a>
                    </div>

                </div>
            </div>
        </article>
    `;
}

function mostrarError(mensaje) {
    const contenedor = document.getElementById("detalle-noticia");
    contenedor.innerHTML = `
        <div class="text-center py-5 mt-5">
            <h2 class="text-danger fw-bold">Error</h2>
            <p class="text-muted">${mensaje}</p>
            <a href="/noticias.html" class="btn btn-primary mt-3">Volver a noticias</a>
        </div>`;
}