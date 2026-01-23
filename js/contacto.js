function enviarFormulario(event) {
    event.preventDefault();
    document.getElementById('modal').style.display = 'block';
    document.getElementById('contactForm').reset();
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}
