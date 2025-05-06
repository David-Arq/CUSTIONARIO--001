/**
 * @file script.js
 * @description Funcionalidad principal para un cuestionario interactivo.
 * @version 4.1 - Corrección final flujo inicio/fin, nombres en español, comentarios detallados.
 * @author Tu Nombre (Opcional)
 * @date Fecha de última modificación (Opcional)
 */

// ========================================================================
// ==                      CONSTANTES GLOBALES                         ==
// ========================================================================
// Variables que definen la configuración básica del cuestionario.
// Se declaran con `const` porque sus valores no cambian durante la ejecución.

/**
 * @const {Array<Object>} PREGUNTAS - Array que contiene los objetos de cada pregunta.
 * Cada objeto debe tener las propiedades:
 * - `question` (string): El texto de la pregunta.
 * - `options` (Array<string>): Un array con los textos de las opciones de respuesta.
 * - `answer` (string): La letra (A, B, C...) de la opción correcta.
 */
const PREGUNTAS = [
    // ========================================================================
    // == ¡¡¡IMPORTANTE!!! REEMPLAZA ESTE EJEMPLO CON TU ARRAY questions REAL ==
    // ========================================================================
    // Las preguntas de ejemplo proporcionadas. ¡Asegúrate de reemplazarlas con tus preguntas reales!
    { question: `1. La conducta dolosa o culposa, atribuible a una persona que realiza gestión fiscal hace referencia al actuar o proceder del servidor público o del particular que por una gestión fiscal antieconómica, ineficaz, ineficiente, inequitativa e inoportuna o una gestión que no cumple con los cometidos y fines esenciales del Estado, ocasiona el daño patrimonial. De lo anterior se colige que la conducta dolosa o culposa:`, options: ["A. Es aquella relación o vínculo que debe existir entre el daño al erario y la conducta dolosa o gravemente culposa, que serviría para concluir que el daño es consecuencia directa del hecho atribuible a una persona.", "B. Es la lesión o menoscabo causado al patrimonio público, representado en el deterioro de los bienes o recursos públicos.", "C. Se entiende como la acción u omisión del servidor o particular; es decir, hace referencia a la conducta que se afirma, causa el daño a la entidad."], answer: "C" },
    { question: `2. El funcionario encargado del proceso considera improcedente la adenda porque:`, options: ["A. Las adendas se destinan para efectos de cambios técnicos de la metodología de selección.", "B. Las adendas al pliego de condiciones deben ser debatidas por los oferentes antes de su publicación para su validez.", "C. Las adendas de esta naturaleza se deben efectuar antes de la presentación de ofertas."], answer: "C" },
    { question: `3. La comunicación posterior que exige ocho millones más constituye violación del:`, options: ["A. Principio de respeto al acto propio que conlleva violación de los principios de confianza legítima y buena fe.", "B. Derecho fundamental del debido proceso que conlleva violación de los principios de autonomía de la voluntad y la igualdad.", "C. Derecho al buen nombre que conlleva violación de los principios de buena fe y debido proceso."], answer: "A" }
    // Puedes añadir más preguntas aquí siguiendo el mismo formato.
    // ========================================================================
];

/**
 * @const {number} TIEMPO_POR_PREGUNTA_SEG - Tiempo asignado (en segundos) para responder cada pregunta.
 */
const TIEMPO_POR_PREGUNTA_SEG = 90;

/**
 * @const {number} TOTAL_PREGUNTAS - Número total de preguntas en el cuestionario.
 * Se calcula automáticamente basándose en la longitud del array PREGUNTAS.
 */
const TOTAL_PREGUNTAS = PREGUNTAS.length;

/**
 * @const {number} TIEMPO_TOTAL_ESTIMADO_SEG - Tiempo total estimado para completar todo el cuestionario (en segundos).
 * Se basa en el número total de preguntas y el tiempo asignado por pregunta.
 */
const TIEMPO_TOTAL_ESTIMADO_SEG = TOTAL_PREGUNTAS * TIEMPO_POR_PREGUNTA_SEG;


// ========================================================================
// ==                         ESTADO DEL QUIZ                          ==
// ========================================================================
// Variables que almacenan el estado actual del cuestionario y cambian durante la ejecución.

/**
 * @type {number} indicePreguntaActual - Índice (base 0) de la pregunta que se está mostrando actualmente.
 */
let indicePreguntaActual = 0;

/**
 * @type {Array<string|null>} respuestasUsuario - Array para almacenar la respuesta del usuario para cada pregunta.
 * El índice del array corresponde al índice de la pregunta.
 * El valor puede ser: la letra de la opción ('A', 'B', 'C'), 'skipped' si fue pospuesta/omitida, o null si no se ha respondido.
 */
let respuestasUsuario = []; // Se inicializa en `iniciarCuestionario`

/**
 * @type {number|null} idIntervaloTimerPregunta - Guarda el ID del intervalo del temporizador de la pregunta actual.
 * Se usa para poder detener el timer más tarde. Null cuando no hay timer activo.
 */
let idIntervaloTimerPregunta = null;

/**
 * @type {number|null} idIntervaloTimerTotal - Guarda el ID del intervalo del temporizador total del cuestionario.
 * Se usa para poder detener el timer más tarde. Null cuando no hay timer activo.
 */
let idIntervaloTimerTotal = null;

/**
 * @type {number} tiempoRestantePregunta - Segundos restantes en el temporizador de la pregunta actual.
 */
let tiempoRestantePregunta = TIEMPO_POR_PREGUNTA_SEG; // Se actualiza por el timer

/**
 * @type {number} tiempoRestanteTotal - Segundos restantes en el temporizador total del cuestionario.
 */
let tiempoRestanteTotal = TIEMPO_TOTAL_ESTIMADO_SEG; // Se actualiza por el timer

/**
 * @type {number|null} tiempoInicioQuiz - Timestamp (en milisegundos) en el que se inició el cuestionario.
 * Se usa para calcular el tiempo transcurrido para el timer total. Null antes de iniciar.
 */
let tiempoInicioQuiz = null;

/**
 * @type {boolean} quizActivo - Bandera que indica si el cuestionario está actualmente en progreso.
 * Se usa para controlar la lógica de los timers y la interacción.
 */
let quizActivo = false;

/**
 * @type {boolean} revisandoPospuestas - Bandera que indica si el usuario está actualmente en el modo de revisión de preguntas pospuestas.
 */
let revisandoPospuestas = false;

/**
 * @type {Array<number>} indicesPospuestas - Array que almacena los índices (base 0) de las preguntas que fueron pospuestas o no respondidas al intentar finalizar.
 */
let indicesPospuestas = []; // Se llena al intentar finalizar

/**
 * @type {number} indiceActualPospuesta - Índice (base 0) dentro del array `indicesPospuestas` que indica qué pregunta pospuesta se está revisando actualmente.
 */
let indiceActualPospuesta = 0; // Se usa en el modo revisión

/**
 * @type {Chart|null} graficoResultados - Instancia del objeto Chart.js creado para mostrar la infografía de resultados.
 * Se guarda la referencia para poder destruirla y recrearla si es necesario (ej. al reiniciar). Null si no hay gráfico activo.
 */
let graficoResultados = null;

// ========================================================================
// ==                        REFERENCIAS AL DOM                        ==
// ========================================================================
// Variables que almacenarán referencias a los elementos HTML con los que interactuamos.
// Se asignan cuando el DOM está cargado (`iniciarAplicacion`).

let pantallaBienvenida, btnEmpezar, contenedorQuiz, contNavegacion, contPregunta, barraProgreso, textoProgreso, labelTextoProgreso, contResultados, btnSiguiente, btnPosponer, btnFinalizar, contBotonesQuiz, btnFinalizarAnticipado, displayTimerPregunta, displayTimerTotal, canvasGrafico, contGrafico, elementoHeader;

// Referencias a elementos del modal personalizado
let modalPersonalizado, tituloModal, mensajeModal, btnConfirmarModal, btnCancelarModal, btnOkModal;

// Variable para guardar el elemento que tenía el foco antes de abrir el modal (para accesibilidad)
let elementoEnfocadoAntesModal = null;

// ========================================================================
// ==                       CALLBACKS DEL MODAL                        ==
// ========================================================================
// Variables para almacenar temporalmente las funciones que se deben ejecutar
// cuando el usuario confirma o cancela en un modal. (Aunque la implementación actual
// usa closures directamente en `mostrarModal`, mantener estas variables comentadas
// puede servir como recordatorio si se quisiera cambiar la estrategia).

// let callbackConfirmacion = null; // Ya no se usa de esta forma
// let callbackAlerta = null;       // Ya no se usa de esta forma

// ========================================================================
// ==                    INICIALIZACIÓN DE LA APLICACIÓN                   ==
// ========================================================================

/**
 * Se ejecuta cuando el DOM (Document Object Model) está completamente cargado y listo.
 * Es el punto de entrada principal de la aplicación.
 */
document.addEventListener('DOMContentLoaded', iniciarAplicacion);

/**
 * Función principal que inicia la aplicación:
 * 1. Intenta obtener y almacenar las referencias a los elementos DOM.
 * 2. Configura la pantalla de bienvenida inicial.
 * 3. Configura listeners de eventos globales (como atajos de teclado).
 */
function iniciarAplicacion() {
    console.log("DOM Cargado - Iniciando Aplicación V4.1");
    // Intentar cachear elementos DOM y verificar si los críticos están presentes
    if (!cachearElementosDOM()) {
        console.error("Fallo al cachear elementos DOM críticos. La aplicación no puede iniciar.");
        return; // Detener la ejecución si faltan elementos esenciales
    }
    console.log("Elementos DOM cacheados.");

    // Configurar la interfaz inicial en la pantalla de bienvenida
    configurarPantallaBienvenida();

    // Configurar listeners de eventos que deben estar activos a nivel global (ej. teclado Escape en modal)
    // Esto se hace una sola vez al inicio.
    configurarListenersGlobales();
    console.log("Aplicación inicializada. Esperando clic en Empezar.");
}

/**
 * Obtiene referencias a los elementos HTML clave mediante su ID o selector.
 * Almacena estas referencias en variables globales.
 * Realiza una validación básica para asegurar que los elementos críticos existen.
 * @returns {boolean} True si los elementos críticos se encontraron, False en caso contrario.
 */
function cachearElementosDOM() {
    console.log("Cacheando elementos DOM...");
    // Asignación de referencias a variables
    pantallaBienvenida = document.getElementById('welcome-screen');
    btnEmpezar = document.getElementById('btn-start');
    contenedorQuiz = document.querySelector('.quiz-wrapper'); // Usa querySelector para una clase
    contNavegacion = document.getElementById('question-nav');
    contPregunta = document.getElementById('quiz-container');
    barraProgreso = document.getElementById('progress-bar');
    textoProgreso = document.getElementById('progress-text');
    // Obtener el span específico si existe, o usar textoProgreso si es solo un nodo de texto
    labelTextoProgreso = document.getElementById('progress-text-label');
    contResultados = document.getElementById('results-container');
    btnSiguiente = document.getElementById('btn-next');
    btnPosponer = document.getElementById('btn-skip');
    btnFinalizar = document.getElementById('btn-submit');
    contBotonesQuiz = document.getElementById('quiz-buttons');
    btnFinalizarAnticipado = document.getElementById('btn-early-finish');
    // Usar querySelector para elementos dentro de otros, o combinaciones
    displayTimerPregunta = document.querySelector('#question-timer .time');
    displayTimerTotal = document.querySelector('#total-timer .time');
    canvasGrafico = document.getElementById('infographic-chart');
    contGrafico = document.querySelector('.chart-container');
    elementoHeader = document.querySelector('.main header#quiz-header');

    // Cacheo de elementos del modal
    modalPersonalizado = document.getElementById('custom-modal');
    tituloModal = document.getElementById('modal-title');
    mensajeModal = document.getElementById('modal-message');
    btnConfirmarModal = document.getElementById('modal-btn-confirm');
    btnCancelarModal = document.getElementById('modal-btn-cancel');
    btnOkModal = document.getElementById('modal-btn-ok');

    // Validar que los elementos DOM *esenciales* para el funcionamiento existan.
    // Si falta alguno, la aplicación probablemente no funcionará.
    const elementosCriticos = {
        pantallaBienvenida, btnEmpezar, contenedorQuiz, contPregunta,
        contResultados, modalPersonalizado, btnConfirmarModal, btnCancelarModal, btnOkModal,
        btnFinalizar // btnFinalizar es crucial para terminar el quiz
    };

    for (const key in elementosCriticos) {
        if (!elementosCriticos[key]) {
            console.error(`Error Crítico: Falta el elemento DOM "${key}" con ID o selector "${key === 'contenedorQuiz' ? '.quiz-wrapper' : key === 'elementoHeader' ? '.main header#quiz-header' : key === 'displayTimerPregunta' ? '#question-timer .time' : key === 'displayTimerTotal' ? '#total-timer .time' : key === 'contGrafico' ? '.chart-container' : '#' + key}".`);
            // Mostrar un mensaje de error visible para el usuario si falta un elemento crítico
            document.body.innerHTML = `<p style="color:red; font-size: 18px; padding: 20px; text-align: center;">Error al cargar la interfaz del cuestionario.<br>Falta un componente esencial (${key}).<br>Por favor, contacta al administrador del sitio.</p>`;
            return false; // Indica que el cacheo falló
        }
    }
    console.log("Elementos DOM cacheados exitosamente.");
    return true; // Indica que el cacheo fue exitoso
}

/**
 * Configura el estado inicial de la pantalla de bienvenida:
 * - Detiene timers si estuvieran corriendo (limpieza).
 * - Asegura que el quiz esté marcado como inactivo.
 * - Controla la visibilidad de los contenedores principales (bienvenida visible, quiz oculto).
 * - Llena la información del quiz (número de preguntas, tiempos) en la interfaz de bienvenida.
 * - Re-aplica la animación de entrada si es necesario.
 * - Asigna el evento click al botón "EMPEZAR".
 */
