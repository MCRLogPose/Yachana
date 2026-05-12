import type { LocalizedText } from './lessons';
import type { AppRoutePath } from './navigation';

export type PlatformSection = {
  path: Exclude<AppRoutePath, '/'>;
  eyebrow: string;
  title: LocalizedText;
  description: LocalizedText;
  bullets: LocalizedText[];
};

export const platformSections: PlatformSection[] = [
  {
    path: '/laboratorio',
    eyebrow: '01',
    title: {
      qu: 'Laboratorio',
      es: 'Laboratorio',
    },
    description: {
      qu: "Kaypi wawakuna qillqanku, purichinku hinaspa programa imayna llamk'asqanta qhawanku.",
      es: 'Aquí las y los estudiantes escriben código, lo ejecutan y observan cómo funciona.',
    },
    bullets: [
      { qu: 'RimayScript editor', es: 'Editor de RimayScript' },
      { qu: 'Consola hinaspa depuracion', es: 'Consola y depuración' },
      { qu: 'Guias utqay ejemplokuna', es: 'Guías y ejemplos rápidos' },
    ],
  },
  {
    path: '/retos',
    eyebrow: '02',
    title: {
      qu: 'Retokuna hinaspa pukllaykuna',
      es: 'Retos y juegos',
    },
    description: {
      qu: 'Pisi pisi misiones, niveles hinaspa atipanakuywan logica yachay aswan kuska kananpaq.',
      es: 'Misiones cortas, niveles y dinámicas de juego para practicar lógica de forma divertida.',
    },
    bullets: [
      { qu: 'Misiones por niveles', es: 'Misiones por niveles' },
      { qu: 'Insignias y puntuacion', es: 'Insignias y puntuación' },
      { qu: 'Cooperativo y comunidad', es: 'Modo colaborativo y comunidad' },
    ],
  },
  {
    path: '/preguntas',
    eyebrow: '03',
    title: {
      qu: 'Tapukuykuna',
      es: 'Preguntas',
    },
    description: {
      qu: 'Chat estilo consulta maypi IAqa qipa tiempo yanapananpaq wakichisqa kanqa.',
      es: 'Un chat estilo asistente donde después podrás conectar un modelo IA para resolver dudas.',
    },
    bullets: [
      { qu: 'Tapuyta qillqay', es: 'Entrada tipo chat' },
      { qu: 'Documentacionmanta yanapay', es: 'Soporte sobre documentación' },
      { qu: 'Pantaykunapa explicacion', es: 'Explicación de errores' },
    ],
  },
  {
    path: '/lecciones',
    eyebrow: '04',
    title: {
      qu: 'Lecciones',
      es: 'Lecciones',
    },
    description: {
      qu: 'Teoriata, conceptos basicos hinaspa simikunata sapanka yachayta hina rikuchin.',
      es: 'Presenta teoría, conceptos base y explicación guiada como un curso progresivo.',
    },
    bullets: [
      { qu: 'Conceptos base', es: 'Conceptos base' },
      { qu: 'Ejemplos explicados', es: 'Ejemplos explicados' },
      { qu: 'Ruta de aprendizaje', es: 'Ruta de aprendizaje' },
    ],
  },
  {
    path: '/perfil',
    eyebrow: '05',
    title: {
      qu: 'Perfil',
      es: 'Perfil',
    },
    description: {
      qu: 'Cuenta vinculayta munaspayki notificaciones, progreso hinaspa yachay ñan qhawayta atinki.',
      es: 'Si decides vincular una cuenta, podrás recibir notificaciones y seguir tu progreso.',
    },
    bullets: [
      { qu: 'Cuenta vinculacion', es: 'Vinculación de cuenta' },
      { qu: 'Progreso qhawariy', es: 'Seguimiento de progreso' },
      { qu: 'Notificaciones', es: 'Notificaciones' },
    ],
  },
];
