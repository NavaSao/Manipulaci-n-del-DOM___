document.addEventListener('DOMContentLoaded', () => {

    /* ==============================================================
       PARTE A: MODIFICANDO ELEMENTOS CON DOM
       ============================================================== */
    
    // 1. Selector de Elementos
    const tituloNoticia = document.querySelector('#titulo-noticia');
    const imagenNoticia = document.querySelector('#imagen-noticia');
    const textoNoticia = document.querySelector('#texto-noticia');
    const panelPrincipal = document.querySelector('#noticia-principal');
    const tagNoticia = document.querySelector('#tag-noticia');

    const btnCambioTexto = document.querySelector('#btn-cambiar-texto');
    const btnToggleClase = document.querySelector('#btn-toggle-clase');

    // Estado para alternar contenido
    let modificado = false;

    // 2. Modificación de contenido y atributos
    btnCambioTexto.addEventListener('click', () => {
        if (!modificado) {
            tituloNoticia.textContent = "¡Impactante! IA reescribe código en tiempo real";
            textoNoticia.textContent = "Las nuevas generaciones de IA ya pueden construir aplicaciones enteras usando el DOM y CSS moderno sin intervención manual.";
            tagNoticia.textContent = "Tecnología IA";
            // Modificar atributos: src y alt
            imagenNoticia.setAttribute('src', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800');
            imagenNoticia.setAttribute('alt', 'Inteligencia Artificial programando');
        } else {
            tituloNoticia.textContent = "El Futuro del Desarrollo Web está aquí";
            textoNoticia.textContent = "Explora las nuevas tendencias en diseño de interfaces utilizando Vanilla CSS y JavaScript moderno.";
            tagNoticia.textContent = "Actualidad";
            imagenNoticia.setAttribute('src', 'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800');
            imagenNoticia.setAttribute('alt', 'Noticia Original');
        }
        modificado = !modificado;
    });

    // 3. Agregar y Remover Clases
    btnToggleClase.addEventListener('click', () => {
        // toggle añade la clase si no existe, y la quita si ya la tiene
        panelPrincipal.classList.toggle('destacada');
    });

    /* ==============================================================
       PARTE B y C: CREACIÓN DE ELEMENTOS Y MINIRETO LOCALSTORAGE
       ============================================================== */

    const formulario = document.querySelector('#formulario-noticia');
    const inputTitulo = document.querySelector('#input-titulo');
    const inputCategoria = document.querySelector('#input-categoria');
    const listaNoticias = document.querySelector('#lista');
    const templateNoticia = document.querySelector('#template-noticia');

    // Array para almacenar el estado
    let noticiasGlobales = [];

    // Inicializar desde LocalStorage (Mini-reto Parte C: Opción 2)
    function cargarNoticiasLocalStorage() {
        const guardadas = localStorage.getItem('noticiasData');
        if (guardadas) {
            noticiasGlobales = JSON.parse(guardadas);
            noticiasGlobales.forEach(noticia => {
                renderizarNoticiaDOM(noticia);
            });
        }
    }

    // Guardar en LocalStorage
    function sincronizarLocalStorage() {
        localStorage.setItem('noticiasData', JSON.stringify(noticiasGlobales));
    }

    // 1. Creación de nuevos elementos 
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir recarga

        const tituloVal = inputTitulo.value.trim();
        const catVal = inputCategoria.value;

        if (!tituloVal || !catVal) return;

        // Crear objeto de noticia con ID único
        const nuevaNoticia = {
            id: Date.now().toString(),
            titulo: tituloVal,
            categoria: catVal,
            destacado: false
        };

        // Guardar en array y storage
        noticiasGlobales.unshift(nuevaNoticia);
        sincronizarLocalStorage();

        // Renderizar en UI al principio
        listaNoticias.prepend(crearElementoNoticia(nuevaNoticia));

        // Limpiar formulario y resetear foco
        formulario.reset();
        inputTitulo.focus();
    });

    // Función para crear y devolver el nodo HTML de la noticia
    function crearElementoNoticia(noticia) {
        // Usamos content.cloneNode para usar el template (mejor práctica vs innerHTML en listas)
        const clon = templateNoticia.content.cloneNode(true);
        const li = clon.querySelector('li');
        
        // Guardar ID real en un data-attribute para la delegación de eventos
        li.dataset.id = noticia.id;

        if (noticia.destacado) {
            li.classList.add('destacar-item');
        }

        const tituloNodo = clon.querySelector('.item-title');
        const badgeNodo = clon.querySelector('.item-category');
        
        tituloNodo.textContent = noticia.titulo;
        badgeNodo.textContent = noticia.categoria;

        return clon;
    }

    function renderizarNoticiaDOM(noticia) {
        listaNoticias.appendChild(crearElementoNoticia(noticia));
    }

    // 2. Event Delegation para eliminar y destacar elementos
    // En lugar de añadir listeners a cada botón, escuchamos el click en la <ul> (el contenedor padre).
    listaNoticias.addEventListener('click', (e) => {
        const itemLI = e.target.closest('li');
        if (!itemLI) return;

        const idTarget = itemLI.dataset.id;

        // Si clickó eliminar
        if (e.target.closest('.btn-eliminar')) {
            // Animación de salida (opcional para UX)
            itemLI.style.transform = 'translateX(100px)';
            itemLI.style.opacity = '0';
            
            setTimeout(() => {
                itemLI.remove(); // Elimina del DOM
                
                // Elimina del State
                noticiasGlobales = noticiasGlobales.filter(n => n.id !== idTarget);
                sincronizarLocalStorage();
            }, 300);
            
        }

        // Si clickó destacar
        if (e.target.closest('.btn-destacar')) {
            itemLI.classList.toggle('destacar-item');
            
            // Actualizar State
            const pos = noticiasGlobales.findIndex(n => n.id === idTarget);
            if (pos !== -1) {
                noticiasGlobales[pos].destacado = !noticiasGlobales[pos].destacado;
                sincronizarLocalStorage();
            }
        }
    });

    // Carga inicial
    cargarNoticiasLocalStorage();
});