function configurarPantallaBienvenida() {
    console.log("Configurando Pantalla Bienvenida...");
    // Detener cualquier timer activo si se regresa a la bienvenida
    detenerTimers();
    quizActivo = false; // Asegurar estado inactivo

    // --- Control de Visibilidad ---
    // Mostrar la pantalla de bienvenida
    if (pantallaBienvenida) pantallaBienvenida.classList.remove('hidden');

    // Ocultar todos los elementos que pertenecen al quiz activo o resultados
    if (contenedorQuiz) {
        contenedorQuiz.classList.remove('visible'); // Remover clase de transición
        contenedorQuiz.style.display = 'none';     // Ocultar completamente
    }
    // Asegurar que las secciones internas del quiz y resultados estén ocultas también
    if (contResultados) contResultados.style.display = 'none';
    if (elementoHeader) elementoHeader.style.display = ''; // Mostrar si estaba oculto por resultados
    if (contPregunta) contPregunta.style.display = 'flex'; // Mostrar si estaba oculto por resultados (display por defecto)
    if (contBotonesQuiz) contBotonesQuiz.style.display = 'flex'; // Mostrar si estaba oculto
    const linkFinalizarAnt = document.getElementById('early-finish-container');
    if (linkFinalizarAnt) linkFinalizarAnt.style.display = 'block'; // Mostrar si estaba oculto

    // --- Llenar Información del Quiz en la Bienvenida ---
    const elTotalPreguntas = document.getElementById('total-questions-info');
    const elTiempoPorPregunta = document.getElementById('time-per-question-info');
    const elTiempoTotal = document.getElementById('total-time-info');

    // Asegurarse de que los elementos existen antes de intentar modificar su textContent
    if (elTotalPreguntas) elTotalPreguntas.textContent = TOTAL_PREGUNTAS;
    if (elTiempoPorPregunta) elTiempoPorPregunta.textContent = TIEMPO_POR_PREGUNTA_SEG;
    // Calcular y mostrar el tiempo total estimado en minutos (redondeado hacia arriba)
    if (elTiempoTotal) elTiempoTotal.textContent = Math.ceil(TIEMPO_TOTAL_ESTIMADO_SEG / 60);

    // --- Animación de Entrada (Opcional, si el diseño lo usa) ---
    // Volver a aplicar la animación si el usuario regresa a la bienvenida
    const contenidoBienvenida = pantallaBienvenida?.querySelector('.welcome-content');
    if (contenidoBienvenida) {
        // Reiniciar animación: remover, forzar reflow, añadir de nuevo con un pequeño timeout
        contenidoBienvenida.style.animation = 'none';
        void contenidoBienvenida.offsetWidth; // Truco para forzar reflow (el navegador recalcula el layout)
        setTimeout(() => {
             contenidoBienvenida.style.animation = ''; // Volver a aplicar la animación definida en CSS
        }, 10); // Pequeño delay para asegurar que el navegador registre el cambio
    }

    // --- Asignar Evento al Botón Empezar ---
    // Asignar el manejador de eventos al botón de inicio.
    // Se verifica si ya tiene un manejador `onclick` para evitar duplicados si la función se llama varias veces.
    if (btnEmpezar && !btnEmpezar.onclick) {
        btnEmpezar.onclick = iniciarCuestionario; // Cuando se haga clic, llamar a iniciarCuestionario
        console.log("Evento click asignado a btnEmpezar.");
    }
    console.log("Pantalla Bienvenida configurada y lista.");
}

/**
 * Inicia el ciclo de vida del cuestionario:
 * 1. Oculta la pantalla de bienvenida.
 * 2. Muestra el contenedor principal del quiz.
 * 3. Inicializa el estado interno del quiz (respuestas, índices, etc.).
 * 4. Marca el quiz como activo.
 * 5. Renderiza la interfaz del quiz (navegación, primera pregunta).
 * 6. Inicia los temporizadores.
 * 7. Asigna los eventos de click a los botones de control del quiz.
 */
function iniciarCuestionario() {
    console.log("Iniciando Cuestionario...");
    // Verificación básica de que los contenedores principales existan antes de manipularlos
    if (!pantallaBienvenida || !contenedorQuiz) {
        console.error("Error al iniciar: Falta la pantalla de bienvenida o el contenedor del quiz.");
        return;
    }

    // --- Control de Visibilidad ---
    pantallaBienvenida.classList.add('hidden'); // Ocultar la pantalla de bienvenida
    contenedorQuiz.style.display = 'flex';    // Mostrar el contenedor principal del quiz usando flexbox
    void contenedorQuiz.offsetWidth;          // Forzar reflow para que la transición de opacidad funcione
    contenedorQuiz.classList.add('visible'); // Añadir clase para activar la transición de opacidad definida en CSS

    // --- Inicializar Estado ---
    inicializarEstadoQuiz(); // Resetear todas las variables de estado y limpiar UI previa
    quizActivo = true;       // Marcar la aplicación como activa en el modo quiz

    // --- Cargar Interfaz del Quiz ---
    crearNavegacion();        // Generar los botones de navegación lateral
    mostrarPregunta(indicePreguntaActual); // Mostrar la primera pregunta (índice 0)
    actualizarProgreso();     // Inicializar la barra de progreso y el texto
    verificarUltimaPregunta(); // Asegurar que los botones Siguiente/Finalizar estén correctos para la primera pregunta

    // --- Iniciar Mecanismos ---
    iniciarTimers();         // Poner en marcha los contadores de tiempo
    asignarEventosQuiz();    // Conectar las funciones a los botones "Siguiente", "Posponer", "Finalizar", etc.

    console.log("Cuestionario iniciado exitosamente.");
    // Opcional: Enfocar el contenedor principal o la primera pregunta para mejorar la accesibilidad
    // if (contPregunta) setTimeout(() => contPregunta.focus({ preventScroll: true }), 600); // Esperar que la transición termine
}

/**
 * Reinicia todas las variables de estado del quiz a sus valores iniciales.
 * Limpia elementos de la interfaz que pueden contener datos de una ejecución anterior.
 * Esta función se llama al iniciar un nuevo cuestionario.
 */
function inicializarEstadoQuiz() {
    console.log("Reiniciando estado del quiz...");
    // Asegurarse de que no haya timers corriendo antes de reiniciar
    detenerTimers();

    // Resetear variables de estado principales
    indicePreguntaActual = 0;
    // Crear un array nuevo para respuestas, lleno de `null` (sin responder)
    respuestasUsuario = Array(TOTAL_PREGUNTAS).fill(null);
    revisandoPospuestas = false; // No estamos en modo revisión al inicio
    indicesPospuestas = [];     // Limpiar lista de pospuestas
    indiceActualPospuesta = 0; // Resetear índice de revisión
    quizActivo = false;         // Se establecerá a true en iniciarCuestionario()

    // --- Limpiar UI de ejecuciones previas ---
    // Destruir la instancia de Chart.js si existe para liberar recursos
    if (graficoResultados instanceof Chart) {
        console.log("Destruyendo instancia previa de Chart.js.");
        graficoResultados.destroy();
        graficoResultados = null; // Limpiar la referencia
    }

    // Limpiar el contenido de los contenedores principales del quiz y resultados
    if (contPregunta) contPregunta.innerHTML = '';
    if (contNavegacion) contNavegacion.innerHTML = '';

    // Limpiar la lista detallada de resultados si ya contenía algo
    const listaDetallada = document.getElementById('detailed-results-list');
    if (listaDetallada) listaDetallada.innerHTML = '';

    // Resetear la barra de progreso visualmente
    if (barraProgreso) barraProgreso.style.width = '0%';

    // Resetear el texto de progreso
    if (textoProgreso && labelTextoProgreso) {
        labelTextoProgreso.textContent = `Progreso (0%):`; // Resetear el label fijo
        // Asegurarse de que el nodo de texto que contiene los números se actualice
        const nodoTexto = Array.from(textoProgreso.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if(nodoTexto) nodoTexto.nodeValue = ` 0 Resp / 0 Posp`; // Resetear el conteo numérico
    }

    // Asegurar que la sección de resultados y el gráfico estén ocultos
    if (contResultados) contResultados.style.display = 'none';
    if (contGrafico) contGrafico.style.display = 'none';

    // Asegurar que los elementos principales del quiz estén visibles (si se ocultaron para mostrar resultados)
    if (elementoHeader) elementoHeader.style.display = '';
    if (contPregunta) contPregunta.style.display = 'flex'; // Usar el display por defecto necesario
    if (contBotonesQuiz) contBotonesQuiz.style.display = 'flex';
    const linkFinAnticipado = document.getElementById('early-finish-container');
    if (linkFinAnticipado) linkFinAnticipado.style.display = 'block';

    // Resetear texto y estado del botón Finalizar
    if (btnFinalizar) {
        btnFinalizar.textContent = 'Finalizar';
        btnFinalizar.disabled = false; // Asegurar que no esté deshabilitado
    }
    // Asegurar que Siguiente y Posponer no estén ocultos al inicio
    if (btnSiguiente) btnSiguiente.classList.remove('hidden');
    if (btnPosponer) btnPosponer.classList.remove('hidden');

    console.log("Estado del quiz reiniciado.");
}
// ========================================================================
// ==                     FUNCIONES DE TEMPORIZADORES                    ==
// ========================================================================
// Funciones encargadas de iniciar, detener y actualizar los contadores de tiempo.

/**
 * Inicia los intervalos de los temporizadores (por pregunta y total).
 * Detiene cualquier timer previo antes de iniciar los nuevos.
 * Inicializa los tiempos restantes y actualiza su visualización.
 */
function iniciarTimers() {
    console.log("Iniciando timers...");
    detenerTimers(); // Asegurarse de que no haya timers duplicados corriendo

    // Registrar el momento exacto en que inician los timers
    tiempoInicioQuiz = Date.now();

    // Reinicializar los tiempos restantes a sus valores máximos
    tiempoRestantePregunta = TIEMPO_POR_PREGUNTA_SEG;
    tiempoRestanteTotal = TIEMPO_TOTAL_ESTIMADO_SEG;

    // Actualizar el texto visible de los timers con los valores iniciales
    actualizarDisplayTimer(displayTimerPregunta, tiempoRestantePregunta);
    actualizarDisplayTimer(displayTimerTotal, tiempoRestanteTotal);

    // Remover clases de estado (warning/ahead) si estuvieran presentes
    displayTimerTotal?.classList.remove('warning', 'ahead');
    displayTimerPregunta?.classList.remove('warning');

    // Marcar el quiz como activo; esto es crucial para que los intervalos sigan corriendo
    quizActivo = true;

    // --- Timer por Pregunta ---
    // Configurar un intervalo que se ejecuta cada segundo
    idIntervaloTimerPregunta = setInterval(() => {
        // Si el quiz ya no está activo (ej. se finalizó), detener este intervalo
        if (!quizActivo) {
            clearInterval(idIntervaloTimerPregunta);
            return;
        }
        // Decrementar el tiempo restante
        tiempoRestantePregunta--;
        // Actualizar el display del timer de pregunta
        actualizarDisplayTimer(displayTimerPregunta, tiempoRestantePregunta);

        // Añadir o quitar la clase 'warning' si el tiempo restante es 0 o menos
        // Esto cambia el color del timer en la UI
        displayTimerPregunta?.classList.toggle('warning', tiempoRestantePregunta <= 0);

        // Lógica opcional: si el tiempo por pregunta llega a 0, podrías auto-posponer o marcar como incorrecta
        // if (tiempoRestantePregunta <= 0) {
        //    // Implementar lógica para pasar automáticamente a la siguiente o marcar como no respondida
        //    console.log("Tiempo por pregunta agotado.");
        //    // posponerPregunta(); // O alguna otra acción
        // }

    }, 1000); // El intervalo es de 1000 milisegundos (1 segundo)

    // --- Timer Total ---
    // Configurar un intervalo que se ejecuta cada segundo
    idIntervaloTimerTotal = setInterval(() => {
        // Si el quiz ya no está activo o no se registró el tiempo de inicio, detener este intervalo
        if (!quizActivo || !tiempoInicioQuiz) {
            clearInterval(idIntervaloTimerTotal);
            return;
        }

        // Calcular los segundos transcurridos desde que se inició el quiz
        const segundosTranscurridos = Math.floor((Date.now() - tiempoInicioQuiz) / 1000);

        // Calcular el tiempo restante total
        tiempoRestanteTotal = TIEMPO_TOTAL_ESTIMADO_SEG - segundosTranscurridos;

        // Actualizar el display del timer total
        actualizarDisplayTimer(displayTimerTotal, tiempoRestanteTotal);

        // --- Lógica para cambiar color del timer total según el progreso/tiempo ---
        // Asegurarse de que el elemento exista antes de modificar sus clases
        if (!displayTimerTotal) return;

        // Calcular el tiempo esperado para la pregunta actual si se llevara el ritmo ideal
        const tiempoEsperado = (indicePreguntaActual + 1) * TIEMPO_POR_PREGUNTA_SEG;

        // Remover clases de estado previas
        displayTimerTotal.classList.remove('warning', 'ahead');

        // Aplicar clase 'warning' si el tiempo total restante es <= 0 (agotado)
        if (tiempoRestanteTotal <= 0) {
            displayTimerTotal.classList.add('warning');
            // Lógica opcional: si el tiempo total llega a 0, finalizar el quiz automáticamente
             console.log("Tiempo total agotado. Finalizando cuestionario...");
             detenerTimers(); // Detener inmediatamente
             respuestasUsuario = respuestasUsuario.map(r => r === null ? 'skipped' : r); // Marcar pendientes como omitidas
             calcularYMostrarResultados(); // Proceder a mostrar resultados
             mostrarModal('alert', 'Tiempo Agotado', '¡El tiempo para completar el cuestionario ha terminado!');
             return; // Salir de la función del intervalo
        }
        // Aplicar clase 'warning' si se está significativamente por detrás del tiempo esperado para la pregunta actual
        else if (segundosTranscurridos > tiempoEsperado + 15) { // Si te has pasado por más de 15s del tiempo ideal para esta pregunta
             displayTimerTotal.classList.add('warning');
        }
        // Aplicar clase 'ahead' si se está significativamente por delante del tiempo esperado (y aún queda tiempo considerable)
        else if (segundosTranscurridos < tiempoEsperado - 15 && tiempoRestanteTotal > 60) { // Si vas rápido y aún queda más de un minuto
             displayTimerTotal.classList.add('ahead');
        }
        // Aplicar clase 'warning' cuando el tiempo total restante sea bajo (último minuto)
        else if (tiempoRestanteTotal <= 60 && tiempoRestanteTotal > 0) {
            displayTimerTotal.classList.add('warning');
        }

    }, 1000); // El intervalo es de 1000 milisegundos (1 segundo)
    console.log("Timers iniciados.");
}

/**
 * Formatea una cantidad de segundos en el formato de texto MM:SS (Minutos:Segundos).
 * Puede manejar segundos negativos si es necesario (aunque en este quiz no deberían ocurrir).
 * @param {number} segundos - El número de segundos a formatear.
 * @returns {string} La cadena de texto formateada como "MM:SS".
 */
function formatearTiempo(segundos) {
    const esNegativo = segundos < 0; // Verificar si el número es negativo
    const segAbs = Math.abs(segundos); // Trabajar con el valor absoluto
    const mins = Math.floor(segAbs / 60); // Calcular los minutos (parte entera)
    const segs = segAbs % 60; // Calcular los segundos restantes

    // Formatear minutos y segundos con ceros iniciales si son menores de 10
    const minsFormato = String(mins).padStart(2, '0');
    const segsFormato = String(segs).padStart(2, '0');

    // Retornar la cadena formateada, añadiendo el signo negativo si era necesario
    return `${esNegativo ? '-' : ''}${minsFormato}:${segsFormato}`;
}

/**
 * Actualiza el contenido de texto de un elemento HTML para mostrar un tiempo formateado.
 * Se usa para actualizar los displays de los temporizadores en la interfaz.
 * @param {HTMLElement} elemento - El elemento HTML (ej. un span) cuyo texto se va a actualizar.
 * @param {number} segundos - El número de segundos a mostrar, que será formateado.
 */
 function actualizarDisplayTimer(elemento, segundos) {
   // Verificar que el elemento exista antes de intentar modificar su textContent
   if (elemento) {
     elemento.textContent = formatearTiempo(segundos);
   } else {
     // Esto podría ser un warning si el elemento no es crítico, o un error si sí lo es
     console.warn("Intento de actualizar un elemento de timer que no fue encontrado en el DOM.");
   }
 }

/**
 * Reinicia el temporizador específico de la pregunta actual.
 * Se llama cada vez que se muestra una *nueva* pregunta (al avanzar, retroceder, o ir a una pospuesta).
 */
function reiniciarTimerPregunta() {
    console.log("Reiniciando timer de pregunta...");
    // Detener el intervalo del timer de pregunta actual
    clearInterval(idIntervaloTimerPregunta);
    idIntervaloTimerPregunta = null; // Limpiar la referencia

    // Resetear el tiempo restante de la pregunta al valor configurado
    tiempoRestantePregunta = TIEMPO_POR_PREGUNTA_SEG;

    // Actualizar el display del timer de pregunta con el nuevo tiempo
    actualizarDisplayTimer(displayTimerPregunta, tiempoRestantePregunta);

    // Remover la clase 'warning' si estaba activa
    displayTimerPregunta?.classList.remove('warning');

    // Si el quiz está activo, iniciar un nuevo intervalo para el timer de pregunta
    // Esto evita que el timer de pregunta corra si el quiz ha finalizado
    if (quizActivo) {
        idIntervaloTimerPregunta = setInterval(() => {
            // Si el quiz deja de estar activo mientras el intervalo corre, detenerse
            if (!quizActivo) {
                clearInterval(idIntervaloTimerPregunta);
                return;
            }
            tiempoRestantePregunta--;
            actualizarDisplayTimer(displayTimerPregunta, tiempoRestantePregunta);
            // Alternar la clase 'warning' si el tiempo llega a 0 o menos
            displayTimerPregunta?.classList.toggle('warning', tiempoRestantePregunta <= 0);

            // Lógica opcional de tiempo agotado por pregunta (puede duplicar la del timer total si ya la manejas ahí)
            // if (tiempoRestantePregunta <= 0) {
            //    console.log("Tiempo por pregunta agotado. Pasando a la siguiente...");
            //    // Considerar si quieres guardar 'skipped' aquí o simplemente avanzar
            //    // posponerPregunta(); // Esto guarda como skipped y avanza
            // }
        }, 1000); // Intervalo cada segundo
    }
    console.log("Timer de pregunta reiniciado.");
}

/**
 * Detiene ambos temporizadores (pregunta y total) limpiando sus intervalos.
 * Marca la bandera `quizActivo` como false.
 * Se llama al finalizar el cuestionario (normal o anticipadamente) o al regresar a la bienvenida.
 */
function detenerTimers() {
    console.log("Deteniendo timers...");
    quizActivo = false; // Marcar el quiz como inactivo

    // Limpiar el intervalo del timer de pregunta si está activo
    if (idIntervaloTimerPregunta !== null) {
        clearInterval(idIntervaloTimerPregunta);
        idIntervaloTimerPregunta = null; // Limpiar la referencia
    }

    // Limpiar el intervalo del timer total si está activo
    if (idIntervaloTimerTotal !== null) {
        clearInterval(idIntervaloTimerTotal);
        idIntervaloTimerTotal = null; // Limpiar la referencia
    }
    console.log("Timers detenidos.");
}


// ========================================================================
// ==                  FUNCIONES DE NAVEGACIÓN Y RENDERIZADO               ==
// ========================================================================
// Funciones para manejar la visualización de las preguntas y la navegación lateral.

/**
 * Crea dinámicamente los elementos de navegación en la barra lateral (`#question-nav`).
 * Genera un div por cada pregunta. Cada div representa un "botón" en la sidebar.
 * Asigna eventos click y keydown para navegar a la pregunta correspondiente.
 */
function crearNavegacion() {
    console.log("Creando navegación lateral...");
    // Verificar si el contenedor de navegación existe antes de modificarlo
    if (!contNavegacion) {
        console.error("Contenedor de navegación (#question-nav) no encontrado.");
        return;
    }

    contNavegacion.innerHTML = ''; // Limpiar cualquier contenido previo en la sidebar

    // Iterar sobre cada pregunta en el array PREGUNTAS
    PREGUNTAS.forEach((_, index) => {
        const itemNav = document.createElement('div'); // Crear un nuevo div para cada pregunta
        itemNav.setAttribute('role', 'button'); // Rol ARIA para indicar que es un control interactivo
        itemNav.setAttribute('tabindex', '0'); // Hacer el div enfocable con el teclado
        itemNav.dataset.number = index + 1; // Guardar el número de pregunta (base 1) como un atributo data

        // Asignar evento click: al hacer click, llamar a `irAPregunta` con el índice de la pregunta
        itemNav.onclick = () => irAPregunta(index);

        // Asignar evento keydown para accesibilidad con teclado (Enter o Espacio)
        itemNav.onkeydown = (e) => {
            // Verificar si la tecla presionada es Enter o Espacio
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevenir la acción por defecto (ej. scroll con Espacio)
                irAPregunta(index); // Navegar a la pregunta
            }
        };

        // Añadir el elemento creado a la barra lateral
        contNavegacion.appendChild(itemNav);
    });

    // Llamar a actualizarNavegacion para establecer los estilos iniciales (unanswered)
    actualizarNavegacion();
    console.log(`Navegación lateral creada para ${TOTAL_PREGUNTAS} preguntas.`);
}

