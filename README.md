# Manipulación del DOM - Práctica

**¿Qué es el DOM y por qué se manipula con JavaScript?**
El DOM (Document Object Model) es una representación en forma de árbol y estructurada del documento HTML, donde cada elemento, atributo y texto es un nodo. Se manipula con JavaScript para crear experiencias web dinámicas e interactivas; esto permite modificar el contenido, la estructura y los estilos de la página en tiempo real sin necesidad de recargarla, respondiendo así a eventos o acciones del usuario.

### Evidencias de la Parte A (Controles Base)
*Video demostrativo de uso:*
![Video Parte A](assets/parte_a_evidencia.webp)

### Investigación Guiada - Parte A
1. **Diferencia entre `textContent` e `innerHTML`:**
   - **`textContent`**: obtiene o establece solo texto plano del elemento y todos sus descendientes. Es seguro porque no interpreta etiquetas HTML, previniendo ataques XSS.
   - **`innerHTML`**: obtiene o establece todo el contenido HTML en formato de cadena. Si le pasamos etiquetas, el navegador las renderizará, lo que lo hace vulnerable a inyecciones de código malicioso si se usan datos no validados en formularios.

2. **¿Qué hace `classList.toggle()`?**
   Agrega una clase al elemento (en el árbol de CSS) si esta no existe, o la elimina si ya está presente. Es un interruptor (on/off) muy útil para cambiar estados visuales (ej. destacar/no destacar tarjetas web) de forma limpia en 1 línea sin usar estructuras `if/else`.

3. **¿Qué es `dataset` y para qué sirve?**
   Es una propiedad nativa que permite leer y escribir atributos de datos personalizados (aquellos que empiezan con `data-` en HTML, por ejemplo `data-id="5"`). Sirve para almacenar información oculta extra directamente en los elementos HTML y acceder a ellos fluidamente desde JS.

### Evidencias de la Parte B (Formularios y Elementos)
*Video demostrativo de uso:*
![Video Parte B](assets/parte_b_evidencia.webp)

### Investigación Guiada - Parte B
1. **Diferencias entre `append()`, `prepend()`, `appendChild()`:**
   - `append`: Agrega múltiples nodos o cadenas de texto como los **últimos** hijos del elemento padre.
   - `prepend`: Agrega nodos o texto al **principio**.
   - `appendChild`: Es el método histórico y estricto. Solo permite agregar un **único** objeto de tipo Nodo al final y no acepta texto plano directamente.

2. **¿Qué es “delegación de eventos” y por qué mejora el rendimiento?**
   Consiste en asignar un solo oyente u `EventListener` al contenedor “padre” (ej. un `<ul>`) en lugar de asignar validaciones múltiples en cada uno de sus hijos (ej. a cada `<li>`). Funciona gracias al burbujeo ("bubbling") de eventos. Mejora brutalmente el rendimiento porque no satura la memoria principal y permite gestionar eventos dinámicamente en elementos **que aún no existen** en la página.

### Mini-Reto: Persistencia Completa Local
Para el "mini reto", elegí aplicar la **Persistencia con `localStorage`**.
El código JavaScript (`app.js`) fue adaptado para que cada vez que el usuario agregue, destaque o elimine una noticia de la tabla, la memoria guarde dinámicamente los arrays en forma de String utilizando `localStorage.setItem()`. Posteriormente, se ejecuta `localStorage.getItem()` al iniciar la web y vuelve a empujar visualmente todas las noticias sin perder ningún dato en absoluto aunque el usuario apague su equipo.

---
**Enlaces consultados:**
- [DOM Standard (WHATWG)](https://dom.spec.whatwg.org/)
- [MDN Element: classList property](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)
- [MDN HTMLElement: dataset property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
- [MDN DOM Event Architecture](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
