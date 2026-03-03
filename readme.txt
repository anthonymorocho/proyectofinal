DESCRIPCIÓN DEL SITIO:
1. Inicio (index.html)
   - Presentación principal
   - Características destacadas
   - 🆕 Búsqueda de libros con API (Open Library)
   - Cursos populares
   - Servicios disponibles
   - Testimonios de estudiantes

2. Nosotros (nosotros.html)
   - Misión y visión
   - Nuestros valores
   - Equipo de profesionales
   - Historia de la empresa

3. Contacto (contacto.html)
   - Información de contacto
   - Formulario de contacto
   - Redes sociales
   - Ubicación

ESTRUCTURA TÉCNICA:
- HTML5
- CSS3
- JavaScript para interactividad
- Diseño adaptable a todos los dispositivos
- Consumo de API con async/await
- Renderizado dinámico de contenido

NUEVA FUNCIONALIDAD: BÚSQUEDA DE LIBROS (HITO 3)
================================================

Ubicación: Sección "Biblioteca de Recursos" en index.html

Características implementadas:
Búsqueda dinámica de libros mediante la API de Open Library
Lógica asíncrona con async/await
Solicitud funcional con fetch()
Procesamiento de datos con await response.json()
Manejo de errores con try...catch
Validación de búsqueda vacía
Validación de resultados no encontrados
Renderizado dinámico con .map()
Inyección al DOM con .innerHTML
Limpieza antes de cada búsqueda
Diseño responsivo y coherente
Muestra: Título, Imagen (Portada), Descripción

Archivos relacionados:
- js/busqueda.js: Lógica de búsqueda (async/await, fetch, JSON, try...catch)
- css/style.css: Estilos de la sección de búsqueda
- index.html: Interfaz de búsqueda

Cómo usar:
1. Ingresa un título de libro en el campo de búsqueda
2. Haz clic en "Buscar" o presiona Enter
3. Espera a que carguen los resultados
4. Visualiza las tarjetas de libros con portada, título, autor y descripción



