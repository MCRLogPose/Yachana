import type { RuntimeValue } from '../language/interpreter';

export type Lesson = {
  id: string;
  title: string;
  objective: string;
  tip: string;
  code: string;
  expectedOutput: string[];
  expectedEnvironment?: Record<string, RuntimeValue>;
};

export const lessons: Lesson[] = [
  {
    id: 'saludo',
    title: '1. Rimaykuy',
    objective: 'Aprender a mostrar mensajes con "rimay".',
    tip: 'Piensa que "rimay" hace hablar a la computadora.',
    code: `rimay "Allillanchu, yachaq masi!";`,
    expectedOutput: ['Allillanchu, yachaq masi!'],
  },
  {
    id: 'variables',
    title: '2. Wakichiy',
    objective: 'Guardar datos con "wakichiy" y volver a usarlos.',
    tip: 'Una variable es como una cajita con nombre.',
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
    title: '3. Sichus',
    objective: 'Tomar decisiones con una condición.',
    tip: 'La computadora puede elegir un camino si la condición es verdadera.',
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
    title: '4. Muyu',
    objective: 'Repetir acciones varias veces.',
    tip: 'Usa "muyu ... kuti" cuando quieras repetir sin volver a escribir.',
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
