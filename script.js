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
    {
        question: `1. La responsabilidad fiscal tiene por objeto el resarcimiento de los daños ocasionados al patrimonio público como consecuencia de la conducta dolosa o culposa de quienes realizan gestión fiscal mediante el pago de una indemnización pecuniaria que compense el perjuicio sufrido por la respectiva entidad estatal. La conducta dolosa o culposa está integrada por: una conducta dolosa o culposa, atribuible a una persona que realiza gestión fiscal; un daño patrimonial al Estado; y un nexo causal entre los dos elementos anteriores. La conducta dolosa o culposa, atribuible a una persona que realiza gestión fiscal hace referencia al actuar o proceder del servidor público o del particular que por una gestión fiscal antieconómica, ineficaz, ineficiente, inequitativa e inoportuna o una gestión que no cumple con los cometidos y fines esenciales del Estado, ocasiona el daño patrimonial. De lo anterior se colige que la conducta dolosa o culposa:`,
        options: [
            "A. Es aquella relación o vínculo que debe existir entre el daño al erario y la conducta dolosa o gravemente culposa, que serviría para concluir que el daño es consecuencia directa del hecho atribuible a una persona.",
            "B. Es la lesión o menoscabo causado al patrimonio público, representado en el deterioro de los bienes o recursos públicos.",
            "C. Se entiende como la acción u omisión del servidor o particular; es decir, hace referencia a la conducta que se afirma, causa el daño a la entidad."
        ],
        answer: "C"
    },
    {
        question: `2. El ordenador del gasto requiere adelantar un proceso de contratación para reparar la fachada de la entidad, para ello decide hacer apertura de un proceso de licitación pública. Se designa al secretario del despacho para que estructure y adelante el proceso precontractual. Dentro de la evaluación de ofertas, el nominador de la entidad pretende modificar el pliego de condiciones mediante adenda, con el objeto de modificar la calidad de los materiales para la reparación. Sin embargo, el funcionario encargado del proceso encuentra que la misma es improcedente porque:`,
        options: [
            "A. Las adendas se destinan para efectos de cambios técnicos de la metodología de selección.",
            "B. Las adendas al pliego de condiciones deben ser debatidas por los oferentes antes de su publicación para su validez.",
            "C. Las adendas de esta naturaleza se deben efectuar antes de la presentación de ofertas."
        ],
        answer: "C"
    },
    {
        question: `3. La entidad Vivienda Buena le otorga paz y salvo sobre crédito de vivienda al señor Óscar. Dos meses después, le envía comunicación diciéndole que hubo un equívoco y que aún adeuda ocho millones de pesos sobre su crédito. El argumento que denota el vicio de constitucionalidad existente en el texto es que hay una violación del:`,
        options: [
            "A. Principio de respeto al acto propio que conlleva la violación de los principios de confianza legítima y buena fe.",
            "B. Derecho fundamental del debido proceso que conlleva la violación de los principios de la autonomía de la voluntad y la igualdad.",
            "C. Derecho al buen nombre que conlleva la violación de los principios de la buena fe y el debido proceso."
        ],
        answer: "A"
    },
    {
        question: `4. Por medio de la Ley 1150 de 2007 se introducen medidas para la eficiencia y la transparencia en la Ley 80 de 1993 y se dictan otras disposiciones generales sobre la contratación con Recursos Públicos. Según las disposiciones de esta Ley, en contratación estatal es factible la delegación de las actuaciones contractuales. El delegante responde cuando haya incurrido en dolo o culpa grave en el ejercicio de dicha función, toda vez que conserva:`,
        options: [
            "A. La dirección de la gestión precontractual y contractual.",
            "B. El deber de control y vigilancia de la actividad precontractual y contractual.",
            "C. La titularidad de la función precontractual y contractual.",
            "D. La discrecionalidad de terminar en cualquier momento la delegación."
        ],
        answer: "B"
    },
    {
        question: `5. En una entidad pública de orden nacional decidieron pagarle a cada uno de los hijos de todo exfuncionario fallecido, un sueldo equivalente a la pensión que su padre tenía si se jubiló, o que le correspondería tener de haberse jubilado. Frente a esta situación de gasto injustificado de recursos, debe intervenir:`,
        options: [
            "A. La Contraloría General de la República.",
            "B. El Congreso de la República.",
            "C. El ministro de Hacienda."
        ],
        answer: "A"
    },
    {
        question: `6. La vigilancia y el control fiscal son una función pública que ejercerá la Contraloría General de la República, la cual vigila la gestión fiscal de la administración y de los particulares o entidades que manejen fondos o bienes públicos. El control fiscal se ejercerá en forma posterior y selectiva, y además:`,
        options: [
            "A. Podrá ser preventivo y concomitante, según sea necesario para garantizar la defensa y protección del patrimonio público.",
            "B. Implicará en cierta medida una coadministración y se realizará en tiempo real a través del seguimiento permanente de los ciclos, uso, ejecución, contratación e impacto de los recursos públicos.",
            "C. Hará uso de tecnologías de la información, dando principal participación al control social y con apoyo supletorio del control interno."
        ],
        answer: "A"
    },
    {
        question: `7. Texto de referencia "Josiah Royce ha formulado lo siguiente: Imaginemos que una porción del suelo de Inglaterra ha sido nivelada perfectamente y que en ella traza un cartógrafo un mapa de Inglaterra. La obra es perfecta: no hay detalle del suelo de Inglaterra, por diminuto que sea, que no esté registrado en el mapa; todo tiene allí su correspondencia. Ese mapa; en tal caso, debe contener un mapa del mapa, que debe contener un mapa del mapa del mapa, y así hasta el infinito." La expresión "todo tiene allí su correspondencia", indica que:`,
        options: [
            "A. Hay una relación biunívoca entre el mapa y el territorio.",
            "B. Una parte del mapa interactúa con una parte del territorio.",
            "C. Hay un diálogo entre la cosa representada y lo que la representa.",
            "D. Hay una proporción parecida pero no igual entre ambos."
        ],
        answer: "A"
    },
    {
        question: `8. El Estado colombiano, en repetidas ocasiones, se ha visto afectado por la falta de principios y valores humanos de los servidores que laboran en las entidades públicas, por el abandono moral y el desvío de la conducta ética, derivados, en parte, por la falta de conciencia en la responsabilidad social de su ejercicio. Ante esta situación, es deber de los servidores:`,
        options: [
            "A. Velar por la protección de la integridad del espacio público.",
            "B. Planificar el manejo y aprovechamiento de los recursos.",
            "C. Proponer las iniciativas que estime útiles para el mejoramiento del servicio.",
            "D. Resolver los asuntos, independiente del orden que vayan ingresando a su dependencia."
        ],
        answer: "C"
    },
    {
        question: `9. Una entidad del orden nacional requiere establecer acciones, métodos y procedimientos de control y gestión de riesgo, de tal manera que se logre implementar bajo la estructura del Modelo Estándar de Control Interno (MECI). Un ejemplo de las acciones y métodos que debe implementar la entidad es la política de gestión de riesgos. Antes de ejecutarlo, el director de Planeación, en reunión con los profesionales del área, determina que se deben:`,
        options: [
            "A. Definir los objetivos de la entidad con suficiente claridad.",
            "B. Analizar los posibles actos de corrupción al interior de la entidad.",
            "C. Identificar las causas de los eventos que afecten la entidad."
        ],
        answer: "C"
    },
    {
        question: `10. El Contralor será elegido por el Congreso en Pleno, por mayoría absoluta, en el primer mes de sus sesiones para un periodo igual al del Presidente de la República, de lista de elegibles conformada por convocatoria pública con base en lo dispuesto en el artículo 126 de la Constitución y no podrá ser reelegido ni continuar en ejercicio de sus funciones al vencimiento del mismo. Para ser elegido Contralor General de la República:`,
        options: [
            "A. No se precisa ser colombiano de nacimiento pero sí estar en ejercicio de la ciudadanía; además debe ser persona mayor de 35 años, de edad; tener título universitario en ciencias jurídicas, humanas, económicas, o financieras.",
            "B. Podrá aspirar quien sea o haya sido miembro del Congreso o se haya desempeñado como gestor fiscal del orden nacional, en el año inmediatamente anterior a la elección.",
            "C. En ningún caso podrán intervenir en su postulación o elección personas que se hallen dentro del cuarto grado de consanguinidad, segundo de afinidad y primero civil o legal respecto de los candidatos."
        ],
        answer: "C"
    },
    {
        question: `11. Una de las principales modificaciones que tuvo la Constitución Política de 1991 fue la introducción de la figura de la reelección del presidente de la República para los comicios de mayo del 2006. Uno de los siguientes mecanismos permite hacer modificaciones de esta naturaleza a la Constitución política colombiana:`,
        options: [
            "A. La votación favorable a un plebiscito convocado por el presidente.",
            "B. La aprobación de un proyecto de ley en el Congreso de la República.",
            "C. La realización de un referendo aprobado por el pueblo.",
            "D. La expedición de una ley por el Ministerio de Justicia."
        ],
        answer: "C"
    },
    {
        question: `12. Situación Luis tiene 6 libros en un estante: Razonamiento matemático, Razonamiento verbal, Lengua, Física, Historia y Geografía. Si se sabe que: El libro de Razonamiento verbal está junto y a la izquierda del de Lengua. El libro de Física está a la derecha del de Razonamiento verbal y a la izquierda del libro de Historia. El libro de Historia está junto y a la izquierda del de Geografía. El libro de Razonamiento matemático está a la izquierda del de Lengua. ¿Qué libro ocupa el cuarto lugar si lo contamos de izquierda a derecha?`,
        options: [
            "A. Lengua",
            "B. Física",
            "C. Historia",
            "D. Razonamiento matemático"
        ],
        answer: "B"
    },
    {
        question: `13. Los Servidores Públicos en el desarrollo de sus funciones pueden llegar a incurrir en diferentes tipos de responsabilidades. Una actuación que no se ajuste a la ley y/o a los reglamentos puede originar consecuencias de orden Fiscal, Penal, Disciplinaria y Civil. Cuando hablamos de delitos contra la administración pública, anotamos que estos se materializan con conductas:`,
        options: [
            "A. Que atentan contra la función o gestión pública, los bienes públicos, o los servidores públicos.",
            "B. Adelantadas por los servidores públicos que actúan faltando a la moralidad y la ética.",
            "C. Con la participación de un servidor público en calidad de sujeto activo en la comisión del delito."
        ],
        answer: "A"
    },
    {
        question: `14. Luego de realizarse una auditoría interna al área de Talento Humano de la entidad en la que usted labora, se encontró que en algunas historias laborales hay documentos deteriorados. Usted como encargado del archivo, se encuentra preocupado con esta situación, dado que próximamente se realizará una auditoría externa. El plan de mejoramiento que usted propone sobre el estado de los documentos de las historias laborales, debe contemplar:`,
        options: [
            "A. Eliminar los documentos que están deteriorados y foliar nuevamente toda la carpeta.",
            "B. Realizar una copia de los deteriorados y realizar un proceso de transferencia de información.",
            "C. Separar los documentos deteriorados y de buen uso, generando carpetas para cada grupo."
        ],
        answer: "C" // Corregido según la tabla de respuestas proporcionada (C)
    },
    {
        question: `15. Los organismos de control fiscal en el desarrollo de sus funciones cuentan con diversas facultades. Una de ellas consiste en adelantar las investigaciones que estimen convenientes para establecer la ocurrencia de hechos generadores de daño patrimonial al Estado. Los servidores de las contralorías que realicen funciones de investigación o de indagación, o que estén comisionados para la práctica de pruebas en el proceso de responsabilidad fiscal:`,
        options: [
            "A. No tienen el carácter de autoridad de policía judicial, si bien pueden adelantar oficiosamente las indagaciones preliminares que se requieran.",
            "B. En ejercicio de sus funciones no podrán exigir la colaboración gratuita de las autoridades de todo orden.",
            "C. Podrán denunciar bienes de los presuntos responsables para que se tomen medidas cautelares, sin necesidad de prestar caución."
        ],
        answer: "C" // Corregido según la tabla de respuestas proporcionada (C)
    },
    {
        question: `16. Un funcionario público que ha cometido una falta disciplinaria en la entidad donde laboraba fue sancionado con suspensión temporal de 30 días por parte de la Procuraduría Delegada. Una vez revisada la sanción dos años después, se reabrió el procedimiento y se determinó que la sanción del funcionario debía ser de 60 días, por lo cual se le impusieron 30 días más de suspensión. Respecto a esta sanción de carácter disciplinario se aplica en favor del funcionario el principio de:`,
        options: [
            "A. Legalidad.",
            "B. Culpabilidad.",
            "C. Favorabilidad.",
            "D. Ejecutoriedad."
        ],
        answer: "C"
    },
    {
        question: `17. En el punto de recepción de la entidad se encuentra un ciudadano que se comunica usando lenguaje de señas, a quien se le niega la atención pues es difícil comprender lo que desea. Ante esta situación usted:`,
        options: [
            "A. Habla con la persona de recepción para que busque una solución pues como todos tiene el derecho a recibir la atención.",
            "B. Le indica al ciudadano que debe solicitar la atención por otro medio que posibilite brindarle una adecuada atención.",
            "C. Comenta la situación con el supervisor del funcionario de recepción para que tome las medidas necesarias a futuro."
        ],
        answer: "A"
    },
    {
        question: `18. La selección del contratista no está supeditada a la libre discrecionalidad de la Administración pública, sino que debe sujetarse a requisitos y procedimientos establecidos en la ley, garantizando principios como transparencia, igualdad y moralidad. De conformidad con el Artículo 2 de la Ley 1150 de 2007, en una entidad territorial, la escogencia del contratista no se realiza con arreglo a las modalidades de:`,
        options: [
            "A. Licitación pública, selección abreviada.",
            "B. Contratación de Mínima cuantía, licitación pública.",
            "C. Contratación directa, subasta invertida."
        ],
        answer: "C"
    },
    {
        question: `19. La Constitución Política de 1991 estableció mecanismos de protección de Derechos Humanos como la Acción Popular y la Acción de Grupo, reguladas por la Ley 472 de 1998. Dentro de los parámetros establecidos por esta ley para cada acción, una de las diferencias es que:`,
        options: [
            "A. La acción popular debe ser iniciada por un abogado, la acción de grupo no.",
            "B. La acción popular puede ser interpuesta únicamente por personas naturales o jurídicas que hubieren sufrido un perjuicio individual, la acción de grupo puede ser interpuesta por toda persona, natural o jurídica, las Organizaciones No Gubernamentales, organizaciones sociales, organismos de control y servidores públicos.",
            "C. La acción popular puede promoverse durante el tiempo en que subsista la amenaza o peligro, la acción de grupo sólo puede interponerse dentro de los dos (2) años siguientes a la fecha en que se causó el daño o cesó la acción que causaba el daño.",
            "D. La acción popular pretende que el daño colectivo ocasionado por un hecho común sea integralmente reparado, la acción de grupo está dirigida a proteger los derechos e intereses colectivos."
        ],
        answer: "C"
    },
    {
        question: `20. Si las dos primeras proposiciones son ciertas, la tercera es: Todos los empleados de la función pública son servidores públicos. Francisco Gómez es contratista luego no es servidor público. Francisco Gómez no pertenece a la función pública.`,
        options: [
            "A. Verdadera.",
            "B. Falsa.",
            "C. Dudosa."
        ],
        answer: "B" // Corregido según la tabla de respuestas proporcionada (B - Falsa)
    },
    {
        question: `21. Un servidor público se encuentra capacitando a una persona recién nombrada en su cargo. Empieza mostrando el propósito principal del Sistema de Información y Gestión del Empleo Público (SIGEP). Al exponer el propósito principal del sistema, durante la capacitación, el servidor público debe:`,
        options: [
            "A. Indicarle que esta herramienta permite consolidar los datos de carácter institucional relacionados con los servidores públicos.",
            "B. Comunicarle que es una plataforma de tipo transaccional que facilita la gestión de las cuentas de las entidades de carácter público.",
            "C. Señalarle que este aplicativo permite la integración de los procesos asociados a los diferentes proyectos de inversión pública."
        ],
        answer: "A"
    },
    {
        question: `22. La eficacia directa de los derechos fundamentales tiende a justificar el activismo judicial, el cual aplica la Carta Fundamental, utiliza los principios constitucionales, los interpreta y llega a modificar en ocasiones las disposiciones superiores. La afirmación anterior es imprecisa, debido a que:`,
        options: [
            "A. La eficacia directa de los derechos fundamentales en materia constitucional depende del desarrollo legislativo más no de una labor judicial.",
            "B. La interpretación judicial de los derechos fundamentales se debe atener a lo expresamente señalado por la labor legislativa.",
            "C. El Legislador desarrolla los derechos fundamentales por medio de leyes estatutarias, que se deben referir también a instrumentos judiciales para hacerlos efectivos.",
            "D. El Legislador desarrolla los derechos fundamentales por medio de leyes marco, que se deben referir también a instrumentos judiciales para hacerlos efectivos."
        ],
        answer: "C"
    },
    {
        question: `23. Texto de referencia "La vida en sociedad también entraña de manera esencial el conflicto, que nace de la defensa de los intereses particulares, de los desacuerdos, de la competencia. El conflicto mal manejado puede llevar a los individuos a reaccionar violentamente a través de agresiones verbales o físicas. También a buscar dominar a los más débiles..." Según el texto, la frase "buscar dominar a los más débiles", en forma general tiene que ver con:`,
        options: [
            "A. Los maltratos familiares.",
            "B. La violencia de género.",
            "C. El manejo del conflicto.",
            "D. Las relaciones de poder."
        ],
        answer: "D"
    },
    {
        question: `24. La autonomía que la Constitución Política reconoce a los organismos de control tiene por objeto asegurar que su gestión se adelante en forma libre e independiente, sin interferencias ni intereses particulares ajenos al interés general y a las buenas prácticas de administración pública. Sin perjuicio del deber de colaboración armónica entre las ramas y organismos del poder público, el control fiscal debe:`,
        options: [
            "A. Garantizar su independencia técnica y su eficiencia económica, de forma que la fiscalización sobre el uso de los recursos públicos pueda hacerse sin reservas.",
            "B. Prevenir, detectar, sancionar y erradicar los actos de corrupción en el ejercicio de las funciones públicas, lo cual constituye el objetivo último impuesto a las entidades encargadas de la auditoria financiera de los diferentes órganos del Estado.",
            "C. Ejercerse en el contexto del principio de separación de funciones y, por ende, de plena diferenciación entre la función fiscalizadora y la actividad administrativa de las entidades objeto de control."
        ],
        answer: "C"
    },
    {
        question: `25. El Artículo 88 de la Constitución Política de Colombia de 1991 consagra las acciones populares y de grupo para proteger derechos colectivos. Este Artículo fue regulado por la Ley 472 de 1998. Estas normas permiten concluir que una de las diferencias existentes entre las dos acciones es que:`,
        options: [
            "A. La acción popular busca una reparación del daño, y la acción de grupo busca prevenir el daño.",
            "B. La acción popular busca prevenir el daño, y la acción de grupo busca una reparación del daño.",
            "C. La acción de grupo debe ser presentada por, al menos, 20 personas; mientras que la acción popular exige que sean más de 5 personas.",
            "D. La acción de grupo debe ser presentada por, al menos, 5 personas; mientras que la acción popular exige que sean más de 20 personas."
        ],
        answer: "B"
    },
    {
        question: `26. Una entidad del Estado debe realizar el cambio de la naturaleza de los empleos de su planta global que son de libre nombramiento y remoción, debido a una decisión judicial. Con el fin de ejecutar este proceso, el jefe del área solicita al profesional a cargo adelantar los trámites pertinentes; por lo cual él debe:`,
        options: [
            "A. Elaborar el acto administrativo de destitución para la firma del jefe del área a la cual pertenece el empleo.",
            "B. Proyectar la declaratoria de insubsistencia para la firma del nominador de la entidad.",
            "C. Redactar la resolución de despido para la firma del director de la unidad de Talento Humano."
        ],
        answer: "B"
    },
    {
        question: `27. El nominador del Ente de Control Fiscal solicita al responsable del Área de Nómina pagar una prima adicional para todos los empleados, conforme a lo negociado con el sindicato. Sin embargo, el empleado conoce que corresponde al Congreso dictar las normas generales para fijar el régimen salarial de los servidores públicos. Lo anterior supone que:`,
        options: [
            "A. El Ente de Control Fiscal tiene autonomía para crear una prima adicional para sus empleados.",
            "B. Se debe conceder la prima, toda vez que fue producto de un pliego de solicitudes con los trabajadores de la entidad.",
            "C. No se puede aplicar lo establecido en el pliego de solicitudes, ya que el tema prestacional solo puede ser objeto de negociación en el ámbito nacional.",
            "D. El responsable del Área de Nómina debe proceder con la instrucción porque fue producto de un pliego de solicitudes con los trabajadores de la entidad."
        ],
        answer: "C"
    },
    {
        question: `28. El artículo 230 de la Constitución Política establece que los jueces están sujetos al imperio de la ley en sus providencias. Frente a la sujeción de la actividad judicial al imperio de la ley es correcto afirmar que:`,
        options: [
            "A. Debe encargarse de la observación minuciosa y literal de un texto legal específico en consideración a que el ordenamiento jurídico es conjunto armónico de normas, que persigue la realización de los valores y objetivos consagrados en la Constitución.",
            "B. No debe limitarse a la observación minuciosa y literal de un texto legal específico pues debe tomar en consideración el ordenamiento jurídico como conjunto integrado y armónico de normas, estructurado para la realización de los valores y objetivos consagrados en la Constitución.",
            "C. Es su función centrarse en la observación pormenorizada de un texto legal específico ya que el ordenamiento jurídico es ante todo un conjunto integrado y armónico de normas cuyo fin atiende a la realización de los valores y objetivos constitucionales."
        ],
        answer: "B"
    },
    {
        question: `29. Según lo dispuesto en la Ley 1150 de 2007, las entidades estatales deben estimar, tipificar y asignar los riesgos en los contratos estatales. Para dar una correcta aplicación a la norma, una entidad contratante debe definir la estimación, tipificación y asignación de los riesgos desde:`,
        options: [
            "A. Los estudios previos.",
            "B. Los pliegos de condiciones.",
            "C. La audiencia de riesgos."
        ],
        answer: "B" // Corregido según la tabla de respuestas proporcionada (B)
    },
    {
        question: `30. De acuerdo con el artículo 1 de la C.P.N., Colombia es un estado social de derecho, organizado en forma de República unitaria, descentralizada, con autonomía de sus entidades territoriales, democrática. En el texto el error ortográfico se encuentra en la palabra:`,
        options: [
            "A. “estado” pues el “Estado” como un ente jurídico se escribe con mayúscula.",
            "B. “C.P.N.” pues sería mejor aclarar: Constitución Política Nacional.",
            "C. “unitaria”, pues la idea completa es República Unitaria” y se escribe en mayúscula."
        ],
        answer: "A"
    },
    {
        question: `31. Una entidad pública requiere contratar la compraventa de bienes de papelería para su funcionamiento, y el presupuesto oficial supera el valor de la mínima cuantía, pero no el monto para la menor cuantía, determinado tal como lo establece el artículo 2, numeral 2, literal b de la Ley 1150 de 2007. En este caso, la mejor alternativa para celebrar el contrato es realizar un procedimiento de:`,
        options: [
            "A. Licitación pública.",
            "B. Mínima Cuantía.",
            "C. Selección abreviada."
        ],
        answer: "C"
    },
    {
        question: `32. El principio de eficacia impone el logro de resultados mínimos en relación con las responsabilidades confiadas a los organismos estatales, con miras a la efectividad de los derechos colectivos e individuales. La palabra subrayada (impone) puede ser reemplazada por:`,
        options: [
            "A. Decide.",
            "B. Espera.",
            "C. Exige."
        ],
        answer: "C"
    },
    {
        question: `33. El pensamiento no delinque y requiere una fuerza física (causa) y un daño o lesión al interés jurídico tutelado (efecto). La dañosidad en sí misma no estructura el delito, sino que además se requiere de una fuerza moral, conciencia y voluntad del hecho. De lo anterior se concluye que:`,
        options: [
            "A. La fuerza física es la causa y el daño al interés jurídico tutelado es el efecto.",
            "B. La fuerza física es el efecto y el daño al interés jurídico tutelado es la causa.",
            "C. La causa delinque y el efecto comporta la lesión.",
            "D. La fuerza moral es causa y efecto."
        ],
        answer: "A"
    },
    {
        question: `34. Un servidor público en cumplimiento de sus labores dentro de la entidad ha generado un incremento de su patrimonio. Este incremento se debe explicar, cuando sea requerido de forma inmediata y satisfactoria, ante el:`,
        options: [
            "A. Nominador, la Procuraduría General de la Nación o Personería.",
            "B. Jefe inmediato, Recursos Humanos o Control Interno.",
            "C. Nominador, la Contraloría General de la República o Defensoría.",
            "D. Jefe inmediato, la Procuraduría General de la Nación o Defensoría."
        ],
        answer: "B" // Corregido según la tabla de respuestas proporcionada (B)
    },
    {
        question: `35. Desde un punto de vista teleológico, la Constitución vincula directamente el control fiscal a los fines del Estado, en la medida que:`,
        options: [
            "A. Fiscaliza la administración y el manejo de los bienes y fondos públicos, en sus distintas etapas de recaudo o adquisición, conservación, enajenación, gasto, inversión y disposición.",
            "B. Se orientan a garantizar la concreción efectiva de las tareas públicas mediante la asignación adecuada de los recursos públicos y la protección del patrimonio de la Nación.",
            "C. Determina si las diferentes operaciones, transacciones y acciones jurídicas, financieras y materiales en las que se traduce la gestión fiscal se cumplieron de acuerdo con las normas prescritas para el efecto.",
            "D. Determina la obtención de resultados oportunos y acordes con los objetivos y metas de la entidad; y si se ha hecho una correcta evaluación del impacto por el uso o deterioro de los recursos naturales y el medio ambiente asegurando su protección y conservación."
        ],
        answer: "B"
    },
    {
        question: `36. La Subsecretaría de Acceso y Permanencia requiere desarrollar un procedimiento para divulgar por medio de la intranet, a usuarios internos competentes, las características que deben relacionarse en los informes de supervisión de contratos. El procedimiento más acertado para dicho efecto sería:`,
        options: [
            "A. Información de la Subsecretaría – Publicación Oficina de Comunicaciones - Usuarios del área informados.",
            "B. Divulgación de la Oficina de Comunicaciones – Usuarios del área informados.",
            "C. Información de Contratación - Oficina de Comunicaciones – Usuarios del área informados."
        ],
        answer: "A"
    },
    {
        question: `37. La entidad ha recibido un derecho de petición por parte de una ciudadana, en el que solicita información sobre aspectos de ejecución en el último semestre. El funcionario encargado debe redactar una respuesta clara y directa. En lo que respecta a la redacción para dar una explicación directa, al funcionario encargado le corresponde:`,
        options: [
            "A. Usar la fórmula conocida como el orden lógico de la oración: sujeto + verbo + complemento.",
            "B. Utilizar la forma tradicional aplicada como voz pasiva: sujeto + sustantivo + acción presente.",
            "C. Emplear el formato lingüístico reconocido como contextual: pronombre + adjetivo + predicado."
        ],
        answer: "A"
    },
    {
        question: `38. En una conferencia sobre función pública, se indica que los servidores deben escuchar con respeto a todo ciudadano, independientemente de su condición, y brindar atención amable y eficiente. Lo anterior permite inferir que:`,
        options: [
            "A. Se debe dar respuesta a todos los ciudadanos, sin utilizar apelativo alguno.",
            "B. A los ciudadanos se les debe escuchar y brindar diferentes alternativas.",
            "C. Los funcionarios siempre deben aplicar los protocolos de los protocolos de servicio adoptados por la entidad." // Ajuste en texto de opción
        ],
        answer: "B" // Corregido según la tabla de respuestas proporcionada (B)
    },
    {
        question: `39. En junio de 2024 queda ejecutoriada una sentencia de segunda instancia que revoca el fallo del A Quo y condena a una entidad estatal a pagar una suma por responsabilidad extracontractual. Conforme a lo anterior será correcto afirmar que:`,
        options: [
            "A. Dicha condena no supone un gasto por no ser de naturaleza contractual.",
            "B. Se debe efectuar la apropiación presupuestal para el pago de dicha sentencia.",
            "C. Se tiene que pagar dicha sentencia en el año 2024 con el presupuesto de gasto.",
            "D. La apropiación presupuestal para el pago de la sentencia se hará en el año 2025."
        ],
        answer: "B"
    },
    {
        question: `40. La oficina de Contratos ha desarrollado un documento extenso sobre los detalles para realizar contratos con particulares. Usted debe resumirlo siguiendo el Decreto 1510 de 2013. La estructura adecuada según el decreto es:`,
        options: [
            "A. Justificación - Planeación - Ejecución - Evaluación.",
            "B. Planeación - Selección - Contratación - Ejecución.",
            "C. Justificación - Planeación - Contratación - Liquidación."
        ],
        answer: "B"
    },
    {
        question: `41. Una empresa de servicios públicos domiciliarios se dedica a la preservación y distribución del agua. Se ha reconocido que la imagen de la empresa ante la opinión pública ha sido afectada, entre otros problemas, por los retrasos en una obra de tratamiento de aguas que se está ejecutando desde hace tres años. Con el fin de dimensionar la afectación en la imagen de la empresa, el Área de Mercadeo ha destinado recursos para adelantar un estudio de mercado. Un funcionario ha sido asignado para liderar la realización de este contrato, el cual permitirá la definición de los programas de comunicación y publicidad de la entidad para mejorar su imagen. Si el ordenador del gasto debe fijar el valor del servicio para la contratación como parte del proceso contractual, entonces debe:`,
        options: [
            "A. Efectuar un análisis para conocer el sector del objeto del contrato.",
            "B. Celebrar la audiencia de observaciones donde se establece el monto mínimo.",
            "C. Consultar lo propuesto en el plan anual de adquisiciones de la entidad."
        ],
        answer: "C" // Corregido según la tabla de respuestas proporcionada (C)
    },
    {
        question: `42. Usted ha sido asignado al Comité Interno de Archivo de la entidad en la cual trabaja, y en la que actualmente se está adelantando un proceso de organización documental que busca ajustarse a la normatividad y los procedimientos sobre el tema que ha definido el Archivo General de la Nación. Este proceso se encuentra muy atrasado en la entidad y es importante adelantar las actividades pertinentes. Con el objetivo de realizar correctamente la agrupación de las series documentales como miembro del Comité Interno de Archivo, usted recomienda:`,
        options: [
            "A. Ordenar teniendo en cuenta la dependencia de la cual provienen los documentos.",
            "B. Clasificar a partir de las funciones de las dependencias que crean los documentos.",
            "C. Organizar los documentos con base en los asuntos definidos por las dependencias."
        ],
        answer: "B"
    },
    {
        question: `43. Al área jurídica de una entidad estatal llega la notificación de una acción de tutela en la que el accionante invoca, como sustento, la violación a los principios y valores contenidos en el preámbulo de la Constitución. Para efectos de dar una respuesta adecuada, y aplicando lo expuesto por la Corte Constitucional sobre el valor jurídico del preámbulo, la entidad debe:`,
        options: [
            "A. Solicitar el rechazo de la tutela porque el preámbulo carece de todo valor jurídico, y NO es posible sustentar una acción de tutela en su contenido.",
            "B. Solicitar el rechazo de la tutela porque el preámbulo sólo sirve para interpretar la Constitución, pero NO puede utilizarse para sustentar una acción de tutela.",
            "C. Estudiar el caso y dar una respuesta de fondo, porque el preámbulo tiene pleno valor jurídico y puede utilizarse válidamente como sustento de una acción de tutela."
        ],
        answer: "C"
    },
    {
        question: `44. A solicitud de su jefe, usted transcribe el borrador de una circular externa que emitirá la entidad, encontrando el siguiente párrafo: “... Teniendo en cuenta de que el próximo mes de Noviembre del presente año tendremos elecciones de nuevos alcaldes y concejales, conviene advertir a las autoridades que culminan su periodo el 31 de diciembre del año en curso, sobre el cumplimiento de la Ley 594 de 2000, con ocasión al cambio de administraciones territoriales que se pueden presentar...” Al hacer la tarea, advierte que la redacción del documento debe ser en tercera persona, por lo que para corregirlo usted modifica la palabra:`,
        options: [
            "A. “tendremos” por “se tendrá”.",
            "B. “conviene” por “nos conviene”.",
            "C. “pueden” por “podremos”."
        ],
        answer: "A"
    },
    {
        question: `45. Al funcionario público Juan se le notifica un acto administrativo por su nominador que dice expresamente: “Declárese insubsistente al funcionario Juan por razones del servicio”. El expediente administrativo muestra que la hoja de vida del funcionario no ha tenido anotaciones negativas. El acto administrativo presenta un vicio de inconstitucionalidad que se sustenta en:`,
        options: [
            "A. El desconocimiento al principio del juez o fallador natural, pues el ente que toma la decisión no es competente para ello.",
            "B. La violación al debido proceso, pues se toma una decisión administrativa que no tiene una debida motivación a partir de los antecedentes de este servidor público.",
            "C. La toma de una decisión administrativa que falta al debido proceso pues al no valorar los antecedentes del notificado, incurre en una violación a la debida motivación."
        ],
        answer: "B"
    },
    {
        question: `46. La entidad ha recibido un derecho de petición por parte de una ciudadana, en el que solicita información sobre aspectos de ejecución en el último semestre. El funcionario encargado debe redactar una respuesta clara y directa. En lo que respecta a la redacción para dar una explicación directa, al funcionario encargado le corresponde:`,
        options: [
            "A. Usar la fórmula conocida como el orden lógico de la oración: sujeto + verbo + complemento.",
            "B. Utilizar la forma tradicional aplicada como voz pasiva: sujeto + sustantivo + acción presente.",
            "C. Emplear el formato lingüístico reconocido como contextual: pronombre + adjetivo + predicado."
        ],
        answer: "A"
    },
    {
        question: `47. La entidad donde usted trabaja está consolidando la información de un grupo de 350 funcionarios con el fin de determinar cuántos de ellos se encuentran afiliados al Régimen de Prima Media (RPM), al Régimen de Ahorro Individual Solidario (RAIS), y quiénes a la vez se encuentran o no en condición de prepensión. Una vez hecha la revisión del documento consolidado se pudo concluir que: El 80% del grupo de funcionarios se encuentran afiliados al RPM. El 10% de los afiliados al RAIS son prepensionados. El 4% del total de funcionarios del grupo son prepensionados. ¿Cuál de las siguientes tablas representa correctamente la información obtenida de ese grupo?`,
        options: [
            "A. \n Estatus Régimen | No prepensionado | Prepensionado \n --- | --- | --- \n RPM | 140 | 140 \n RAIS | 70 | 7",
            "B. \n Estatus Régimen | No prepensionado | Prepensionado \n --- | --- | --- \n RPM | 200 | 63 \n RAIS | 80 | 7",
            "C. \n Estatus Régimen | No prepensionado | Prepensionado \n --- | --- | --- \n RPM | 270 | 7 \n RAIS | 59 | 14"
        ],
        answer: "D" // Según la tabla de respuestas proporcionada, la respuesta es D. Sin embargo, solo hay opciones A, B, C en el texto. Asumo que la opción D debe estar en la tabla pero no en el listado de opciones, o hay un error en la numeración. Dejaré 'D' según la tabla, pero revisa si falta una opción D en tu documento original.
    },
    {
        question: `48. Un usuario llega a la entidad y se acerca al punto de información para aclarar una serie de dudas que tiene frente a un proceso en el trámite de una documentación. Frente a lo anterior decido:`,
        options: [
            "A. Emitir una respuesta oportuna y clara a partir de la información que tiene de su dependencia.",
            "B. Dirigir al usuario a la dependencia a la que corresponden sus dudas, para que sean resueltas.",
            "C. Indicar amablemente que no cuento con la información que solicita."
        ],
        answer: "A"
    },
    {
        question: `49. A su dependencia ingresó una nueva funcionaria: reservada e indiferente. No habla ni se relaciona con nadie. Después de dos meses de su ingreso, aprovechando el aniversario de la entidad, el jefe organiza varias actividades grupales. Sin embargo, durante la reunión de organización de las tareas, se presenta un conflicto entre un compañero y la nueva funcionaria. Ante esa situación, usted:`,
        options: [
            "A. Simplemente se convierte en un espectador del tema y no se involucra para no tener inconvenientes con ninguno de los dos.",
            "B. Se acerca a los dos y se comunica informándoles la importancia de cada uno para el logro de los resultados del equipo.",
            "C. Se retira de la reunión y le reporta a su superior lo acontecido para que él se encargue del tema.",
            "D. Se comunica directamente con la funcionaria nueva, pues considera que mejorando su sociabilidad se supera el inconveniente."
        ],
        answer: "B"
    },
    {
        question: `50. Ante la gran cantidad de demandas y procesos disciplinarios contra la institución y sus trabajadores, una entidad pública se ve avocada a solicitar el apoyo de la Procuraduría General de la Nación con el fin de capacitar a los funcionarios en materia disciplinaria. Un empleado manifiesta que presentó una queja con la cual se inició un proceso disciplinario en el que se le negó el derecho a controvertir el fallo absolutorio. Al dirigirse a este empleado particular, el profesional que adelanta la capacitación debe:`,
        options: [
            "A. Precisar que debe ser abogado para poder impugnar la decisión.",
            "B. Aducir que el denunciante carece de la calidad de sujeto procesal.",
            "C. Afirmar que es improcedente rechazar esta clase de derecho al quejoso."
        ],
        answer: "C"
    },
    {
        question: `51. Un usuario llega a la entidad y se acerca al punto de información para aclarar una serie de dudas que tiene frente a un proceso en el trámite de una documentación. Frente a lo anterior decido:`,
        options: [
            "A. Emitir una respuesta oportuna y clara a partir de la información que tiene de su dependencia.",
            "B. Dirigir al usuario a la dependencia a la que corresponden sus dudas, para que sean resueltas.",
            "C. Indicar amablemente que no cuento con la información que solicita."
        ],
        answer: "B" // Corregido según la tabla de respuestas proporcionada (B). Nota: Esta pregunta (51) parece idéntica a la 48, pero la respuesta en la tabla es diferente (A vs B). Usaré la de la tabla para cada número.
    },
    {
        question: `52. A su dependencia ingresó una nueva funcionaria: reservada e indiferente. No habla ni se relaciona con nadie. Después de dos meses de su ingreso, aprovechando el aniversario de la entidad, el jefe organiza varias actividades grupales. Sin embargo, durante la reunión de organización de las tareas, se presenta un conflicto entre un compañero y la nueva funcionaria. Ante esa situación, usted:`,
        options: [
            "A. Simplemente se convierte en un espectador del tema y no se involucra para no tener inconvenientes con ninguno de los dos.",
            "B. Se acerca a los dos y se comunica informándoles la importancia de cada uno para el logro de los resultados del equipo.",
            "C. Se retira de la reunión y le reporta a su superior lo acontecido para que él se encargue del tema.",
            "D. Se comunica directamente con la funcionaria nueva, pues considera que mejorando su sociabilidad se supera el inconveniente."
        ],
        answer: "B" // Corregido según la tabla de respuestas proporcionada (B). Nota: Esta pregunta (52) parece idéntica a la 49, y la respuesta en la tabla es la misma (B).
    },
    {
        question: `53. Desde hace un mes, dos miembros de su equipo de trabajo tienen conflictos personales que afectan el cumplimiento de sus funciones. Una de ellas indica que la otra no la apoya, recargándole el trabajo. Como líder del equipo, para atender esta situación se asegura de:`,
        options: [
            "A. Atender personalmente escuchando con respeto y cortesía a las funcionarias, para mitigar las situaciones de tensión que existe entre ellas.",
            "B. Organizar reuniones con su equipo de trabajo implementando técnicas de negociación dinámicas.",
            "C. Implementar acciones para que las funcionarias comprendan que trabajan en función de los mismos objetivos y planes y los apropien.",
            "D. Direccionar a Gestión Humana, solicitando a esta dependencia tome las medidas pertinentes."
        ],
        answer: "C"
    },
    {
        question: `54. Durante los últimos seis (6) meses he estado a cargo de la ejecución de un proyecto con el cual se busca mejorar las herramientas tecnológicas de la entidad. Los directivos solicitan una reunión para conocer los avances. Durante la implementación, encuentro que se ha perdido información vital para la entrega de los avances. Frente a esta situación, decido:`,
        options: [
            "A. Analizar con el equipo de trabajo las razones que generaron el problema.",
            "B. Explicar que la situación presentada interfirió en la obtención de los resultados.",
            "C. Mencionar en detalle las características de la información extraviada."
        ],
        answer: "A"
    },
    {
        question: `55. La entidad donde trabajo está realizando una reestructuración, razón por la cual me han trasladado a otra sede. Aunque es el mismo nivel de empleo, algunas funciones han cambiado y el equipo asignado tiene más de diez (10) años de servicio. Mi jefe me indica que debo ponerme al día con los asuntos de mi nueva posición rápidamente. Al sentirme deshabituado con algunas funciones, he decidido:`,
        options: [
            "A. Dedicar tiempo extra a mi jornada laboral para finalizar las tareas pendientes.",
            "B. Revisar mis conocimientos junto con la experiencia de mi equipo de trabajo sobre este tema.",
            "C. Solicitar la asignación de un asistente para que me apoye en el buen funcionamiento de mi cargo."
        ],
        answer: "B"
    },
    {
        question: `56. La secretaria de gerencia debe programar una reunión extraordinaria con directivos de la empresa, algunos de los cuales son distantes y poco flexibles con sus agendas. Se espera que la secretaria:`,
        options: [
            "A. Le informe amablemente a los directivos el horario de la reunión y que es necesario que ellos estén ahí, pues se van a tratar temas muy delicados.",
            "B. Llegue a un consenso en la organización del horario de cada uno de los directivos con el fin de originar un espacio común para que se dé la reunión.",
            "C. Busque el espacio oportuno con cada uno de los directivos, para explicar de forma respetuosa lo sucedido y así poder generar el cumplimiento de su tarea."
        ],
        answer: "C"
    },
    {
        question: `57. En una entidad, en los últimos seis (6) meses se han implementado diversas estrategias para mejorar la atención al ciudadano, pero el porcentaje de quejas no ha disminuido. Como encargado de evaluar la situación, considero importante incluir:`,
        options: [
            "A. El tiempo de implementación de las estrategias y los responsables.",
            "B. El tipo de quejas presentadas y las estrategias de mejoramiento utilizadas.",
            "C. La cantidad de quejas y los recursos con los que cuenta la entidad para dar respuesta."
        ],
        answer: "B"
    },
    {
        question: `58. Usted ha ingresado hace poco como auxiliar administrativo en la entidad. Debido al alto volumen de trabajo, su capacitación fue breve y desea conocer más a fondo las actividades misionales. Para estar actualizado sobre las actividades misionales, usted:`,
        options: [
            "A. Consulta los datos que necesita directamente con las personas que trabajan en las áreas misionales.",
            "B. Consulta la información aportada durante la capacitación, así como en el sitio web de la entidad.",
            "C. Investiga en los repositorios y documentación institucional sobre las actividades misionales de la entidad."
        ],
        answer: "C"
    },
    {
        question: `59. Desde hace tres (3) semanas, su jefe le ha encargado funciones de archivo y organización de la información que no corresponden a su cargo. Aunque las realiza, considera injusto el retraso que esto genera en sus tareas habituales. Para solucionar esta situación, decide:`,
        options: [
            "A. Solicitar que otros compañeros también realicen las actividades para que todos estén en igualdad de condiciones.",
            "B. Informar que las tareas asignadas son muchas y que está dejando de hacer otras más importantes.",
            "C. Proponer que se amplíe el plazo o reasignen por un tiempo algunas actividades para cumplir sin inconvenientes."
        ],
        answer: "C"
    },
    {
        question: `60. Una entidad pública realiza modificaciones internas, extinguiendo una dependencia y creando una nueva. Usted es designado para recibir a dos profesionales que desempeñaban funciones en la dependencia desaparecida. La mejor manera de acogerlos es:`,
        options: [
            "A. Informarse de las funciones que cumplían y pedirles informes.",
            "B. Indagar sobre las capacidades de los profesionales para que empiecen a realizar sus funciones desde la reestructuración.",
            "C. Reunirse con ellos para que le expliquen sus actividades en la anterior dependencia y cómo las implementarán ahora."
        ],
        answer: "C"
    },
    {
        question: `61. Usted debe elaborar un documento que resuma las actividades del último mes para que la nueva coordinadora conozca las funciones del equipo. Al buscar documentación en la oficina de la coordinación, encuentra una lista de contratistas a quienes NO se les renovará el contrato el próximo mes, incluyendo a un compañero cercano. Ante esta situación, usted:`,
        options: [
            "A. Decide esperar a que la coordinadora le comunique la novedad a su compañero.",
            "B. Comunica lo observado de inmediato a su compañero pidiéndole su discreción.",
            "C. Sugiere a su compañero que vaya buscando otro empleo sin explicarle el motivo."
        ],
        answer: "A"
    },
    {
        question: `62. Un usuario ha comunicado su inconformidad debido a que sigue sin recibir respuesta del derecho de petición radicado hace 30 días. En este, solicitaba información que debería estar disponible en la página web de la entidad, pero afirma que NO es visible por dificultades técnicas. Con el fin de ofrecerle la información al usuario acerca del derecho de petición que radicó días atrás, usted:`,
        options: [
            "A. Le brinda atención buscando el radicado de su solicitud y le informa sobre la respuesta que está exigiendo.",
            "B. Le indaga sobre el requerimiento y le recomienda que tenga en cuenta los tiempos de respuesta oportuna.",
            "C. Le comunica que el área responde por otros procesos y le manifiesta su intención de indagar por su trámite."
        ],
        answer: "A"
    },
    {
        question: `63. Como parte de sus nuevas responsabilidades, su jefe le ha solicitado liderar y dar continuidad a un proyecto interrumpido, para lo cual debe implementar una herramienta de última tecnología. Con el fin de cumplir con este requerimiento, ha decidido:`,
        options: [
            "A. Solicitar una capacitación para aprender sobre su manejo.",
            "B. Conocer las razones que sustentan la necesidad de su uso.",
            "C. Explorar con el equipo las sugerencias que tienen sobre su desarrollo."
        ],
        answer: "A"
    },
    {
        question: `64. Usted sabe que un compañero en una entidad pública oculta información durante el ejercicio permanente de Rendición de Cuentas. Frente a esto usted:`,
        options: [
            "A. Decide guardar silencio para no meterse en problemas.",
            "B. Da informe a las autoridades competentes puesto que está violando el principio de transparencia.",
            "C. Habla con su compañero instándolo a modificar su conducta."
        ],
        answer: "B"
    },
    {
        question: `65. Su jefe le solicita hacer un plan de mejoramiento basado en resultados del Sistema de Gestión de Calidad, pero usted desconoce el informe y se cruza con una actividad programada. Para desarrollar la tarea:`,
        options: [
            "A. Indaga para ampliar la información requerida.",
            "B. Establece la fecha de entrega del informe.",
            "C. Prioriza la urgencia de las acciones.",
            "D. Plantea las acciones de mejora solicitadas."
        ],
        answer: "A"
    },
    {
        question: `66. Dentro de las asesorías que usted brinda a una dependencia, ha encontrado que el líder del proyecto no cumple con normas y procedimientos establecidos. Ante la situación usted:`,
        options: [
            "A. No dice nada ya que desde el principio dejó claras las consecuencias.",
            "B. Habla con el líder del proyecto y le explica la importancia de cumplir con los procedimientos.",
            "C. Solicita que cambien al líder del proyecto por posibles implicaciones legales."
        ],
        answer: "B"
    },
    {
        question: `67. Sus nuevas funciones implican trabajo interdisciplinario con áreas de las que posee poco conocimiento. Para desarrollar un buen trabajo, ha decidido:`,
        options: [
            "A. Obtener información relevante sobre ellas para entender cómo ajustar el trabajo de su área.",
            "B. Establecer vínculos entre profesionales de diferentes disciplinas para validar puntos de vista.",
            "C. Comprender la cultura organizacional para generar propuestas acordes al entorno laboral."
        ],
        answer: "B"
    },
    {
        question: `68. Usted es el encargado de logística de una entidad y debe realizar la entrega de unos estantes para una feria empresarial. El funcionario encargado del acarreo no ha podido llegar a la hora determinada por demoras en otra entrega. En este caso es pertinente que usted:`,
        options: [
            "A. Ubique al conductor para establecer nuevos tiempos de entrega y coordinar con el cliente.",
            "B. Organice con otros conductores el proceso de entrega para cumplir con lo establecido.",
            "C. Realice los procesos de sanción establecidos para la entidad en caso de incumplimiento."
        ],
        answer: "B"
    },
    {
        question: `69. Durante una reunión con la Junta Directiva, se evidencia que su proyecto incumple el cronograma por dificultades en recursos, disponibilidad del personal y demanda de tiempo extra. Para informar a los funcionarios sobre este encuentro, decide:`,
        options: [
            "A. Enviar un correo indicando el nuevo plan de trabajo para cumplir las metas.",
            "B. Citar mediante un oficio a una reunión que permita identificar posibles soluciones.",
            "C. Compartir un comunicado recordando las consecuencias de mantener el retraso."
        ],
        answer: "B"
    },
    {
        question: `70. Uno de sus compañeros le reporta a última hora una dificultad que puede ocasionar un problema de salubridad comunitaria, generándole una sobrecarga laboral e interfiriendo con sus vacaciones. Su jefe le exige dar solución inmediata. Ante esto, usted ha decidido:`,
        options: [
            "A. Diseñar un comunicado a las entidades aclarando la situación.",
            "B. Solicitar a su compañero que proyecte el comunicado debido a su responsabilidad en la demora.",
            "C. Realizar una propuesta de comunicado para que su compañero realice observaciones."
        ],
        answer: "C"
    },
    {
        question: `71. Debido a la alta probabilidad de generación de enfermedades, su jefe le ha solicitado desplazarse a las sedes de diferentes entidades y municipios del departamento para evaluar una situación de salubridad. Ante esta situación, decido:`,
        options: [
            "A. Presentar un cronograma de reuniones antes de viajar para la elaboración de un plan de contingencia.",
            "B. Proponer que un compañero viaje en mi reemplazo porque estoy a cargo de un proyecto de mayor impacto.",
            "C. Determinar fechas de viaje que no interfieran con su periodo de vacaciones previamente aprobado."
        ],
        answer: "A"
    },
    {
        question: `72. Las directivas de la entidad han iniciado una campaña para evaluar procesos y metodologías, buscando mejorar los servicios. La nueva metodología de gestión de indicadores carece de validación definitiva por falta de evidencia. Para optimizar los resultados de esta iniciativa, decido:`,
        options: [
            "A. Realizar una evaluación que permita identificar las posibles causas de esta situación.",
            "B. Retomar una parte de la metodología anterior para garantizar el alcance de las metas.",
            "C. Revisar las directrices que los superiores brinden al respecto para ajustarlas en su trabajo."
        ],
        answer: "A"
    },
    {
        question: `73. Al finalizar una reunión con la gerencia, se informa que el presupuesto del proyecto se redujo y debe finalizarse en el menor tiempo posible, priorizando objetivos de mayor impacto. Ante este requerimiento, decido:`,
        options: [
            "A. Disponer de los recursos para desarrollar la mayor cantidad de actividades posibles.",
            "B. Centrar las actividades del equipo en las metas próximas a lograrse.",
            "C. Ordenar los objetivos del proyecto para focalizar las actividades en los más relevantes."
        ],
        answer: "C"
    },
    {
        question: `74. En su lugar de trabajo se están presentando rumores y comentarios por los errores de un compañero, lo que ha generado reprocesos y alterado el ambiente laboral. Ante esta situación:`,
        options: [
            "A. Al escuchar los comentarios, decide hablar sobre la experiencia que ha tenido con el compañero.",
            "B. Les da poca importancia a los comentarios, dedicándose únicamente a trabajar.",
            "C. Escucha los comentarios y luego se los comunica a su compañero para entenderlo.",
            "D. Habla directamente con la persona implicada para conocer su versión y buscar soluciones."
        ],
        answer: "D"
    },
    {
        question: `75. Usted ha sido designado para orientar un evento institucional que divulgará las actividades de la CNSC respecto a la evaluación del mérito. Los colaboradores asignados son recién vinculados. Para organizar el evento, usted prefiere:`,
        options: [
            "A. Realizar una actividad para conocer a los nuevos colaboradores y asignarles tareas acordes a sus capacidades.",
            "B. Distribuir las mismas labores entre todos para una división igualitaria del trabajo.",
            "C. Organizar a los colaboradores según sus intereses para mantenerlos motivados."
        ],
        answer: "A"
    },
    {
        question: `76. Le delegan redistribuir actividades grupales para mejorar la percepción de calidad del servicio, pero algunos compañeros prefieren trabajar de manera independiente. Aunque acepta el reto, decide:`,
        options: [
            "A. Persuadir a un compañero de confianza para que realice la labor por usted.",
            "B. Asignar actividades según los gustos personales de cada compañero.",
            "C. Solicitar ideas y propuestas a los compañeros para concertar las actividades."
        ],
        answer: "C"
    },
    {
        question: `77. Uno de los retos en su nuevo puesto es compartir adecuadamente con un equipo multigeneracional (miembros con más de 10 años de servicio y nuevos). Para ello, cree necesario:`,
        options: [
            "A. Integrar las experiencias de unos con la innovación de otros.",
            "B. Plantear objetivos de trabajo según las habilidades individuales.",
            "C. Mantener un diálogo claro y directo con todo el equipo."
        ],
        answer: "A"
    },
    {
        question: `78. En su área, los funcionarios nuevos tardan mucho en adaptarse a los procesos y cometen errores por desconocimiento de protocolos, afectando las metas. Ante los inconvenientes con el sistema de información, usted opta por:`,
        options: [
            "A. Entregar manuales de uso y esperar a que surjan dudas en una reunión.",
            "B. Compartir una presentación del proceso y sugerir que estudien los aspectos complejos.",
            "C. Integrarse con los nuevos compañeros para comprender cómo hacer más eficiente su labor."
        ],
        answer: "C"
    },
    {
        question: `79. En su dependencia se organiza una celebración importante y se solicita la colaboración de todos los funcionarios, distribuidos en grupos. Para realizar las actividades asignadas a su grupo, usted:`,
        options: [
            "A. Acuerda con sus compañeros las actividades necesarias y distribuye responsabilidades por consenso.",
            "B. Informa las actividades que realizará dentro de su jornada habitual y deja que los demás asignen el resto.",
            "C. Consulta con sus compañeros más cercanos cómo organizar las actividades según sus sugerencias."
        ],
        answer: "A"
    },
    {
        question: `80. Tras una reunión con la Junta Directiva, los directivos expresan preocupación por el retraso en su proyecto. Para tranquilizarlos, usted manifiesta que:`,
        options: [
            "A. Confía en las habilidades del equipo para alcanzar los tiempos esperados.",
            "B. Cree que puede esforzarse más para ponerse al día.",
            "C. Considera que contar con apoyo extra ayudará a recuperar el atraso."
        ],
        answer: "C"
    },
    {
        question: `81. La entidad donde trabajo está realizando una reestructuración, razón por la cual me han trasladado a otra sede. A pesar de que es el mismo nivel de empleo, algunas de mis funciones y responsabilidades han cambiado y el equipo de trabajo que me ha sido asignado está conformado por servidores que tienen más de diez (10) años de servicio en la entidad. Mis nuevas funciones implican el trabajo interdisciplinario con otras áreas de las que poseo poco conocimiento. Para desarrollar un buen trabajo, he decidido:`,
        options: [
            "A. Obtener información relevante sobre ellas para entender cómo ajustar el trabajo de mi área.",
            "B. Establecer vínculos entre los profesionales de las diferentes disciplinas para validar los puntos de vista.",
            "C. Comprender la cultura organizacional para generar propuestas acordes al entorno laboral."
        ],
        answer: "B"
    },
    {
        question: `82. Usted ha sido designado para orientar un evento institucional que divulgará las actividades de la CNSC respecto a la evaluación del mérito. Los colaboradores asignados son recién vinculados. Para organizar el evento, usted prefiere:`,
        options: [
            "A. Realizar una actividad para conocer a los nuevos colaboradores y asignarles tareas acordes a sus capacidades.",
            "B. Distribuir las mismas labores entre todos para una división igualitaria del trabajo.",
            "C. Organizar a los colaboradores según sus intereses para mantenerlos motivados."
        ],
        answer: "A"
    },
    {
        question: `83. En su lugar de trabajo se están presentando rumores y comentarios por los errores de un compañero, lo que ha generado reprocesos y alterado el ambiente laboral. Ante esta situación:`,
        options: [
            "A. Al escuchar los comentarios, decide hablar sobre la experiencia que ha tenido con el compañero.",
            "B. Les da poca importancia a los comentarios, dedicándose únicamente a trabajar.",
            "C. Escucha los comentarios y luego se los comunica a su compañero para entenderlo.",
            "D. Habla directamente con la persona implicada para conocer su versión y buscar soluciones."
        ],
        answer: "D"
    },
    {
        question: `84. Tras una reunión con la Junta Directiva, los directivos expresan preocupación por el retraso en su proyecto. Para tranquilizarlos, usted manifiesta que:`,
        options: [
            "A. Confía en las habilidades del equipo para alcanzar los tiempos esperados.",
            "B. Cree que puede esforzarse más para ponerse al día.",
            "C. Considera que contar con apoyo extra ayudará a recuperar el atraso."
        ],
        answer: "C"
    }
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