/**
 * Renderiza el contenido de una pregunta específica (texto de pregunta y opciones) en el área principal del quiz.
 * Aplica efectos visuales de transición (fade-out/fade-in).
 * Asigna listeners a las opciones de respuesta.
 * Actualiza el estado de la navegación lateral y los botones.
 * @param {number} index - El índice (base 0) de la pregunta que se desea mostrar.
 */
function mostrarPregunta(index) {
    // Validar que el contenedor de preguntas exista y que el índice sea válido
    if (!contPregunta || index < 0 || index >= TOTAL_PREGUNTAS) {
        console.error(`Intento de mostrar pregunta con índice inválido: ${index}`);
        return;
    }
    console.log(`Mostrando pregunta ${index + 1}...`);

    // --- Preparar para la Transición ---
    // Remover la clase 'fade-in' si estaba presente de una transición anterior
    contPregunta.classList.remove('fade-in');
    // Añadir la clase 'fade-out' para iniciar la animación de salida
    contPregunta.classList.add('fade-out');

    // Reiniciar el temporizador de la pregunta actual cada vez que se muestra una nueva pregunta
    reiniciarTimerPregunta();

    // Usar setTimeout para dar tiempo a que la animación 'fade-out' se complete antes de cambiar el contenido HTML
    setTimeout(() => {
        try {
            const p = PREGUNTAS[index]; // Obtener los datos de la pregunta del array global

            // Validar que los datos de la pregunta sean válidos
            if (!p || !Array.isArray(p.options) || typeof p.question !== 'string' || typeof p.answer !== 'string') {
                 // Si los datos de la pregunta son incorrectos, mostrar un mensaje de error
                 throw new Error(`Datos inválidos para la pregunta con índice ${index}. Verifica el array PREGUNTAS.`);
            }

            // --- Generar HTML de las Opciones ---
            let opcionesHTML =
                `<fieldset class="options-fieldset">
                    <legend class="sr-only">Opciones pregunta ${index + 1}</legend> <ul class="options" role="radiogroup" aria-labelledby="question-text-${index}">`; // role="radiogroup" para accesibilidad

            // Iterar sobre cada opción de la pregunta actual
            p.options.forEach((opcionTexto, i) => {
                const letraOpcion = String.fromCharCode(65 + i); // Generar la letra de la opción (A, B, C...)
                const idOpcion = `q${index}_opt${i}`; // Generar un ID único para cada input y label
                // Verificar si esta opción fue la respuesta seleccionada previamente por el usuario para esta pregunta
                const estaMarcada = respuestasUsuario[index] === letraOpcion;

                opcionesHTML += `
                <li>
                    <input type="radio" id="${idOpcion}" name="answer_${index}" value="${letraOpcion}" ${estaMarcada ? 'checked' : ''} aria-labelledby="label-${idOpcion}">
                    <label id="label-${idOpcion}" for="${idOpcion}"><span class="option-letter">${letraOpcion}.</span> ${opcionTexto || ''}</label>
                </li>`;
            });
            opcionesHTML += '</ul></fieldset>'; // Cerrar las etiquetas ul y fieldset

            // --- Insertar Contenido en el DOM ---
            // Establecer el HTML interno del contenedor de preguntas con el nuevo contenido
            contPregunta.innerHTML = `
            <div class="question-container">
                <h2 class="question" id="question-text-${index}" tabindex="-1">${index + 1}. ${p.question}</h2>
                ${opcionesHTML} </div>`;

            // --- Asignar Listeners a las Opciones ---
            // Obtener todos los elementos <li> que contienen las opciones en la pregunta recién renderizada
            const itemsOpcion = contPregunta.querySelectorAll('.options li');
            itemsOpcion.forEach(item => {
                // Añadir listener para el evento 'click' a cada LI.
                // Cuando se hace click en el LI, se llama a la función `manejarClickOpcion`.
                item.addEventListener('click', manejarClickOpcion);

                // Opcional: Añadir listener de keydown a los radio buttons para manejar la tecla Espacio si es necesario
                // La navegación con flechas se maneja a nivel global en `manejarTeclaGlobal`
                const radio = item.querySelector('input[type="radio"]');
                if (radio) {
                     radio.addEventListener('keydown', e => {
                          // Prevenir la acción por defecto del navegador para la tecla Espacio
                          // si ya se va a manejar con JS o para evitar doble activación
                          if (e.key === ' ') e.preventDefault();
                     });
                }
            });

            // --- Actualizar UI ---
            actualizarNavegacion(); // Actualizar los estilos de los items en la sidebar
            verificarUltimaPregunta(); // Ajustar la visibilidad y texto de los botones (Siguiente/Finalizar)

            // --- Animación de Entrada ---
            // Remover la clase 'fade-out'
            contPregunta.classList.remove('fade-out');
            // Añadir la clase 'fade-in' para iniciar la animación de entrada
            contPregunta.classList.add('fade-in');
            // Después de un breve tiempo, remover la clase 'fade-in'
            setTimeout(() => contPregunta.classList.remove('fade-in'), 300); // La duración de la transición CSS

            // --- Gestión del Foco (Accesibilidad) ---
            // Intentar enfocar el texto de la pregunta para mejorar la navegación con teclado
            const elementoTextoPregunta = document.getElementById(`question-text-${index}`);
            if (elementoTextoPregunta) {
                 // Usar un pequeño timeout para asegurar que el elemento sea enfocable después de la transición y renderizado
                 setTimeout(() => elementoTextoPregunta.focus({ preventScroll: true }), 350); // preventScroll evita que la ventana se desplace automáticamente
            }

        } catch (error) {
             // Si ocurre algún error al mostrar la pregunta, loggearlo y mostrar un mensaje en la UI
             console.error(`Error al mostrar pregunta ${index + 1}:`, error);
             if (contPregunta) {
                 contPregunta.innerHTML = `<p style="color: red; padding: 20px;">Error al cargar esta pregunta.</p>`;
                 // Asegurarse de quitar la clase fade-out aunque haya error
                 contPregunta.classList.remove('fade-out');
             }
        }
    }, 300); // El timeout debe ser igual o mayor que la duración de la transición 'fade-out' en CSS
    console.log(`Pregunta ${index + 1} mostrada.`);
}

/**
 * Maneja el evento click en un elemento <li> de opción.
 * Encuentra el input radio dentro del LI clickeado, lo marca como seleccionado,
 * guarda la respuesta del usuario y aplica un efecto visual temporal.
 * 'this' dentro de esta función se refiere al elemento LI que fue clickeado.
 */
