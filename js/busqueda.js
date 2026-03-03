// ===== SELECCIÓN DE ELEMENTOS =====
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');
const loadingMessage = document.getElementById('loadingMessage');
const errorMessage = document.getElementById('errorMessage');

// ===== ESCUCHADORES DE EVENTOS =====
searchBtn.addEventListener('click', realizarBusqueda);

// Permitir búsqueda al presionar Enter
searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        realizarBusqueda();
    }
});

// ===== FUNCIÓN PRINCIPAL DE BÚSQUEDA (ASYNC) =====
async function realizarBusqueda() {
    const titulo = searchInput.value.trim();

    // Validación del campo de búsqueda
    if (!titulo) {
        mostrarError('Por favor, ingresa un título de libro para buscar.');
        return;
    }

    // Limpiar resultados y errores previos
    resultsContainer.innerHTML = '';
    errorMessage.style.display = 'none';
    loadingMessage.style.display = 'block';

    try {
        // Construir URL dinámicamente con el término de búsqueda
        const urlAPI = `https://openlibrary.org/search.json?q=${encodeURIComponent(titulo)}`;
        
        // FETCH: Realizar solicitud a la API
        const respuesta = await fetch(urlAPI);

        // Validar que la respuesta sea exitosa
        if (!respuesta.ok) {
            throw new Error(`Error del servidor: ${respuesta.status}`);
        }

        // PROCESAMIENTO DE DATOS: Convertir respuesta a JSON
        const datos = await respuesta.json();

        // Validar si se encontraron resultados
        if (!datos.docs || datos.docs.length === 0) {
            mostrarError('No se encontraron libros con ese título. Intenta con otra búsqueda.');
            loadingMessage.style.display = 'none';
            return;
        }

        // Renderizar los resultados
        loadingMessage.style.display = 'none';
        renderizarResultados(datos.docs);

    } catch (error) {
        // MANEJO DE ERRORES: Capturar y mostrar errores
        console.error('Error en la búsqueda:', error);
        
        let mensajeError = 'Ocurrió un error al buscar. Intenta de nuevo más tarde.';
        
        if (error instanceof TypeError) {
            mensajeError = 'Error de conexión. Verifica tu conexión a internet.';
        }
        
        mostrarError(mensajeError);
        loadingMessage.style.display = 'none';
    }
}

// ===== FUNCIÓN DE RENDERIZADO DINÁMICO =====
function renderizarResultados(libros) {
    // Limitar a 12 resultados para mejor presentación
    const librosLimitados = libros.slice(0, 12);

    // Usar .map() para transformar datos en HTML
    const htmlResultados = librosLimitados
        .map(libro => crearTarjetaLibro(libro))
        .join('');

    // INYECCIÓN AL DOM: Insertar HTML generado
    resultsContainer.innerHTML = htmlResultados;
}

// ===== FUNCIÓN AUXILIAR: CREAR TARJETA DE LIBRO =====
function crearTarjetaLibro(libro) {
    // Extraer datos del libro
    const titulo = libro.title || 'Título no disponible';
    const autor = (libro.author_name && libro.author_name[0]) || 'Autor desconocido';
    const anio = libro.first_publish_year || 'Año desconocido';
    
    // Usar ISBN para obtener la portada
    const portada = (libro.isbn && libro.isbn[0])
        ? `https://covers.openlibrary.org/b/isbn/${libro.isbn[0]}-M.jpg`
        : (libro.cover_i
            ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
            : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="300"%3E%3Crect fill="%23e0e0e0" width="200" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="14" fill="%23999" text-anchor="middle" dy=".3em"%3E📚 Sin Portada%3C/text%3E%3C/svg%3E');
    
    let descripcion = '';
    if (libro.description) {
        descripcion = typeof libro.description === 'string' 
            ? libro.description 
            : libro.description.value;
    } else if (libro.first_sentence && libro.first_sentence[0]) {
        descripcion = libro.first_sentence[0];
    } else if (libro.publisher && libro.publisher.length > 0) {
        const pub = Array.isArray(libro.publisher) ? libro.publisher[0] : libro.publisher;
        descripcion = `Editorial: ${pub}`;
    } else {
        // Fallback: Mostrar información básica
        descripcion = `${autor} • ${anio}`;
    }

    // Limitar descripción a 100 caracteres
    const descCorta = descripcion.length > 100 
        ? descripcion.substring(0, 100) + '...' 
        : descripcion;

    // Retornar HTML de la tarjeta
    return `
        <article class="book-card">
            <div class="book-image">
                <img 
                    src="${portada}" 
                    alt="Portada: ${titulo}" 
                    loading="lazy"
                    class="book-img"
                >
            </div>
            <div class="book-info">
                <h3 class="book-title">${sanitizarHTML(titulo)}</h3>
                <p class="book-author">por <strong>${sanitizarHTML(autor)}</strong></p>
                <p class="book-year">📅 ${anio}</p>
                <p class="book-description">${sanitizarHTML(descCorta)}</p>
            </div>
        </article>
    `;
}

// ===== FUNCIÓN AUXILIAR: SANITIZAR HTML =====
function sanitizarHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
}

// ===== FUNCIÓN AUXILIAR: MOSTRAR ERRORES =====
function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    errorMessage.style.display = 'block';
    resultsContainer.innerHTML = '';
}

// ===== MANEJO DE ERRORES DE IMÁGENES =====
document.addEventListener('error', function(e) {
    if (e.target.classList.contains('book-img')) {
        const container = e.target.parentElement;
        container.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f0f0f0;font-size:50px;color:#bbb;">📚</div>';
    }
}, true);
