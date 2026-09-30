document.addEventListener("DOMContentLoaded", async () => {
    const contenedor = document.getElementById("detalle-noticia");

    // Extraemos el 'slug' de la URL (ej. ?slug=nueva-acreditacion-17025)
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');

    if (!slug) {
        contenedor.innerHTML = `
            <div class="text-center py-5 mt-5">
                <h2 class="text-danger fw-bold">Error</h2>
                <p class="text-muted">No se especificó ningún artículo.</p>
                <a href="/noticias.html" class="btn btn-primary mt-3">Volver a noticias</a>
            </div>`;
        return;
    }

    try {
        // Petición a tu API buscando el artículo específico por su slug
        // Nota: Asegúrate de que tu Laravel tenga esta ruta habilitada (ej. Route::get('/noticias-biolitycs/{slug}', ...))
        const response = await fetch(`https://demo.qualitechai.com/api/noticias-biolitycs/${slug}`);
        const result = await response.json();

        // Verificamos si la respuesta es exitosa y trae datos
        if (result.success && result.data) {
            const noticia = result.data;
            const fechaObj = new Date(noticia.fecha_publicacion);
            const fechaFormateada = fechaObj.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

            // Inyectamos el <article> completo que armamos antes
            contenedor.innerHTML = `
                <article class="row justify-content-center fade-in">
                    <div class="col-lg-8">
                        <header class="mb-4 text-center">
                            <h1 class="fw-bolder mb-3 text-corporate-blue display-5">${noticia.titulo}</h1>
                            <div class="text-muted fst-italic mb-2">Publicado el ${fechaFormateada}</div>
                        </header>

                        ${noticia.imagen_portada ? `
                        <figure class="mb-5 shadow-sm rounded-4 overflow-hidden">
                            <img class="img-fluid w-100 object-fit-cover" src="${noticia.imagen_portada}" alt="${noticia.titulo}" style="max-height: 450px;" />
                        </figure>` : ''}

                        <!-- Contenedor del texto (Si usas un editor tipo Quill.js en tu backend, aquí se pintará el HTML guardado) -->
                       <!-- Le quitamos el text-secondary y le ponemos una clase tuya por si quieres darle estilos después -->
                        <section class="mb-5 lh-lg fs-5 contenido-editor">
                            ${noticia.contenido}
                        </section>
                        
                        <div class="mt-5 pt-4 border-top text-center">
                            <a href="/noticias.html" class="btn btn-outline-primary rounded-pill px-4 fw-bold">
                                ← Volver a Noticias
                            </a>
                        </div>
                    </div>
                </article>
            `;
        } else {
            contenedor.innerHTML = `<div class="text-center py-5 mt-5"><h2 class="text-muted">Artículo no encontrado.</h2></div>`;
        }
    } catch (error) {
        console.error("Error al cargar el artículo:", error);
        contenedor.innerHTML = `<div class="text-center py-5 mt-5"><h2 class="text-danger">Ocurrió un error al cargar el artículo.</h2></div>`;
    }
});