function manejarClickOpcion() {
    // Buscar el input radio dentro del <li> que recibió el click
    const radio = this.querySelector('input[type="radio"]');

    // Si se encontró un radio button dentro del LI
    if (radio) {
        // Verificar si este radio ya estaba marcado. Solo proceder si no lo estaba.
        if (!radio.checked) {
            radio.checked = true; // Marcar el input radio como seleccionado
            guardarRespuestaActual(); // Llamar a la función para guardar la respuesta en el estado global
        }

        // Añadir una clase temporal para un efecto visual (ej. escala, opacidad)
        this.classList.add('selected');
        // Remover la clase 'selected' después de un breve tiempo para que el efecto sea momentáneo
        setTimeout(() => this.classList.remove('selected'), 150); // Duración del efecto en ms

        // Lógica opcional: Avanzar a la siguiente pregunta automáticamente después de seleccionar una opción
        // setTimeout(() => {
        //      const esUltimaNormal = !revisandoPospuestas && indicePreguntaActual === TOTAL_PREGUNTAS - 1;
        //      const esUltimaRevision = revisandoPospuestas && indiceActualPospuesta === indicesPospuestas.length - 1;
        //      // Solo avanzar si no es la última pregunta (en flujo normal o revisión)
        //      if (!esUltimaNormal && !esUltimaRevision) {
        //           siguientePregunta();
        //      } else {
        //           // Si es la última, enfocar el botón Finalizar
        //           if(btnFinalizar) btnFinalizar.focus();
        //      }
        // }, 250); // Pequeño delay antes de avanzar
    }
}

/**
 * Guarda la respuesta seleccionada actualmente para la pregunta en el array `respuestasUsuario`.
 * Se llama cuando el usuario selecciona una opción.
 * Actualiza la navegación lateral y el indicador de progreso.
 */
function guardarRespuestaActual() {
    // Validar que el contenedor de preguntas exista y el índice actual sea válido
    if (!contPregunta || indicePreguntaActual < 0 || indicePreguntaActual >= TOTAL_PREGUNTAS) {
        console.warn("Intento de guardar respuesta en un estado inválido.");
        return;
    }

    // Buscar el input radio que esté 'checked' dentro del contenedor de la pregunta actual
    const inputSeleccionado = contPregunta.querySelector(`input[name="answer_${indicePreguntaActual}"]:checked`);

    // Determinar el valor de la respuesta: la letra de la opción si hay una seleccionada, o null si no
    const nuevoValor = inputSeleccionado ? inputSeleccionado.value : null;
    const valorAnterior = respuestasUsuario[indicePreguntaActual]; // Obtener el valor que estaba guardado antes

    // Solo actualizar y ejecutar lógica adicional si se seleccionó una opción Y es diferente de la respuesta guardada previamente
    if (nuevoValor && nuevoValor !== valorAnterior) {
        respuestasUsuario[indicePreguntaActual] = nuevoValor; // Actualizar el array de respuestas
        console.log(`Respuesta guardada para P${indicePreguntaActual + 1}: ${nuevoValor}`);

        // Actualizar la interfaz para reflejar el cambio:
        actualizarNavegacion(); // Cambiar el color del item en la sidebar
        actualizarProgreso(); // Recalcular y actualizar la barra/texto de progreso
    }
    // Nota: Si el usuario deselecciona una opción (lo cual no es posible con radio buttons a menos que se resetee programáticamente)
    // o selecciona la misma opción, la respuesta no cambia, y la lógica dentro de este `if` no se ejecuta.
}


/**
 * Avanza a la siguiente pregunta en el flujo actual (normal o revisión).
 * Guarda la respuesta actual antes de avanzar.
 * Si está en modo revisión y hay más preguntas pospuestas, va a la siguiente pospuesta.
 * Si termina la revisión o el flujo normal, ajusta los botones.
 */
function siguientePregunta() {
    console.log("Siguiente Pregunta solicitada.");
    // Asegurarse de guardar la respuesta actual antes de pasar a la siguiente pregunta
    guardarRespuestaActual();

    // --- Lógica de Navegación ---
    if (revisandoPospuestas) {
        // Si estamos revisando preguntas pospuestas:
        indiceActualPospuesta++; // Avanzar al siguiente índice en el array de pospuestas
        // Verificar si aún hay preguntas pospuestas por revisar
        if (indiceActualPospuesta < indicesPospuestas.length) {
            // Si hay más, ir a la pregunta correspondiente usando el índice del array `indicesPospuestas`
            irAPregunta(indicesPospuestas[indiceActualPospuesta]);
        } else {
            // Si no hay más preguntas en la lista de pospuestas: Fin de la revisión
            console.log("Fin de la revisión de preguntas pospuestas.");
            revisandoPospuestas = false; // Salir del modo revisión
            if (btnFinalizar) btnFinalizar.textContent = 'Finalizar'; // Restaurar texto del botón Finalizar
            verificarUltimaPregunta(); // Actualizar visibilidad de botones (Siguiente/Posponer/Finalizar)
            // Opcional: Volver a mostrar la última pregunta del flujo normal (si aplica) o quedarse en la que estaba
            // irAPregunta(indicePreguntaActual); // Esto podría ser confuso, la implementación actual se queda donde terminó la revisión.

            // Mostrar un modal informativo indicando que la revisión ha terminado
            mostrarModal('alert', 'Revisión Completa', "Has revisado todas las preguntas pospuestas.\nPuedes finalizar el cuestionario o navegar a otras preguntas.");
            // Asegurarse de que el foco esté en un lugar lógico después del modal, ej. el botón Finalizar
            if (btnFinalizar) btnFinalizar.focus();
        }
    } else {
        // Si no estamos revisando pospuestas (flujo normal):
        // Verificar si aún hay preguntas restantes en el flujo normal
        if (indicePreguntaActual < TOTAL_PREGUNTAS - 1) {
            // Si no es la última pregunta, avanzar al siguiente índice
            indicePreguntaActual++;
            mostrarPregunta(indicePreguntaActual); // Mostrar la nueva pregunta
        } else {
            // Si es la última pregunta del flujo normal, no hay siguiente
            console.log("Ya estás en la última pregunta.");
            // Asegurarse de que el botón Finalizar reciba el foco para indicar el siguiente paso
            if (btnFinalizar) btnFinalizar.focus();
        }
    }
}

/**
 * Marca la pregunta actual como 'skipped' (pospuesta) en el array `respuestasUsuario` y avanza a la siguiente pregunta en el flujo normal.
 * Solo funciona si no se está en modo revisión.
 */
function posponerPregunta() {
    // Esta acción solo es relevante en el flujo normal, no durante la revisión de pospuestas.
    if (revisandoPospuestas) {
        console.log("Intentando posponer pregunta durante la revisión. Acción ignorada.");
        return; // Salir si estamos revisando pospuestas
    }
    // Validar que el índice actual sea válido
    if (indicePreguntaActual < 0 || indicePreguntaActual >= TOTAL_PREGUNTAS) {
         console.warn("Intento de posponer pregunta con índice inválido.");
         return;
    }

    console.log(`Pospuesta pregunta ${indicePreguntaActual + 1}.`);
    // Marcar la respuesta de la pregunta actual como 'skipped'
    respuestasUsuario[indicePreguntaActual] = 'skipped';

    // Actualizar la interfaz:
    actualizarNavegacion(); // Cambiar el estilo del item en la sidebar a pospuesta
    actualizarProgreso(); // Actualizar el conteo de preguntas pospuestas en el texto de progreso

    // --- Navegar a la siguiente pregunta en el flujo normal ---
    // Verificar si hay una siguiente pregunta en el flujo normal
    if (indicePreguntaActual < TOTAL_PREGUNTAS - 1) {
        indicePreguntaActual++; // Avanzar al siguiente índice
        mostrarPregunta(indicePreguntaActual); // Mostrar la nueva pregunta
    } else {
        // Si es la última pregunta del flujo normal, no hay siguiente, solo queda finalizar
        console.log("Pospuesta la última pregunta normal. Queda finalizar.");
        verificarUltimaPregunta(); // Asegurar que el botón Siguiente esté oculto y Finalizar visible
        if (btnFinalizar) btnFinalizar.focus(); // Enfocar botón Finalizar
    }
}

/**
 * Navega a una pregunta específica haciendo clic en su item en la barra lateral o usando teclado.
 * Guarda la respuesta actual antes de cambiar de pregunta.
 * Ajusta el estado del modo revisión si se navega fuera de la secuencia de pospuestas.
 * @param {number} index - El índice (base 0) de la pregunta a la que se desea ir.
 */
 function irAPregunta(index) {
    // Validar: quiz activo, índice válido, y no intentar ir a la pregunta actual (evita recargar innecesariamente)
    if (!quizActivo || index < 0 || index >= TOTAL_PREGUNTAS || index === indicePreguntaActual) {
        if (index === indicePreguntaActual) console.log(`Ya estás en la pregunta ${index + 1}.`);
        else console.warn(`Intento de navegar a pregunta inválida o con quiz inactivo: ${index + 1}`);
        return;
    }
    console.log(`Navegando a pregunta ${index + 1}...`);

    // Guardar la respuesta seleccionada en la pregunta actual ANTES de cambiar de pregunta
    guardarRespuestaActual();

    // --- Lógica relacionada con el Modo Revisión ---
    // Si estábamos revisando preguntas pospuestas Y la pregunta a la que vamos NO está en la lista de pospuestas
    if (revisandoPospuestas && !indicesPospuestas.includes(index)) {
        console.log("Saliendo del modo revisión al navegar a una pregunta no pospuesta.");
        revisandoPospuestas = false; // Salir del modo revisión
        if (btnFinalizar) btnFinalizar.textContent = 'Finalizar'; // Restaurar texto del botón Finalizar
        // No ajustar `indiceActualPospuesta` aquí, ya que hemos salido de ese flujo
    }

    // Si estamos en modo revisión, pero la pregunta a la que vamos SÍ está en la lista de pospuestas
    if (revisandoPospuestas) {
         // Buscar el índice de la pregunta dentro del array de `indicesPospuestas`
         const indiceEnRevision = indicesPospuestas.indexOf(index);
         if (indiceEnRevision !== -1) {
              // Si se encuentra, actualizar `indiceActualPospuesta` para seguir la secuencia desde aquí
              indiceActualPospuesta = indiceEnRevision;
              console.log(`Actualizado índice de revisión a ${indiceActualPospuesta + 1} dentro de las pospuestas.`);
         } else {
              // Esto no debería ocurrir si la lógica anterior es correcta, pero como seguridad:
              console.warn("Error lógico: Revisando pospuestas pero navegando a índice no encontrado en indicesPospuestas. Saliendo de revisión.");
              revisandoPospuestas = false;
              if(btnFinalizar) btnFinalizar.textContent = 'Finalizar';
         }
    }

    // --- Mostrar la Nueva Pregunta ---
    indicePreguntaActual = index; // Actualizar el índice de la pregunta actual
    mostrarPregunta(indicePreguntaActual); // Renderizar la pregunta correspondiente

    // --- Actualizar UI ---
    // verificarUltimaPregunta(); // No es estrictamente necesario aquí si `mostrarPregunta` ya lo llama, pero puede ser redundante seguro. `mostrarPregunta` ya lo hace.
 }

/**
 * Actualiza las clases CSS y atributos ARIA de los elementos de navegación lateral (`#question-nav div`).
 * Esto cambia su color y apariencia según el estado de la respuesta (respondida, pospuesta, sin responder, activa).
 * También se usa para mostrar el estado final (correcto, incorrecto) en la pantalla de resultados.
 * @param {boolean} [esResultadoFinal=false] - Indica si la actualización es para mostrar resultados finales.
 * @param {object|null} [datosResultados=null] - Objeto con los datos de resultados si `esResultadoFinal` es true.
 */
function actualizarNavegacion(esResultadoFinal = false, datosResultados = null) {
    // Verificar si el contenedor de navegación existe
    if (!contNavegacion) {
        console.warn("Contenedor de navegación (#question-nav) no encontrado para actualizar.");
        return;
    }
    // Seleccionar todos los divs dentro de la sidebar
    const itemsNav = contNavegacion.querySelectorAll('div');

    // Iterar sobre cada elemento de navegación (div)
    itemsNav.forEach((itemNav, index) => {
        itemNav.className = ''; // Limpiar todas las clases de estado CSS previas
        itemNav.dataset.number = index + 1; // Asegurar que el atributo data-number esté correcto

        let sufijoAria = ''; // Sufijo para el atributo aria-label
        let clasesEstado = []; // Array para acumular las clases CSS de estado

        // --- Lógica para Resultados Finales ---
        if (esResultadoFinal && datosResultados?.details?.[index]) {
            // Si estamos mostrando resultados finales y hay datos para esta pregunta
            const estadoResultado = datosResultados.details[index].status || 'skipped'; // Obtener el estado (correct, incorrect, skipped)
            clasesEstado.push(`result-${estadoResultado}`); // Añadir clase CSS específica para resultados

            // Ajustar atributos para la vista de resultados:
            sufijoAria = `: ${estadoResultado}`; // Actualizar aria-label con el estado final
            // Deshabilitar la navegación haciendo click o teclado en la vista de resultados
            itemNav.onclick = null;
            itemNav.onkeydown = null;
            itemNav.removeAttribute('tabindex'); // Eliminar tabindex para que no sea enfocable

        }
        // --- Lógica para el Quiz Activo ---
        else if (quizActivo) {
            // Si el quiz está activo (no en resultados finales)
            const respuesta = respuestasUsuario[index]; // Obtener la respuesta guardada para esta pregunta

            // Determinar las clases de estado y el sufijo ARIA basado en la respuesta
            if (respuesta === 'skipped') {
                clasesEstado.push('skipped');
                sufijoAria = ' (pospuesta)';
            } else if (respuesta !== null) { // Si hay alguna respuesta guardada (no null)
                clasesEstado.push('answered');
                sufijoAria = ' (respondida)';
            } else { // Si la respuesta es null (sin responder)
                clasesEstado.push('unanswered');
            }

            // Añadir la clase 'active' si este item corresponde a la pregunta que se está mostrando actualmente
            if (index === indicePreguntaActual) {
                clasesEstado.push('active');
            }

            // Asegurarse de que los eventos de navegación estén asignados (importante si se limpiaron con className='')
            // Asignar evento click para ir a la pregunta
            itemNav.onclick = () => irAPregunta(index);
            // Asignar evento keydown para navegación con teclado
            itemNav.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    irAPregunta(index);
                }
            };
            itemNav.setAttribute('tabindex', '0'); // Asegurar que sea enfocable

        } else {
             // Si el quiz no está activo y no estamos en resultados finales (ej. en la pantalla de bienvenida después de un quiz)
             // Podríamos querer asegurar que no tengan clases de estado de quiz activo o eventos de navegación
             clasesEstado.push('unanswered'); // O un estado neutro si tienes uno
             sufijoAria = '';
             itemNav.onclick = null; // Desactivar click
             itemNav.onkeydown = null; // Desactivar teclado
             itemNav.removeAttribute('tabindex'); // No enfocable
        }

        // --- Aplicar Clases y Atributos ---
        // Si hay clases de estado para aplicar, añadirlas al elemento
        if (clasesEstado.length > 0) {
            itemNav.classList.add(...clasesEstado); // Usa spread operator para añadir múltiples clases
        }

        // Actualizar el atributo aria-label para accesibilidad
        itemNav.setAttribute('aria-label', `Pregunta ${index + 1}${sufijoAria}`);
    });
    console.log("Navegación lateral actualizada.");
}

