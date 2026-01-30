function enviarFormulario(event) {
    event.preventDefault();

    const modal = document.getElementById('modal');
    modal.style.display = 'block';
    document.getElementById('contactForm').reset();
}

function cerrarModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
