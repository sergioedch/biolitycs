import * as bootstrap from 'bootstrap'; // Asegúrate de tener esto importado arriba

document.addEventListener('DOMContentLoaded', () => {
    
    // Función genérica para manejar envíos
    const manejarEnvio = (idFormulario) => {
        const form = document.getElementById(idFormulario);
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btnSubmit = form.querySelector('button[type="submit"]');
            const textoOriginal = btnSubmit.innerHTML;
            
            btnSubmit.innerHTML = 'Enviando... <span class="spinner-border spinner-border-sm"></span>';
            btnSubmit.disabled = true;

            try {
                // Petición al backend
                const response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: new FormData(form)
                });
                
                const data = await response.json();
                
                if (data.status === 'success') {
                    // Instanciar y mostrar Modal de Éxito
                    const modalExito = new bootstrap.Modal(document.getElementById('modalExito'));
                    modalExito.show();
                    form.reset();
                } else {
                    // Cambiar el texto del error y mostrar Modal de Error
                    document.getElementById('textoError').innerText = data.message;
                    const modalError = new bootstrap.Modal(document.getElementById('modalError'));
                    modalError.show();
                }
            } catch (error) {
                console.error(error);
                // Mostrar Modal de Error genérico de conexión
                document.getElementById('textoError').innerText = 'Hubo un problema al conectar con el servidor. Por favor, revisa tu conexión e intenta de nuevo.';
                const modalError = new bootstrap.Modal(document.getElementById('modalError'));
                modalError.show();
            } finally {
                // Restaurar botón
                btnSubmit.innerHTML = textoOriginal;
                btnSubmit.disabled = false;
            }
        });
    };

    // Activamos la función para ambos formularios
    manejarEnvio('form-contacto');
    manejarEnvio('form-quejas');
});