/**
 * Actualiza visualmente la barra de progreso y el texto que muestra el progreso numérico.
 * Calcula el número de preguntas respondidas y pospuestas.
 */
function actualizarProgreso() {
    // Solo actualizar si el quiz está activo y el contenedor de navegación existe (indica que el quiz está renderizado)
    if (!quizActivo || !contNavegacion) {
         console.log("No se actualiza progreso: Quiz inactivo o navegación no renderizada.");
         return;
    }
    console.log("Actualizando progreso...");

    // Contar preguntas respondidas (valor no null y no 'skipped')
    const respondidas = respuestasUsuario.filter(r => r !== null && r !== 'skipped').length;
    // Contar preguntas pospuestas/omitidas ('skipped')
    const pospuestas = respuestasUsuario.filter(r => r === 'skipped').length;
    // El total de preguntas 'completadas' (respondidas + pospuestas)
    const completadas = respondidas + pospuestas;

    // Calcular el porcentaje de progreso (basado en 'completadas' sobre el total)
    // Evitar división por cero si no hay preguntas
    const porcentaje = TOTAL_PREGUNTAS > 0 ? Math.round((completadas / TOTAL_PREGUNTAS) * 100) : 0;

    // --- Actualizar la Barra de Progreso Visual ---
    // Verificar si el elemento de la barra de progreso existe antes de modificar su estilo
    if (barraProgreso) {
        barraProgreso.style.width = `${porcentaje}%`; // Establecer el ancho de la barra
    } else {
        console.warn("Elemento 'barraProgreso' no encontrado.");
    }

    // --- Actualizar el Texto de Progreso ---
    // Verificar si el contenedor de texto de progreso y su label existen
    if (textoProgreso && labelTextoProgreso) {
        // Actualizar el texto del label con el porcentaje
        labelTextoProgreso.textContent = `Progreso (${porcentaje}%):`;

        // Encontrar el nodo de texto dentro del contenedor que muestra el conteo numérico
        // Se usa `Array.from(textoProgreso.childNodes)` porque textContent afectaría todo el contenido,
        // incluyendo el span del label. Buscamos el nodo de tipo texto.
        const nodoTexto = Array.from(textoProgreso.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
        if(nodoTexto) {
            // Actualizar el contenido del nodo de texto con el conteo de respondidas y pospuestas
            nodoTexto.nodeValue = ` ${respondidas} Resp / ${pospuestas} Posp`;
        } else {
            console.warn("Nodo de texto numérico de progreso no encontrado.");
            // Fallback: si no se encuentra el nodo exacto, poner todo en el contenedor principal (menos ideal)
            // textoProgreso.textContent = `Progreso (${porcentaje}%): ${respondidas} Resp / ${pospuestas} Posp`;
        }
    } else {
        console.warn("Elementos de texto de progreso no encontrados.");
    }

    // --- Actualizar Atributo ARIA para Accesibilidad ---
    const contProgreso = document.querySelector('.progress-container');
     if (contProgreso) {
         // Actualizar el valor actual del progreso para tecnologías de asistencia
         contProgreso.setAttribute('aria-valuenow', porcentaje);
         // Los atributos aria-valuemin="0" y aria-valuemax="100" ya están en el HTML
     } else {
         console.warn("Contenedor de progreso para ARIA no encontrado.");
     }
    console.log(`Progreso: ${completadas}/${TOTAL_PREGUNTAS} (${porcentaje}%) - ${respondidas} respondidas, ${pospuestas} pospuestas.`);
}

/**
 * Verifica si la pregunta actual es la última en el flujo (normal o de revisión).
 * Ajusta la visibilidad y texto de los botones "Siguiente", "Posponer" y "Finalizar".
 * - El botón "Siguiente" se oculta en la última pregunta.
 * - El botón "Posponer" se oculta durante el modo de revisión.
 * - El botón "Finalizar" siempre está visible pero su texto puede cambiar en modo revisión.
 */
 function verificarUltimaPregunta() {
    // Verificar si los botones necesarios existen
    if(!btnSiguiente || !btnPosponer || !btnFinalizar) {
        console.warn("Faltan elementos de botón para verificar última pregunta.");
        return;
    }
    console.log("Verificando si es la última pregunta...");

    // Determinar si la pregunta actual es la última en el flujo NORMAL
    const esUltimaNormal = !revisandoPospuestas && indicePreguntaActual === TOTAL_PREGUNTAS - 1;

    // Determinar si la pregunta actual es la última en el flujo de REVISIÓN de pospuestas
    // Esto es true si estamos revisando Y el índice actual dentro del array de pospuestas es el último
    const esUltimaRevision = revisandoPospuestas && indiceActualPospuesta === indicesPospuestas.length - 1;

    // --- Controlar Visibilidad de Botones ---
    // Ocultar el botón "Siguiente" si estamos en la última pregunta del flujo normal O en la última de la revisión
    btnSiguiente.classList.toggle('hidden', esUltimaNormal || esUltimaRevision);
    // Ocultar el botón "Posponer" si estamos en modo de revisión
    btnPosponer.classList.toggle('hidden', revisandoPospuestas);

    // El botón "Finalizar" siempre debe estar visible, solo su texto y función cambian (manejado en manejarClicFinalizar)
    // Asegurar que no esté deshabilitado por si alguna lógica previa lo hizo
    btnFinalizar.disabled = false;

    console.log(`Estado de botones: Siguiente oculta=${esUltimaNormal || esUltimaRevision}, Posponer oculta=${revisandoPospuestas}.`);
 }
 // ========================================================================
// ==                 FUNCIONES DE FINALIZACIÓN Y RESULTADOS               ==
// ========================================================================
// Funciones que se ejecutan al terminar el quiz o al revisar resultados.

/**
 * Maneja el clic en el botón "Finalizar" o "Finalizar Revisión".
 * Guarda la respuesta actual, verifica si hay preguntas pendientes (sin responder o pospuestas).
 * Si hay pendientes, pregunta al usuario si desea revisar o finalizar sin revisar.
 * Si no hay pendientes o el usuario elige finalizar, procede a `confirmarYEnviarQuiz`.
 */
function manejarClicFinalizar() {
    console.log("--- Entrando a manejarClicFinalizar ---");
    console.log("Clic en botón Finalizar/Revisión detectado.");
    // Guardar la respuesta actual antes de iniciar el proceso de finalización
    guardarRespuestaActual();

    // --- Lógica basada en si se está revisando pospuestas o no ---
    if (!revisandoPospuestas) {
        // Si NO estamos actualmente en el modo de revisión (flujo normal):
        console.log("No se está revisando pospuestas (flujo normal).");
        // Identificar los índices de las preguntas que están sin responder (null) o pospuestas ('skipped')
        indicesPospuestas = respuestasUsuario.reduce((acc, r, i) => {
            if (r === 'skipped' || r === null) {
                 acc.push(i); // Añadir el índice al array de pospuestas/pendientes
            }
            return acc; // Retornar el acumulador
        }, []); // El valor inicial del acumulador es un array vacío

        // --- Manejo de Preguntas Pendientes ---
        if (indicesPospuestas.length > 0) {
            // Si se encontraron preguntas pendientes:
            console.log(`Se encontraron ${indicesPospuestas.length} preguntas pendientes.`);
            // Mostrar un modal de confirmación preguntando si el usuario quiere revisar
            mostrarModal(
                'confirm', // Tipo de modal: confirmación (Sí/No)
                'Preguntas Pendientes', // Título del modal
                `Tienes ${indicesPospuestas.length} pregunta(s) sin responder o pospuesta(s).\n¿Quieres revisarlas ahora?`, // Mensaje del modal
                (confirmadoRevision) => {
                    // Este es el callback que se ejecuta después de que el usuario clickea en el modal
                    console.log(`[Callback Modal Pendientes] Confirmado Revisión: ${confirmadoRevision}`);
                    if (confirmadoRevision) {
                        // Si el usuario confirmó que desea revisar:
                        console.log("Usuario eligió revisar pendientes. Iniciando revisión...");
                        revisandoPospuestas = true; // Activar el modo revisión
                        indiceActualPospuesta = 0; // Empezar desde el principio del array de pospuestas
                        if (btnFinalizar) btnFinalizar.textContent = 'Finalizar Revisión'; // Cambiar texto del botón
                        verificarUltimaPregunta(); // Ajustar visibilidad de botones (Posponer se oculta, Siguiente aparece/desaparece según revisión)
                        // Navegar a la primera pregunta pendiente en la lista
                        irAPregunta(indicesPospuestas[indiceActualPospuesta]);
                    } else {
                        // Si el usuario eligió NO revisar (quiere finalizar sin revisar):
                        console.log("Usuario eligió finalizar sin revisar pendientes.");
                        // Proceder a la confirmación final y envío del quiz, indicando que se saltó la revisión
                        confirmarYEnviarQuiz(true); // Pasar `true` para indicar que se saltó la revisión
                    }
                }
            );
        } else {
            // Si NO se encontraron preguntas pendientes:
            console.log("No hay preguntas pendientes. Procediendo a finalización.");
            // Proceder directamente a la confirmación final y envío del quiz
            confirmarYEnviarQuiz(false); // Pasar `false` porque no hay pendientes ni se saltó revisión
        }
    } else {
        // Si SÍ estamos actualmente en el modo de revisión de pospuestas:
        console.log("Se está revisando pospuestas. Procediendo a confirmación final.");
        // El usuario ya está revisando y ha clickeado "Finalizar Revisión".
        // Esto significa que desea finalizar el quiz, incluso si no ha terminado de revisar todas las pospuestas.
        // Proceder a la confirmación final y envío del quiz
        confirmarYEnviarQuiz(false); // No se saltó revisión (ya estaba en ella), solo confirma finalizar
    }
    console.log("--- Saliendo de manejarClicFinalizar ---");
}

/**
 * Maneja el clic en el enlace "Finalizar cuestionario de forma anticipada".
 * Muestra un modal de confirmación antes de finalizar el quiz inmediatamente.
 * Si se confirma, detiene timers, marca preguntas sin responder como omitidas y muestra resultados.
 * @param {Event} e - El evento de click.
 */
function manejarClicFinalizarAnticipado(e) {
    if (e) e.preventDefault(); // Prevenir la acción por defecto del enlace (navegar a #)
    console.log("Clic en Finalizar Anticipado detectado.");

    // Mostrar un modal de confirmación específico para la finalización anticipada
    mostrarModal(
        'confirm', // Tipo de modal: confirmación
        'Finalizar Anticipadamente', // Título
        '¿Seguro que quieres finalizar AHORA?\nLas preguntas sin responder se marcarán automáticamente como omitidas.', // Mensaje (usa \n para salto de línea)
        (confirmado) => {
            // Este callback se ejecuta después de que el usuario clickea en el modal
            console.log(`[Callback Modal Finalizar Anticipado] Confirmado: ${confirmado}`);
            if (confirmado) {
                // Si el usuario confirmó la finalización anticipada:
                console.log("Usuario confirmó finalización anticipada. Deteniendo timers y calculando resultados...");
                detenerTimers(); // Detener ambos temporizadores inmediatamente
                // Antes de calcular resultados, asegurarse de que cualquier pregunta `null` (sin responder) se marque como 'skipped'
                respuestasUsuario = respuestasUsuario.map(r => r === null ? 'skipped' : r);
                // Proceder a calcular y mostrar los resultados finales
                calcularYMostrarResultados();
            } else {
                // Si el usuario canceló la finalización anticipada
                console.log("Usuario canceló finalización anticipada.");
                // Opcional: devolver el foco al enlace si es relevante
                // if (btnFinalizarAnticipado) btnFinalizarAnticipado.focus();
            }
        }
    );
}

/**
 * Muestra un modal de confirmación final antes de enviar las respuestas y mostrar los resultados.
 * Ajusta el mensaje del modal según si hay preguntas pendientes o si se está en revisión.
 * Si el usuario confirma en el modal, detiene los timers, asegura que las respuestas null sean skipped,
 * y llama a `calcularYMostrarResultados`.
 * @param {boolean} saltoRevision - Indica si el usuario llegó aquí tras elegir NO revisar pendientes.
 */
function confirmarYEnviarQuiz(saltoRevision) {
    console.log(`--- [confirmarYEnviarQuiz] Iniciando (saltoRevision: ${saltoRevision}) ---`);
    // Asegurar que la respuesta de la pregunta actual esté guardada antes de cualquier lógica de finalización
    guardarRespuestaActual();

    // Contar cuántas preguntas aún están sin responder (null) o marcadas como 'skipped'
    const pendientes = respuestasUsuario.filter(r => r === null || r === 'skipped').length;

    // --- Construir el Mensaje del Modal de Confirmación Final ---
    let mensaje = "¿Enviar tus respuestas y finalizar el cuestionario?"; // Mensaje por defecto
    let titulo = "Finalizar Cuestionario"; // Título por defecto

    if (pendientes > 0 && saltoRevision) {
        // Si hay pendientes Y el usuario eligió saltar la revisión
        mensaje = `Vas a finalizar sin revisar ${pendientes} pregunta(s) pendiente(s).\n¿Continuar de todos modos?`;
        titulo = "Confirmar Finalización";
    } else if (pendientes > 0 && revisandoPospuestas) {
         // Si hay pendientes Y estamos en medio de la revisión de pospuestas
         // Calcular cuántas preguntas quedan en la lista de revisión a partir del índice actual
        const restantesEnRevision = indicesPospuestas.slice(indiceActualPospuesta).length;
        mensaje = `Aún tienes ${restantesEnRevision} pregunta(s) pendiente(s) en esta revisión.\n¿Finalizar de todos modos?`;
        titulo = "Finalizar Revisión Incompleta";
    } else if (revisandoPospuestas) {
        // Si estamos en modo revisión, pero ya no hay pendientes en la lista de pospuestas (debería ser raro llegar aquí con pendientes > 0)
        // O si solo se quiere confirmar la salida de la revisión.
        mensaje = "¿Finalizar la revisión y enviar tus respuestas?";
        titulo = "Finalizar Revisión";
    }
    // Si pendientes es 0 y no estamos revisando pospuestas, se usa el mensaje y título por defecto.

    console.log(`[confirmarYEnviarQuiz] Mensaje Modal: "${mensaje}"`);
    console.log(`[confirmarYEnviarQuiz] Llamando a mostrarModal...`);

    // Mostrar el modal de confirmación final.
    // La función crítica para calcular y mostrar resultados se llama DENTRO del callback,
    // garantizando que solo se ejecute si el usuario confirma en el modal.
    mostrarModal('confirm', titulo, mensaje, (confirmado) => {
        // --- Inicio del Callback del Modal de Confirmación Final ---
        console.log(`--- [Callback Modal Final] Ejecutado. Confirmado: ${confirmado} ---`);
        if (confirmado) {
            // Si el usuario CONFIRMÓ en el modal:
            console.log("[Callback Modal Final] CONFIRMADO. Procediendo a finalizar...");
            try {
                // Detener los temporizadores (es crucial detenerlos aquí una vez confirmada la finalización)
                detenerTimers();
                // Antes de calcular, asegurar que todas las preguntas que sigan siendo `null` se marquen como 'skipped'.
                // Esto es importante si el usuario finalizó anticipadamente o saltó la revisión.
                respuestasUsuario = respuestasUsuario.map(r => r === null ? 'skipped' : r);
                // Llamar a la función para realizar los cálculos finales y mostrar la interfaz de resultados.
                calcularYMostrarResultados();
                console.log("[Callback Modal Final] calcularYMostrarResultados LLAMADO.");
            } catch (error) {
                // Si ocurre algún error durante el proceso de finalización o al mostrar resultados
                console.error("[Callback Modal Final] Error durante la finalización:", error);
                // Mostrar un modal de alerta genérico al usuario
                 mostrarModal('alert', 'Error', 'Ocurrió un error inesperado al finalizar el cuestionario.');
            }
        } else {
            // Si el usuario CANCELÓ en el modal:
            console.log("[Callback Modal Final] CANCELADO.");
            // Si el usuario canceló mientras estaba en modo revisión, intentar devolver el foco al botón Finalizar Revisión
            if (revisandoPospuestas) {
                console.log("[Callback Modal Final] Cancelado durante revisión, devolviendo foco.");
                if (btnFinalizar) btnFinalizar.focus(); // Devolver el foco al botón
            }
            // Si canceló la confirmación normal, simplemente no se hace nada más y el quiz sigue en el estado actual.
        }
        // --- Fin del Callback del Modal de Confirmación Final ---
    });

    console.log("[confirmarYEnviarQuiz] Llamada a mostrarModal realizada (esperando respuesta del usuario).");
}

/**
 * Calcula el número final de respuestas correctas, incorrectas y omitidas
 * comparando las `respuestasUsuario` con las respuestas correctas en `PREGUNTAS`.
 * Luego, llama a `mostrarResultadosUI` para actualizar la interfaz.
 */
function calcularYMostrarResultados() {
    console.log("--- Entrando a calcularYMostrarResultados ---");
    console.log("Calculando Resultados...");

    // Asegurarse de que el quiz esté inactivo y los timers detenidos antes de calcular
    quizActivo = false;
    detenerTimers(); // Llama a detenerTimers por si acaso no se hizo antes (ej. por tiempo agotado)

    let correctas = 0;     // Contador de respuestas correctas
    let incorrectas = 0;   // Contador de respuestas incorrectas
    let omitidas = 0;      // Contador de preguntas omitidas/sin responder

    const resultadosDetallados = []; // Array para almacenar el resumen de cada pregunta para la lista detallada

    // Iterar sobre cada pregunta en el array PREGUNTAS para comparar con las respuestas del usuario
    PREGUNTAS.forEach((p, i) => {
        // Obtener la respuesta del usuario para esta pregunta.
        // En este punto, `respuestasUsuario[i]` debería ser 'A', 'B', 'C', o 'skipped'.
        // Los `null` ya deberían haber sido convertidos a 'skipped' si correspondía.
        const respUsuario = respuestasUsuario[i];
        const respCorrecta = p.answer; // Obtener la respuesta correcta de los datos de la pregunta

        let estado = 'skipped'; // Estado por defecto si no se cumplen otras condiciones

        // --- Determinar el Estado de la Respuesta ---
        if (respUsuario === respCorrecta) {
            correctas++; // Incrementar contador de correctas
            estado = 'correct'; // Marcar estado como correcto
        } else if (respUsuario !== 'skipped') { // Si la respuesta no es 'skipped' (implica que es una letra, pero incorrecta)
            incorrectas++; // Incrementar contador de incorrectas
            estado = 'incorrect'; // Marcar estado como incorrecto
        } else { // Si la respuesta es 'skipped' (o aún fuera null, aunque `confirmarYEnviarQuiz` intenta evitarlo)
            omitidas++; // Incrementar contador de omitidas
            estado = 'skipped'; // Marcar estado como skipped
        }

        // --- Guardar Datos Detallados para la UI ---
        // Crear un objeto con los detalles de esta pregunta para mostrar en la lista de resultados
        resultadosDetallados.push({
            questionIndex: i + 1, // Número de pregunta (base 1)
            questionText: p.question, // Texto de la pregunta
            userAnswer: respUsuario, // Respuesta que dio el usuario ('A', 'B', 'C', 'skipped')
            correctAnswer: respCorrecta, // Respuesta correcta ('A', 'B', 'C')
            status: estado, // Estado del resultado ('correct', 'incorrect', 'skipped')
            options: p.options || [] // Opciones originales para poder mostrar el texto de la respuesta
        });
    });

    // Calcular el porcentaje final de respuestas correctas
    // Evitar división por cero si no hay preguntas
    const porcentaje = TOTAL_PREGUNTAS > 0 ? Math.round((correctas / TOTAL_PREGUNTAS) * 100) : 0;

    // --- Preparar Objeto de Datos de Resultados ---
    // Crear un objeto que contenga todos los datos necesarios para mostrar en la UI de resultados
    const datosResultados = {
        totalQuestions: TOTAL_PREGUNTAS,
        correct: correctas,
        incorrect: incorrectas,
        skipped: omitidas,
        percentage: porcentaje,
        details: resultadosDetallados // Incluir el array con los detalles por pregunta
    };

    console.log("Resultados Calculados:", datosResultados);

    // Llamar a la función para actualizar la interfaz y mostrar la pantalla de resultados
    mostrarResultadosUI(datosResultados);
    console.log("--- Saliendo de calcularYMostrarResultados ---");
}

/**
 * Actualiza la interfaz para ocultar los elementos del quiz y mostrar la pantalla de resultados finales.
 * Llena los contadores, la lista detallada y el gráfico (si Chart.js está disponible) con los datos proporcionados.
 * @param {object} data - El objeto con los datos de resultados calculados (viene de `calcularYMostrarResultados`).
 */
function mostrarResultadosUI(data) {
    console.log("--- [mostrarResultadosUI] Iniciando... ---");

    // Asegurarse de que el quiz esté marcado como inactivo y los timers detenidos
    quizActivo = false;
    detenerTimers(); // Llamada redundante pero segura

    // --- Ocultar Elementos de la Interfaz del Quiz Activo ---
    console.log("[mostrarResultadosUI] Ocultando elementos del quiz...");
    try {
        // Ocultar el encabezado del quiz (título, timers, progreso)
        if (elementoHeader) {
             elementoHeader.style.display = 'none';
             console.log("... header oculto.");
        } else console.warn("headerElement no encontrado para ocultar.");

        // Ocultar el área donde se mostraban las preguntas
        if (contPregunta) {
             contPregunta.style.display = 'none';
             console.log("... contPregunta oculto.");
        } else console.warn("contPregunta no encontrado para ocultar.");

        // Ocultar el contenedor de botones (Siguiente, Posponer, Finalizar)
        if (contBotonesQuiz) {
             contBotonesQuiz.style.display = 'none';
             console.log("... contBotonesQuiz oculto.");
        } else console.warn("contBotonesQuiz no encontrado para ocultar.");

        // Ocultar el enlace para finalizar anticipadamente
        const linkFinAnticipado = document.getElementById('early-finish-container');
        if (linkFinAnticipado) {
             linkFinAnticipado.style.display = 'none';
             console.log("... linkFinAnticipado oculto.");
        } else console.warn("early-finish-container no encontrado para ocultar.");

        // Ocultar la barra lateral de navegación
        if (contNavegacion) {
             contNavegacion.style.display = 'none';
             console.log("... contNavegacion (sidebar) oculto.");
             // Aunque se oculte, podríamos actualizar sus clases para reflejar el estado final en caso de que se muestre más tarde
        } else console.warn("contNavegacion no encontrado para ocultar.");

        // Opcional: Remover la clase 'visible' del contenedor principal del quiz si se usaba para control de display (el display: none ya lo hace)
        // if (contenedorQuiz) contenedorQuiz.classList.remove('visible');

    } catch(error) {
        console.error("[mostrarResultadosUI] Error al ocultar elementos del quiz:", error);
        // Continuar a pesar del error si el contenedor de resultados existe
    }


    // --- Mostrar y Llenar el Contenedor de Resultados ---
    if (contResultados) {
        // Asegurar que el contenedor de resultados esté visible
        contResultados.style.display = 'block';
        console.log("[mostrarResultadosUI] Contenedor de resultados MOSTRADO.");

        // Enfocar el título de la sección de resultados para mejorar la accesibilidad con teclado
        const tituloResultados = contResultados.querySelector('h2');
        // Usar requestAnimationFrame para posponer el enfoque hasta que el navegador termine de renderizar los cambios
        requestAnimationFrame(() => {
             if(tituloResultados) {
                 // Añadir tabindex="-1" temporalmente si no lo tiene para hacerlo enfocable programáticamente
                 if (!tituloResultados.hasAttribute('tabindex')) tituloResultados.setAttribute('tabindex', '-1');
                 tituloResultados.focus({ preventScroll: true }); // Enfocar sin desplazar la ventana
                 // Opcional: remover tabindex después de enfocar si no se necesita mantener enfocable
                 // setTimeout(() => tituloResultados.removeAttribute('tabindex'), 0);
             } else console.warn("Título de resultados no encontrado para enfocar.");
        });
    } else {
        // Si el contenedor de resultados CRÍTICO no se encontró, mostrar un mensaje de error básico
        console.error("CRITICAL: ¡Contenedor de resultados (#results-container) no encontrado! No se pueden mostrar los resultados en la página.");
        // Fallback: mostrar resultados en un alert (muy básico)
        alert(`¡Cuestionario finalizado!\nResultados:\nCorrectas: ${data.correct}\nIncorrectas: ${data.incorrect}\nOmitidas: ${data.skipped}\nPuntaje: ${data.percentage}%`);
        return; // Detener la ejecución de esta función si no se puede mostrar la UI de resultados
    }

    // --- Llenar Datos del Resumen ---
    console.log("[mostrarResultsUI] Llenando datos del resumen...");
    try {
        // Obtener referencias a los spans donde se muestran los conteos y el porcentaje
        const elCorrectas = document.getElementById('correct-count');
        const elIncorrectas = document.getElementById('incorrect-count');
        const elOmitidas = document.getElementById('skipped-count');
        const elPorcentaje = document.getElementById('score-percentage');

        // Actualizar el texto de cada elemento con los datos calculados
        if (elCorrectas) elCorrectas.textContent = data.correct; else console.warn("Elemento correct-count no encontrado.");
        if (elIncorrectas) elIncorrectas.textContent = data.incorrect; else console.warn("Elemento incorrect-count no encontrado.");
        if (elOmitidas) elOmitidas.textContent = data.skipped; else console.warn("Elemento skipped-count no encontrado.");
        if (elPorcentaje) elPorcentaje.textContent = `${data.percentage}%`; else console.warn("Elemento score-percentage no encontrado.");

    } catch (error) {
        console.error("[mostrarResultsUI] Error al llenar datos del resumen:", error);
    }

    // --- Llenar la Lista Detallada de Resultados ---
    console.log("[mostrarResultsUI] Llenando lista detallada...");
    try {
        const listaDetallada = document.getElementById('detailed-results-list');
        if (listaDetallada) {
            listaDetallada.innerHTML = ''; // Limpiar cualquier contenido previo

            // Verificar si hay detalles de preguntas disponibles
            if (data.details?.length > 0) {
                // Iterar sobre cada objeto de detalle de pregunta
                data.details.forEach(item => {
                    const divResultado = document.createElement('div'); // Crear un div para cada item de resultado
                    // Asignar clases CSS basadas en el estado (correct, incorrect, skipped) para aplicar estilos (ej. color del borde izquierdo)
                    divResultado.className = `result-item ${item.status || 'skipped'}`; // Usar 'skipped' como fallback

                    // --- Generar Texto para la Respuesta del Usuario ---
                    let textoRespUsuario = 'Omitida / Sin responder'; // Texto por defecto para omitidas o null
                    const letraUsuario = item.userAnswer; // Letra de la respuesta del usuario
                    const opciones = item.options || []; // Array de opciones de la pregunta actual

                    // Si el usuario respondió algo que no es 'skipped' o null
                    if (letraUsuario !== 'skipped' && letraUsuario !== null) {
                        // Convertir la letra de opción a un índice (A=0, B=1, etc.)
                        const idx = letraUsuario?.charCodeAt(0) - 65;
                        // Verificar que el índice sea válido y corresponda a una opción existente
                        if (letraUsuario && typeof letraUsuario === 'string' && idx >= 0 && idx < opciones.length) {
                             // Construir el texto mostrando la letra y el contenido de la opción
                             textoRespUsuario = `<span class="option-letter">${letraUsuario}.</span> ${opciones[idx]}`;
                        } else {
                             // Si la letra guardada es inválida (ej. 'Z')
                             textoRespUsuario = `Respuesta inválida guardada (${letraUsuario || 'ninguna'})`;
                             console.warn(`Respuesta inválida '${letraUsuario}' guardada para P${item.questionIndex}.`);
                        }
                    } else {
                         // Confirmar que el texto sea 'Pospuesta / Omitida' si el estado es skipped/null
                         textoRespUsuario = 'Pospuesta / Omitida';
                    }

                    // --- Generar Texto para la Respuesta Correcta (si es incorrecta la del usuario) ---
                    const letraCorrecta = item.correctAnswer; // Letra de la respuesta correcta
                    const idxCorrecta = letraCorrecta?.charCodeAt(0) - 65; // Índice de la respuesta correcta
                    let textoRespCorrectaHTML = ''; // Inicializar HTML para la respuesta correcta

                    // Solo mostrar la respuesta correcta si la respuesta del usuario fue incorrecta
                    if (item.status === 'incorrect') {
                         let textoCorrecta = `Correcta no disponible`; // Texto por defecto si la respuesta correcta es inválida
                         // Verificar que la letra de la respuesta correcta sea válida y corresponda a una opción existente
                         if (letraCorrecta && typeof letraCorrecta === 'string' && idxCorrecta >=0 && idxCorrecta < opciones.length) {
                              // Construir el texto mostrando la letra y el contenido de la opción correcta
                              textoCorrecta = `<span class="option-letter">${letraCorrecta}.</span> ${opciones[idxCorrecta]}`;
                         } else {
                             console.warn(`Respuesta correcta inválida '${letraCorrecta}' para P${item.questionIndex}.`);
                         }
                         // Construir el HTML para mostrar la respuesta correcta
                         textoRespCorrectaHTML = `<p class="correct-answer">Respuesta correcta: <span>${textoCorrecta}</span></p>`;
                    }


                    // --- Construir el HTML Completo del Item de Resultado ---
                    divResultado.innerHTML = `
                    <p class="question-text"><strong>${item.questionIndex}.</strong> ${item.questionText || '?'}</p>
                    <p class="user-answer ${item.status || 'skipped'}">Tu respuesta: <span>${textoRespUsuario}</span></p>
                    ${textoRespCorrectaHTML} `;

                    // Añadir el item de resultado creado a la lista detallada en el DOM
                    listaDetallada.appendChild(divResultado);
                });
            } else {
                 // Si no hay detalles de preguntas (ej. quiz con 0 preguntas), mostrar un mensaje
                 listaDetallada.innerHTML = '<p>No hay detalles disponibles para mostrar.</p>';
            }
        } else { console.warn("Contenedor 'detailed-results-list' no encontrado.");}

    } catch (error) {
        console.error("[mostrarResultsUI] Error al llenar lista detallada:", error);
        // Mostrar un mensaje de error en el contenedor si algo falla
        if (listaDetallada) listaDetallada.innerHTML = `<p style="color:red; padding: 20px;">Error al mostrar los detalles por pregunta.</p>`;
    }

    // --- Actualizar Estado Final de la Sidebar (aunque esté oculta) ---
    // Esto es útil por si decides hacer que la sidebar sea visible en la pantalla de resultados
    if (contNavegacion) {
        actualizarNavegacion(true, data); // Llama a la función con esResultadoFinal = true y los datos
    } else {
         console.warn("Contenedor de navegación no encontrado para actualizar estado final.");
    }


    // --- Mostrar el Gráfico de Resultados ---
    console.log("[mostrarResultsUI] Intentando mostrar gráfico...");
    mostrarGrafico(data); // Llama a la función que maneja Chart.js

    console.log("[mostrarResultsUI] UI de resultados actualizada exitosamente.");
} // Fin de la función mostrarResultadosUI

/**
 * Intenta inicializar y mostrar el gráfico de resultados usando Chart.js.
 * Verifica si la librería Chart.js está disponible.
 * Crea un gráfico de dona con la distribución de respuestas (correctas, incorrectas, omitidas).
 * Oculta el contenedor del gráfico si Chart.js no está disponible o hay un error.
 * @param {object} data - El objeto con los datos de resultados (debe incluir correct, incorrect, skipped).
 */
function mostrarGrafico(data) {
    // Verificar si los contenedores del gráfico y el canvas existen
    if (!contGrafico || !canvasGrafico) {
        console.warn("Elementos para el gráfico (contenedor o canvas) no encontrados.");
        return;
    }

    // Verificar si la librería Chart.js está cargada y disponible globalmente
    if (typeof Chart === 'undefined') {
        console.warn("Librería Chart.js no encontrada. El gráfico no se mostrará.");
        // Ocultar el contenedor si Chart.js no está disponible
        if(contGrafico) contGrafico.style.display = 'none';
        return; // Salir de la función si Chart.js no está listo
    }

    // Usar un pequeño timeout para dar tiempo a que el canvas esté visible y listo para dibujar
    setTimeout(() => {
        try {
            // Destruir cualquier instancia de gráfico previa asociada a este canvas
            if (graficoResultados instanceof Chart) {
                console.log("Destruyendo instancia previa de Chart.js para recrear.");
                graficoResultados.destroy();
                graficoResultados = null; // Limpiar la referencia
            }

            // Obtener el contexto 2D del canvas, necesario para dibujar el gráfico
            const ctx = canvasGrafico.getContext('2d');
            // Verificar que se pudo obtener el contexto
            if (!ctx) {
                throw new Error("No se pudo obtener el contexto 2D del canvas del gráfico.");
            }

            // --- Configurar y Crear el Nuevo Gráfico ---
            console.log("Creando nueva instancia de Chart.js...");
            graficoResultados = new Chart(ctx, {
                type: 'doughnut', // Tipo de gráfico: Dona (donut chart)
                data: {
                    labels: ['Correctas', 'Incorrectas', 'Omitidas'], // Etiquetas para las secciones del gráfico
                    datasets: [{
                        data: [data.correct, data.incorrect, data.skipped], // Datos: conteos de cada categoría
                        backgroundColor: [ // Colores para cada sección
                            'rgba(40, 167, 69, 0.8)',  // Verde para correctas (con algo de transparencia)
                            'rgba(255, 77, 109, 0.8)', // Rojo/Rosa para incorrectas (con algo de transparencia)
                            'rgba(255, 204, 0, 0.8)'   // Amarillo para omitidas (con algo de transparencia)
                        ],
                        borderColor: ['#FFF'], // Color del borde entre secciones (blanco)
                        borderWidth: 2 // Ancho del borde
                    }]
                },
                options: {
                    responsive: true, // El gráfico será responsivo y se ajustará a su contenedor
                    maintainAspectRatio: false, // No mantiene la relación de aspecto, se ajustará al tamaño del contenedor
                    plugins: {
                        legend: {
                            position: 'bottom' // Posición de la leyenda (debajo del gráfico)
                        },
                        title: {
                            display: true, // Mostrar el título del gráfico
                            text: 'Distribución de Respuestas', // Texto del título
                            padding: { bottom: 15 } // Espacio debajo del título
                        }
                    }
                }
            });
            console.log("Gráfico Chart.js creado.");

            // --- Mostrar los Elementos del Gráfico ---
            // Una vez que el gráfico se crea exitosamente, asegurar que su contenedor y canvas sean visibles
            if (contGrafico) contGrafico.style.display = 'block';
            if (canvasGrafico) canvasGrafico.style.display = 'block';

        } catch (error) {
            // Si ocurre un error durante la creación del gráfico (ej. canvas no válido)
            console.error("Error al crear o mostrar gráfico Chart.js:", error);
            // Ocultar los elementos del gráfico si falla
            if(contGrafico) contGrafico.style.display = 'none';
            if(canvasGrafico) canvasGrafico.style.display = 'none';
        }
    }, 150); // Pequeño delay para asegurar que el DOM esté listo tras mostrar resultados
}


// ========================================================================
// ==                  EVENT BINDING & KEYBOARD NAVIGATION               ==
// ========================================================================
// Funciones para asignar manejadores de eventos a elementos interactivos
// y gestionar la navegación con teclado.

/**
 * Asigna los manejadores de eventos `onclick` a los botones principales del quiz
 * (Siguiente, Posponer, Finalizar, Finalizar Anticipado).
 * Esta función se llama una vez que el quiz se inicia (`iniciarCuestionario`).
 */
function asignarEventosQuiz() {
    console.log("Asignando eventos a botones del quiz...");
    // Asignar la función `siguientePregunta` al evento click del botón Siguiente
    // Verificar si el botón existe antes de asignar el evento
    if (btnSiguiente) btnSiguiente.onclick = siguientePregunta; else console.warn("btnSiguiente no encontrado para asignar evento.");

    // Asignar la función `posponerPregunta` al evento click del botón Posponer
    if (btnPosponer) btnPosponer.onclick = posponerPregunta; else console.warn("btnPosponer no encontrado para asignar evento.");

    // Asignar la función `manejarClicFinalizar` al evento click del botón Finalizar
    if (btnFinalizar) btnFinalizar.onclick = manejarClicFinalizar; else console.warn("btnFinalizar no encontrado para asignar evento.");

    // Asignar la función `manejarClicFinalizarAnticipado` al evento click del enlace Finalizar Anticipado
    if (btnFinalizarAnticipado) btnFinalizarAnticipado.onclick = manejarClicFinalizarAnticipado; else console.warn("btnFinalizarAnticipado no encontrado para asignar evento.");

    console.log("Eventos de botones del quiz asignados.");
}

/**
 * Configura un único listener global para eventos de teclado en todo el documento.
 * Este listener maneja atajos de teclado para navegación y acciones (como Escape en modal).
 * Se llama una sola vez al inicio de la aplicación (`iniciarAplicacion`).
 */
function configurarListenersGlobales() {
     console.log("Configurando listener global de teclado...");
     // Remover cualquier listener previo para prevenir duplicados si esta función se llama más de una vez
     document.removeEventListener('keydown', manejarTeclaGlobal);
     // Añadir el listener al documento para capturar eventos de teclado
     document.addEventListener('keydown', manejarTeclaGlobal);
     console.log("Listener global de teclado configurado.");
}

/**
 * Manejador de eventos global para la tecla 'keydown'.
 * Define la lógica para atajos de teclado basados en el estado actual (modal abierto, quiz activo, foco en opciones, etc.).
 * @param {KeyboardEvent} e - El objeto evento de teclado.
 */
function manejarTeclaGlobal(e) {
    // --- Lógica para Modal Abierto ---
    // Verificar si el modal personalizado está visible
    if (modalPersonalizado && modalPersonalizado.getAttribute('aria-hidden') === 'false') {
        // Si el modal está abierto, solo responder a la tecla Escape
        if (e.key === 'Escape') {
            manejarEscapeModal(); // Llamar a la función para manejar la tecla Escape en el modal
            e.preventDefault(); // Prevenir cualquier acción por defecto del navegador para Escape
        }
        // Ignorar otras teclas mientras el modal está abierto
        return;
    }

    // --- Lógica para Quiz No Activo o Resultados Visibles ---
    // Si el quiz no está activo (ej. en pantalla de bienvenida o ya finalizado)
    // O si la sección de resultados está visible, ignorar la mayoría de los atajos de teclado del quiz
    if (!quizActivo || (contResultados && contResultados.style.display === 'block')) {
        return; // Salir de la función
    }

    // --- Identificar el Elemento Enfocado Actualmente ---
    const elActivo = document.activeElement; // Obtener el elemento que tiene el foco en este momento

    // Determinar el tipo de elemento enfocado para aplicar la lógica correcta
    const esInputTexto = elActivo && (elActivo.tagName === 'INPUT' && elActivo.type !== 'radio') || elActivo.tagName === 'TEXTAREA';
    const esOpcion = elActivo && elActivo.type === 'radio' && elActivo.closest('.options li');
    const esBoton = elActivo && (elActivo.tagName === 'BUTTON' || (elActivo.tagName === 'A' && elActivo.getAttribute('role') === 'button')); // Incluir enlaces con rol button
    const esSidebar = elActivo && elActivo.closest('#question-nav div'); // Elementos de navegación en la sidebar

    // Si el foco está en un input de texto o textarea, no interferir con la escritura
    if (esInputTexto) {
        return; // Salir de la función
    }

    // --- Manejo de Teclas ---
    if (esOpcion) {
        // Si el foco está en un input radio dentro de una opción, usar el manejador específico
        manejarTeclaOpcion(e, elActivo); // Llama a una función separada para manejar flechas y selección en opciones
    } else if (!esBoton && !esSidebar) {
        // Si el foco NO está en un botón, sidebar o input de texto/textarea (puede estar en el body, pregunta, etc.)
        // Aplicar atajos globales del quiz:
        if (e.key === 'ArrowRight' && btnSiguiente && !btnSiguiente.classList.contains('hidden')) {
            // Tecla Flecha Derecha: Si el botón Siguiente existe y no está oculto, ir a la siguiente pregunta
            e.preventDefault(); // Prevenir el scroll por defecto con flechas
            siguientePregunta();
        } else if (e.key.toUpperCase() === 'P' && btnPosponer && !btnPosponer.classList.contains('hidden')) {
            // Tecla 'P' (mayús o minús): Si el botón Posponer existe y no está oculto, posponer la pregunta
            e.preventDefault(); // Prevenir acción por defecto (ej. buscar 'p')
            posponerPregunta();
        } else if (e.key === 'Enter') {
             // Tecla Enter: Comportamiento contextual
             e.preventDefault(); // Prevenir acción por defecto
             // Si el botón Siguiente está visible, simular clic en Siguiente
             if (btnSiguiente && !btnSiguiente.classList.contains('hidden')) {
                  siguientePregunta();
             }
             // Si el botón Siguiente está oculto (implica que Finalizar está visible en flujo normal)
             // simular clic en Finalizar (esto podría necesitar un ajuste más preciso si hay otros botones)
             // La lógica actual de verificarUltimaPregunta hace que Siguiente se oculte cuando Finalizar es la opción principal.
             else if (btnFinalizar) {
                  manejarClicFinalizar(); // Llama a la función que maneja la finalización (con confirmación si es necesario)
             }
        }
        // Nota: Navegación con flechas arriba/abajo para opciones se maneja en `manejarTeclaOpcion`.
        // La navegación entre botones con Tab/Shift+Tab es nativa del navegador.
    }
    // Si el foco está en un botón o sidebar, se espera el comportamiento nativo del navegador (Enter/Espacio para activar)
}

/**
 * Maneja los eventos de teclado (principalmente flechas arriba/abajo y Espacio/Enter)
 * cuando el foco está en un input radio dentro de una opción de respuesta.
 * Permite navegar entre opciones con flechas y seleccionar con Espacio/Enter.
 * @param {KeyboardEvent} e - El objeto evento de teclado.
 * @param {HTMLElement} radioActivo - El elemento input radio que actualmente tiene el foco.
 */
function manejarTeclaOpcion(e, radioActivo) {
     // Obtener el elemento <li> que contiene el input radio activo
     const liActual = radioActivo.closest('li');
     if (!liActual) {
         console.warn("Input radio enfocado no encontrado dentro de un LI.");
         return; // Salir si no se encuentra el contenedor LI
     }

     // Obtener una lista de todos los elementos <li> de opción en la pregunta actual
     const todosLi = Array.from(contPregunta.querySelectorAll('.options li'));
     // Encontrar el índice del LI actual dentro de esa lista
     const idxActual = todosLi.indexOf(liActual);

     let radioAEnfocar = null; // Variable para almacenar el input radio al que queremos mover el foco

     // --- Lógica de Navegación con Flechas ---
     if (e.key === 'ArrowDown') {
         // Si se presiona Flecha Abajo: intentar mover el foco al siguiente LI
         if (idxActual < todosLi.length - 1) { // Verificar que no sea el último LI
             radioAEnfocar = todosLi[idxActual + 1].querySelector('input[type="radio"]'); // Obtener el radio del siguiente LI
         }
     } else if (e.key === 'ArrowUp') {
         // Si se presiona Flecha Arriba: intentar mover el foco al LI anterior
         if (idxActual > 0) { // Verificar que no sea el primer LI
             radioAEnfocar = todosLi[idxActual - 1].querySelector('input[type="radio"]'); // Obtener el radio del LI anterior
         }
     }
     // Nota: Las flechas izquierda/derecha en radiogroups a veces navegan entre grupos o hacen scroll.
     // Aquí solo manejamos arriba/abajo para navegación vertical entre opciones.

     // --- Lógica de Selección con Espacio o Enter ---
     else if (e.key === ' ' || e.key === 'Enter') {
          // Si se presiona Espacio o Enter mientras un radio tiene foco:
          e.preventDefault(); // Prevenir la acción por defecto (ej. scroll con Espacio)

          // Si el radio enfocado aún no está marcado, marcarlo y guardar la respuesta
          if (!radioActivo.checked) {
              radioActivo.checked = true;
              guardarRespuestaActual(); // Guarda la respuesta seleccionada
          }

          // Aplicar el efecto visual temporal al LI clickeado
          liActual.classList.add('selected');
          setTimeout(() => liActual.classList.remove('selected'), 150); // Eliminar la clase después de un breve tiempo

          // Opcional: Avanzar automáticamente a la siguiente pregunta después de seleccionar con teclado
          // (Misma lógica que el click automático en manejarClickOpcion)
          setTimeout(() => {
               const esUltimaNormal = !revisandoPospuestas && indicePreguntaActual === TOTAL_PREGUNTAS - 1;
               const esUltimaRevision = revisandoPospuestas && indiceActualPospuesta === indicesPospuestas.length - 1;
               // Solo avanzar si no es la última pregunta (en flujo normal o revisión)
               if (!esUltimaNormal && !esUltimaRevision) {
                    siguientePregunta(); // Avanzar a la siguiente pregunta
               } else {
                    // Si es la última, enfocar el botón Finalizar para el siguiente paso del usuario
                    if(btnFinalizar) btnFinalizar.focus();
               }
          }, 250); // Pequeño delay para la animación y percepción del usuario
          return; // Salir de la función después de manejar Espacio/Enter
     }

     // --- Aplicar Foco si se Navegó con Flechas ---
     // Si se encontró un radio button al que mover el foco (por Flecha Arriba/Abajo)
     if (radioAEnfocar) {
         e.preventDefault(); // Prevenir el scroll por defecto de las flechas
         radioAEnfocar.focus(); // Mover el foco al nuevo input radio
     }
}


// ========================================================================
// ==                  FUNCIONES DEL MODAL PERSONALIZADO                 ==
// ========================================================================
// Funciones para mostrar, ocultar y manejar la interacción con el modal de diálogo.

/**
 * Muestra el modal personalizado con un título, mensaje y botones configurables.
 * Guarda el elemento que tenía el foco antes de abrir el modal para restaurarlo al cerrar (accesibilidad).
 * Asigna manejadores de eventos a los botones del modal y controla su visibilidad según el tipo de modal.
 * Ejecuta un callback al cerrar el modal con el resultado de la interacción (true/false para confirm, undefined para alert).
 * @param {'confirm' | 'alert'} [tipo='alert'] - El tipo de modal a mostrar ('confirm' para Sí/No, 'alert' para OK).
 * @param {string} [titulo='Alerta'] - El texto del título del modal.
 * @param {string} [mensaje=''] - El texto del mensaje principal del modal. Permite usar '\n' para saltos de línea.
 * @param {function(boolean): void | function(): void | null} [callback=null] - La función que se ejecutará cuando el modal se cierre.
 * - Si el tipo es 'confirm', el callback recibe un booleano (true si se confirmó, false si se canceló).
 * - Si el tipo es 'alert', el callback se llama sin argumentos.
 * - Puede ser null si no se necesita un callback.
 */
function mostrarModal(tipo = 'alert', titulo = 'Alerta', mensaje = '', callback = null) {
    console.log(`--- [mostrarModal] Mostrando modal (Tipo: ${tipo}, Titulo: "${titulo}") ---`);
    // Verificar si los elementos DOM necesarios para el modal existen
    if (!modalPersonalizado || !tituloModal || !mensajeModal || !btnConfirmarModal || !btnCancelarModal || !btnOkModal) {
        console.error("[mostrarModal] Elementos del Modal no encontrados! Usando fallback nativo del navegador.");
        // Fallback a los diálogos nativos del navegador si los elementos del modal no están en el DOM
        if (tipo === 'confirm') {
            // Usar `confirm()` nativo y llamar al callback con true/false según la respuesta
            if (confirm(`${titulo}\n\n${mensaje}`)) {
                if (callback) callback(true);
            } else {
                if (callback) callback(false);
            }
        } else { // tipo 'alert'
            // Usar `alert()` nativo y llamar al callback
            alert(`${titulo}\n\n${mensaje}`);
            if (callback) callback();
        }
        return; // Salir de la función si se usó el fallback nativo
    }

    // --- Gestión del Foco para Accesibilidad ---
    // Guardar una referencia al elemento que tenía el foco antes de abrir el modal
    // Esto permite restaurar el foco a ese elemento al cerrar el modal.
    elementoEnfocadoAntesModal = document.activeElement;
    // Nota: Es buena práctica asegurarse de que el foco se mueva *dentro* del modal
    // una vez abierto para atraparlo y evitar que el usuario interactúe con el contenido detrás.
    // Esto a menudo se hace enfocando el primer elemento interactivo o el contenedor del modal.

    // --- Configurar Contenido del Modal ---
    tituloModal.textContent = titulo; // Establecer el título
    // Establecer el mensaje, reemplazando saltos de línea '\n' con etiquetas <br> para HTML
    mensajeModal.innerHTML = mensaje.replace(/\n/g, '<br>');
    // Usar un atributo data en el overlay para controlar la visibilidad de los botones con CSS
    modalPersonalizado.dataset.modalType = tipo;

    // --- Configurar Event Listeners de Botones ---
    // Definir las funciones que se ejecutarán cuando se haga clic en cada tipo de botón del modal.
    // Se definen aquí para poder usarlas tanto para añadir como para remover listeners.
    const accionConfirmar = () => {
        console.log("[Modal Listener] Botón Confirmar/Sí presionado.");
        hideCustomModal(); // Primero, ocultar el modal
        if (callback) callback(true); // Luego, ejecutar el callback, indicando confirmación (true)
    };
    const accionCancelar = () => {
        console.log("[Modal Listener] Botón Cancelar/No presionado.");
        hideCustomModal(); // Ocultar el modal
        if (callback) callback(false); // Ejecutar el callback, indicando cancelación (false)
    };
    const accionOk = () => {
        console.log("[Modal Listener] Botón OK presionado.");
        hideCustomModal(); // Ocultar el modal
        if (callback) callback(); // Ejecutar el callback (los callbacks de alerta no reciben argumentos)
    };

    // Es crucial LIMPIAR los listeners de clics anteriores antes de añadir los nuevos.
    // Esto previene que un botón ejecute múltiples callbacks si el modal se abre varias veces.
    // Remover los listeners usando las referencias a las funciones definidas arriba.
    btnConfirmarModal.removeEventListener('click', accionConfirmar);
    btnCancelarModal.removeEventListener('click', accionCancelar);
    btnOkModal.removeEventListener('click', accionOk);

    // Ahora, AÑADIR los listeners apropiados según el tipo de modal
    if (tipo === 'confirm') {
        btnConfirmarModal.addEventListener('click', accionConfirmar);
        btnCancelarModal.addEventListener('click', accionCancelar);
        // Para modals de confirmación, enfocar el botón "No" (cancelar) por defecto es común para prevenir acciones accidentales.
        // Usar un pequeño timeout para asegurar que el botón esté visible y enfocable.
        setTimeout(() => btnCancelarModal?.focus(), 50);
    } else { // tipo 'alert'
        btnOkModal.addEventListener('click', accionOk);
        // Para modals de alerta, enfocar el botón "OK" por defecto.
        setTimeout(() => btnOkModal?.focus(), 50);
    }

    // --- Mostrar el Modal ---
    // Cambiar el atributo aria-hidden a "false" para que el modal sea accesible y visible (CSS lo controla)
    modalPersonalizado.setAttribute('aria-hidden', 'false');
    console.log("[mostrarModal] Modal configurado y mostrado.");

    // Opcional: Implementar "trampa de foco" (focus trapping) para mantener el foco dentro del modal
    // Esto implica escuchar eventos de Tab/Shift+Tab y mover el foco manualmente si sale del modal.
    // No está incluido en este código, pero es una mejora de accesibilidad importante para modales.
}

/**
 * Oculta el modal personalizado.
 * Restaura el foco al elemento que lo tenía antes de que se abriera el modal (para accesibilidad).
 * No necesita remover listeners de botones aquí, ya que se limpian antes de ser asignados en `mostrarModal`.
 */
function hideCustomModal() {
    // Verificar si el elemento modal existe
    if (!modalPersonalizado) {
        console.warn("[hideCustomModal] Elemento modal no encontrado.");
        return;
    }
    console.log("--- [hideCustomModal] Ocultando modal ---");

    // Cambiar el atributo aria-hidden a "true" para ocultar el modal y hacerlo inaccesible
    modalPersonalizado.setAttribute('aria-hidden', 'true');

    // --- Restaurar Foco ---
    // Verificar si guardamos una referencia a un elemento que tenía foco antes de abrir el modal
    if (elementoEnfocadoAntesModal?.focus) {
        console.log("[hideCustomModal] Devolviendo foco a:", elementoEnfocadoAntesModal);
        try {
            // Intentar restaurar el foco al elemento guardado
            elementoEnfocadoAntesModal.focus();
        } catch (e) {
            // Capturar errores si el elemento ya no es enfocable (ej. fue removido del DOM)
            console.warn("No se pudo devolver el foco al elemento anterior:", e);
        }
    } else {
         console.log("[hideCustomModal] No hay elemento anterior para enfocar o no era enfocable.");
         // Opcional: Si no se puede devolver el foco, considerar enfocar un elemento por defecto
         // fuera del modal (ej. el body, o un botón principal si el diseño lo permite)
    }
    // Limpiar la referencia al elemento enfocado para evitar mantener referencias a elementos que quizás ya no existen.
    elementoEnfocadoAntesModal = null;
    console.log("[hideCustomModal] Modal oculto y foco restaurado (si fue posible).");
}

/**
 * Maneja la pulsación de la tecla Escape cuando el modal está abierto.
 * Simula un clic en el botón "Cancelar" (para modals de confirmación) o "OK" (para modals de alerta)
 * para cerrar el modal y ejecutar el callback correspondiente.
 */
function manejarEscapeModal() {
    // Verificar si el modal existe y si está visible
    if (!modalPersonalizado || modalPersonalizado.getAttribute('aria-hidden') === 'true') {
        // Si no existe o no está visible, ignorar la tecla Escape
        return;
    }
    console.log("--- [manejarEscapeModal] Tecla Escape presionada en modal ---");

    // Obtener el tipo de modal actual desde el atributo data
    const tipo = modalPersonalizado.dataset.modalType;

    if (tipo === 'confirm') {
        // Si es un modal de confirmación, simular un clic en el botón "Cancelar"
        console.log("[manejarEscapeModal] Simulando click en botón Cancelar.");
        // Usar ?.click() para asegurarse de que solo se llama si el botón existe
        btnCancelarModal?.click();
    } else { // tipo 'alert'
        // Si es un modal de alerta, simular un clic en el botón "OK"
        console.log("[manejarEscapeModal] Simulando click en botón OK.");
        btnOkModal?.click();
    }
    // Nota: La función hideCustomModal y el callback asociado se llamarán
    // automáticamente por el listener del click simulado.
}

/*
    ====================================================================
    ||                         FIN DEL SCRIPT                       ||
    ====================================================================
*/