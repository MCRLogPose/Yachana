import type { LocalizedText } from './lessons';

export type CourseDetailSection = {
  heading: LocalizedText;
  body: LocalizedText[];
};

export type CourseExample = {
  title: LocalizedText;
  code: string;
  result: LocalizedText;
};

export type CourseSection = {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  module: LocalizedText;
  subtopics: LocalizedText[];
  points: LocalizedText[];
  details: CourseDetailSection[];
  examples: CourseExample[];
};

export const courseSections: CourseSection[] = [
  {
    id: 'intro',
    title: {
      qu: 'Imataq RimayScript',
      es: 'Qué es RimayScript',
    },
    summary: {
      qu: 'Runasimipi programacionta qallarinapaq rurasqa simi.',
      es: 'Un lenguaje creado para comenzar a programar en quechua.',
    },
    module: {
      qu: 'Modulo 1',
      es: 'Módulo 1',
    },
    subtopics: [
      { qu: 'Imapaqmi kan', es: 'Para qué sirve' },
      { qu: 'Kamachiy ima kasqan', es: 'Qué es una instrucción' },
      { qu: 'Interprete imayna llamkan', es: 'Cómo interpreta el sistema' },
    ],
    points: [
      {
        qu: 'Qillqasqa kamachiykuna computadorman imata ruwananta niyku.',
        es: 'Las instrucciones escritas le dicen a la computadora qué debe hacer.',
      },
      {
        qu: 'Sutilla rimaywan yachayta facilchan wawakunapaq.',
        es: 'Usa palabras cercanas para facilitar el aprendizaje en niñas y niños.',
      },
    ],
    details: [
      {
        heading: { qu: 'RimayScript ima kasqan', es: 'Qué es RimayScript' },
        body: [
          {
            qu: 'RimayScriptqa programa qillqanapaq huk simim. Kay simiqa runasimita qayllachkan yachaq wawakunapaq.',
            es: 'RimayScript es un lenguaje para escribir programas. Está pensado para acercar la programación a estudiantes que aprenden mejor con palabras cercanas.',
          },
          {
            qu: 'Computadoraqa qillqasqa kamachiykunata huk-hukmanta ñawirispan ruran.',
            es: 'La computadora lee y ejecuta las instrucciones una por una.',
          },
        ],
      },
      {
        heading: { qu: 'Imapaq allin', es: 'Por qué es útil' },
        body: [
          {
            qu: 'Wawakunata logica de programacionman yaykuchin mana musuq simiwan manchakuspa.',
            es: 'Permite entrar a la lógica de programación sin que el idioma sea una barrera inicial.',
          },
          {
            qu: 'Yachaqkunaqa secuencias, orden, salida hinaspa datoswan llamkayta riqsinku.',
            es: 'Ayuda a entender secuencias, orden de ejecución, salida y trabajo con datos.',
          },
        ],
      },
    ],
    examples: [
      {
        title: { qu: 'Ñawpaq willakuy', es: 'Primer mensaje' },
        code: 'rimay "Allillanchu";',
        result: {
          qu: 'Computadoraqa "Allillanchu" nisqata consola ukupi qhawachin.',
          es: 'La computadora muestra "Allillanchu" en la consola.',
        },
      },
    ],
  },
  {
    id: 'variables',
    title: {
      qu: 'Wakichiykuna',
      es: 'Variables',
    },
    summary: {
      qu: 'Sutiyuq maytukuna maypi datos waqaychasqa kanku.',
      es: 'Cajitas con nombre donde guardamos datos para reutilizarlos.',
    },
    module: {
      qu: 'Modulo 2',
      es: 'Módulo 2',
    },
    subtopics: [
      { qu: 'Wakichiy qillqay', es: 'Declarar variables' },
      { qu: 'Texto y yupay', es: 'Texto y números' },
      { qu: "Kutichispa llamk'achiy", es: 'Reutilizar valores' },
    ],
    points: [
      {
        qu: 'Sutita churay hinaspa yupay, qillqa utaq cheqaqchaqta waqaychay.',
        es: 'Puedes guardar números, textos o valores verdaderos/falsos.',
      },
      {
        qu: 'Waqaychasqa datokunata kutichispa llamkachiy.',
        es: 'Luego reutilizas esos datos en otras instrucciones.',
      },
    ],
    details: [
      {
        heading: { qu: 'Variable ima kasqan', es: 'Qué es una variable' },
        body: [
          {
            qu: "Variableqa sutiyuq cajita hinam. Chaypi huk valor waqaychasqa kanman: qillqa, yupay utaq huk simi.",
            es: 'Una variable es como una caja con nombre. Allí guardamos un valor: un texto, un número u otro dato.',
          },
          {
            qu: 'Programa ukupi chay valorqa achka kuti llamkachasqa kanman.',
            es: 'Dentro del programa ese valor puede usarse muchas veces.',
          },
        ],
      },
      {
        heading: { qu: 'Imaynataq llamkan', es: 'Cómo se usa' },
        body: [
          {
            qu: 'Ñawpaqta variableta ruwanki. Chaymanta sutinta qayaspa contenido-ninta llamkachinki.',
            es: 'Primero creas la variable. Luego usas su nombre para volver a acceder a su contenido.',
          },
          {
            qu: 'Kayqa allinmi mana sapa kuti kikin dato qillqanapaq.',
            es: 'Esto evita repetir el mismo dato muchas veces.',
          },
        ],
      },
    ],
    examples: [
      {
        title: { qu: 'Suti waqaychay', es: 'Guardar un nombre' },
        code: 'wakichiy suti = "Kusi";\nrimay suti;',
        result: {
          qu: 'Consolaqa "Kusi" nisqata qhawachin.',
          es: 'La consola muestra "Kusi".',
        },
      },
    ],
  },
  {
    id: 'logic',
    title: {
      qu: 'Sichus hinaspa muyu',
      es: 'Condiciones y repeticiones',
    },
    summary: {
      qu: 'Programa imata ruwananta akllachin hinaspa kutichin.',
      es: 'Permiten decidir y repetir acciones dentro del programa.',
    },
    module: {
      qu: 'Modulo 3',
      es: 'Módulo 3',
    },
    subtopics: [
      { qu: 'Cheqaq mana cheqaq', es: 'Verdadero y falso' },
      { qu: 'Akllaykuna', es: 'Toma de decisiones' },
      { qu: 'Muyukuna', es: 'Repeticiones' },
    ],
    points: [
      {
        qu: 'Sichusqa akllachin imaynataq programa purinqa.',
        es: 'Las condiciones permiten elegir qué camino seguirá el programa.',
      },
      {
        qu: 'Muyuqa kutikachin ruranata mana yapamanta qillqaspa.',
        es: 'Los bucles repiten acciones sin volver a escribir lo mismo.',
      },
    ],
    details: [
      {
        heading: { qu: 'Condiciones ima kasqan', es: 'Qué son las condiciones' },
        body: [
          {
            qu: 'Condicionqa tapukuy hinam: cheqaqchu mana cheqaqchu. Sichus cheqaq kaptin, huk ruway purin; mana kaptin, huknin ruway purin.',
            es: 'Una condición funciona como una pregunta: verdadero o falso. Si es verdadera, el programa sigue un camino; si no, sigue otro.',
          },
          {
            qu: 'Kaywan programaqa yachakun akllayta.',
            es: 'Con esto el programa aprende a tomar decisiones.',
          },
        ],
      },
      {
        heading: { qu: 'Repeticiones ima kasqan', es: 'Qué son las repeticiones' },
        body: [
          {
            qu: 'Repeticionqa huk ruwayta achka kuti ruranapaqmi. Mana yapamanta kikin kamachiyta qillqanachu.',
            es: 'Una repetición permite realizar una acción varias veces sin escribir la misma instrucción una y otra vez.',
          },
          {
            qu: 'Muyukunaqa yupay, lista qhaway hinaspa patrones ruraypi ancha allin kanku.',
            es: 'Los bucles son muy útiles para contar, recorrer listas y crear patrones.',
          },
        ],
      },
      {
        heading: { qu: 'Imapaq allin kanku', es: 'Resultados de usarlas' },
        body: [
          {
            qu: 'Condicioneswan programaqa imayna kutichinanmanta yachan. Muyuwanqa aswan utqay, ordenado hinaspa achka ruranata atipan.',
            es: 'Con condiciones el programa puede responder a distintas situaciones. Con repeticiones trabaja de forma más rápida, ordenada y potente.',
          },
        ],
      },
    ],
    examples: [
      {
        title: { qu: 'Sichuswan akllay', es: 'Decidir con condición' },
        code: 'wakichiy puntos = 12;\nsichus (puntos >= 10) {\n  rimay "Atipanki!";\n}',
        result: {
          qu: 'Puntos 10 manta aswan hatun kaptin, consolaqa "Atipanki!" qhawachin.',
          es: 'Si `puntos` es mayor o igual a 10, la consola muestra "Atipanki!".',
        },
      },
      {
        title: { qu: 'Muyuwan yupay', es: 'Contar con repetición' },
        code: 'wakichiy k = 1;\nmuyu 3 kuti {\n  rimay k;\n  k = k + 1;\n}',
        result: {
          qu: 'Consolaqa 1, 2, 3 nisqakunata hukmanta huk qhawachin.',
          es: 'La consola muestra 1, 2 y 3 en orden.',
        },
      },
    ],
  },
];
