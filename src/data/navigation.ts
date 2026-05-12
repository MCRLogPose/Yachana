import type { LocalizedText } from './lessons';

export type AppRoutePath =
  | '/'
  | '/laboratorio'
  | '/retos'
  | '/preguntas'
  | '/lecciones'
  | '/perfil';

export type NavigationItem = {
  path: AppRoutePath;
  label: LocalizedText;
  shortDescription: LocalizedText;
};

export const navigationItems: NavigationItem[] = [
  {
    path: '/',
    label: { qu: 'Ñawpaqman', es: 'Bienvenida' },
    shortDescription: {
      qu: 'Sistema nisqapa qhawariynin',
      es: 'Vista general del sistema',
    },
  },
  {
    path: '/laboratorio',
    label: { qu: 'Laboratorio', es: 'Laboratorio' },
    shortDescription: {
      qu: 'Editor, consola, depuracion',
      es: 'Editor, consola y depuración',
    },
  },
  {
    path: '/retos',
    label: { qu: 'Retokuna', es: 'Retos y juegos' },
    shortDescription: {
      qu: 'Pukllaywan yachay',
      es: 'Aprender jugando',
    },
  },
  {
    path: '/preguntas',
    label: { qu: 'Tapukuykuna', es: 'Preguntas' },
    shortDescription: {
      qu: 'IA yanapayninpaq espacio',
      es: 'Espacio de consulta IA',
    },
  },
  {
    path: '/lecciones',
    label: { qu: 'Yachaykuna', es: 'Lecciones' },
    shortDescription: {
      qu: 'Curso teorico y guiado',
      es: 'Curso teórico y guiado',
    },
  },
  {
    path: '/perfil',
    label: { qu: 'Perfil', es: 'Perfil' },
    shortDescription: {
      qu: 'Progreso hinaspa notificaciones',
      es: 'Progreso y notificaciones',
    },
  },
];
