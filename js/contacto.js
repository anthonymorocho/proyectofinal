// ===== SELECCIÓN DE ELEMENTOS =====
const contactForm = document.querySelector('#contactForm');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const subjectInput = document.querySelector('#subject');
const messageInput = document.querySelector('#message');
const modal = document.querySelector('#modal');
let searchingMessage = null;

// ===== ESCUCHADORES DE EVENTOS =====
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    enviarFormulario(event);
});

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        cerrarModal();
    }
});

// ===== FUNCIONES =====
function enviarFormulario(event) {
    event.preventDefault();
    const nombreUsuario = document.querySelector('#name').value;
    mostrarMensajeEsperando(nombreUsuario);

    setTimeout(function() {
        mostrarModalExito();
        limpiarFormulario();
    }, 2000);
}

function mostrarMensajeEsperando(nombreUsuario) {
    contactForm.classList.add('hidden');

    searchingMessage = document.createElement('div');
    searchingMessage.className = 'searching-message';
    searchingMessage.textContent = `Enviando información de ${nombreUsuario}...`;
    contactForm.parentElement.appendChild(searchingMessage);
}

function mostrarModalExito() {
    modal.style.display = 'block';
}

function cerrarModal() {
    modal.style.display = 'none';

    if (searchingMessage) {
        searchingMessage.remove();
        searchingMessage = null;
    }

    contactForm.classList.remove('hidden');
}

function limpiarFormulario() {
    contactForm.reset();
    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';
    subjectInput.value = '';
    messageInput.value = '';
}
