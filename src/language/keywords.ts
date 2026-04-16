export const QUECHUA_LANGUAGE_ID = 'quechua-logica';

export const quechuaKeywords = [
  'wakichiy',
  'rimay',
  'sichus',
  'mana_chayqa',
  'muyu',
  'kuti',
  'chiqaq',
  'llulla',
] as const;

export const defaultProgram = `wakichiy suti = "Killa";
wakichiy yupay = 3;

rimay "Allillanchu, " + suti;

sichus (yupay > 2) {
  rimay "Yupayqa hatunmi";
} mana_chayqa {
  rimay "Yupayqa uchuyllam";
}

muyu 3 kuti {
  rimay "Yachay kusisqa!";
}`;
