import type { RuntimeValue } from '../language/interpreter';

export type Locale = 'qu' | 'es';

export type LocalizedText = Record<Locale, string>;

export type Lesson = {
  id: string;
  title: LocalizedText;
  objective: LocalizedText;
  tip: LocalizedText;
  code: string;
  expectedOutput: string[];
  expectedEnvironment?: Record<string, RuntimeValue>;
};

export const lessons: Lesson[] = [
  {
    id: 'saludo',
    title: {
      qu: '1. Rimaykuy',
      es: '1. Saludar',
    },
    objective: {
      qu: 'Yachay rimaywan willakuyta qhawachiy.',
      es: 'Aprender a mostrar mensajes con "rimay".',
    },
    tip: {
      qu: 'Yuyaymanay: "rimay" nisqaqa computadorata parlachin.',
      es: 'Piensa que "rimay" hace hablar a la computadora.',
    },
    code: `rimay "Allillanchu, yachaq masi!";`,
    expectedOutput: ['Allillanchu, yachaq masi!'],
  },
  {
    id: 'variables',
    title: {
      qu: '2. Wakichiy',
      es: '2. Guardar datos',
    },
    objective: {
      qu: 'Wakichiywan imakunata waqaychay hinaspa kutichiy.',
      es: 'Guardar datos con "wakichiy" y volver a usarlos.',
    },
    tip: {
      qu: "Variableqa sutiyuq t'antachaq hina kasqa.",
      es: 'Una variable es como una cajita con nombre.',
    },
    code: `wakichiy suti = "Inti";
wakichiy watas = 8;

rimay "Suti: " + suti;
rimay "Watas: " + watas;`,
    expectedOutput: ['Suti: Inti', 'Watas: 8'],
    expectedEnvironment: {
      suti: 'Inti',
      watas: 8,
    },
  },
  {
    id: 'condiciones',
    title: {
      qu: '3. Sichus',
      es: '3. Decidir',
    },
    objective: {
      qu: 'Computadorata huk ñan akllachiy huk kamachiywan.',
      es: 'Tomar decisiones con una condición.',
    },
    tip: {
      qu: 'Cheqaq kaptinqa computadoraqa huk ñanta akllanman.',
      es: 'La computadora puede elegir un camino si la condición es verdadera.',
    },
    code: `wakichiy puntos = 12;

sichus (puntos >= 10) {
  rimay "Atipanki!";
} mana_chayqa {
  rimay "Yapamanta kallpachakuy";
}`,
    expectedOutput: ['Atipanki!'],
    expectedEnvironment: {
      puntos: 12,
    },
  },
  {
    id: 'repeticion',
    title: {
      qu: '4. Muyu',
      es: '4. Repetir',
    },
    objective: {
      qu: 'Achka kuti rurayta mana kutin qillqaspa ruwachiy.',
      es: 'Repetir acciones varias veces.',
    },
    tip: {
      qu: '"Muyu ... kuti" nisqawan kutikachay manaraq kutin qillqaspa.',
      es: 'Usa "muyu ... kuti" cuando quieras repetir sin volver a escribir.',
    },
    code: `wakichiy k = 1;

muyu 4 kuti {
  rimay "Muyuy " + k;
  k = k + 1;
}`,
    expectedOutput: ['Muyuy 1', 'Muyuy 2', 'Muyuy 3', 'Muyuy 4'],
    expectedEnvironment: {
      k: 5,
    },
  },
];
