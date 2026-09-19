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
                const response = await fetch('sendmail.php', {
                    method: 'POST',
                    body: new FormData(form)
                });
                
                const data = await response.json();
                
                if (data.status === 'success') {
                    alert('¡Listo! Tu solicitud se ha enviado exitosamente.');
                    form.reset();
                } else {
                    alert('Error: ' + data.message);
                }
            } catch (error) {
                console.error(error);
                alert('Hubo un problema al conectar con el servidor.');
            } finally {
                btnSubmit.innerHTML = textoOriginal;
                btnSubmit.disabled = false;
            }
        });
    };

    // Activamos la función para ambos formularios
    manejarEnvio('form-contacto');
    manejarEnvio('form-quejas');
});