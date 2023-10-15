document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contacto-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Simulación de envío de formulario
        alert('¡Gracias por tu mensaje! Te responderemos pronto.');
        form.reset();
    });
});