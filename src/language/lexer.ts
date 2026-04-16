import { quechuaKeywords } from './keywords';

export type TokenType =
  | 'keyword'
  | 'identifier'
  | 'number'
  | 'string'
  | 'operator'
  | 'punctuation'
  | 'boolean';

export type Token = {
  type: TokenType;
  value: string;
  line: number;
  column: number;
};

const keywordSet = new Set(quechuaKeywords);
const operatorValues = ['==', '!=', '>=', '<=', '&&', '||', '+', '-', '*', '/', '=', '>', '<', '!'];
const punctuationValues = ['(', ')', '{', '}', ';'];

export function tokenize(source: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;
  let line = 1;
  let column = 1;

  const advance = (count = 1) => {
    for (let i = 0; i < count; i += 1) {
      if (source[index] === '\n') {
        line += 1;
        column = 1;
      } else {
        column += 1;
      }
      index += 1;
    }
  };

  while (index < source.length) {
    const char = source[index];

    if (/\s/.test(char)) {
      advance();
      continue;
    }

    if (char === '#') {
      while (index < source.length && source[index] !== '\n') {
        advance();
      }
      continue;
    }

    const startLine = line;
    const startColumn = column;
    const twoChars = source.slice(index, index + 2);

    if (operatorValues.includes(twoChars)) {
      tokens.push({ type: 'operator', value: twoChars, line: startLine, column: startColumn });
      advance(2);
      continue;
    }

    if (operatorValues.includes(char)) {
      tokens.push({ type: 'operator', value: char, line: startLine, column: startColumn });
      advance();
      continue;
    }

    if (punctuationValues.includes(char)) {
      tokens.push({ type: 'punctuation', value: char, line: startLine, column: startColumn });
      advance();
      continue;
    }

    if (char === '"') {
      let value = '';
      advance();
      while (index < source.length && source[index] !== '"') {
        if (source[index] === '\\' && index + 1 < source.length) {
          const escaped = source[index + 1];
          value += escaped === 'n' ? '\n' : escaped;
          advance(2);
        } else {
          value += source[index];
          advance();
        }
      }

      if (source[index] !== '"') {
        throw new Error(`Cadena sin cerrar en la línea ${startLine}, columna ${startColumn}.`);
      }

      advance();
      tokens.push({ type: 'string', value, line: startLine, column: startColumn });
      continue;
    }

    if (/\d/.test(char)) {
      let value = '';
      while (index < source.length && /[\d.]/.test(source[index])) {
        value += source[index];
        advance();
      }

      tokens.push({ type: 'number', value, line: startLine, column: startColumn });
      continue;
    }

    if (/[A-Za-z_ÁÉÍÓÚáéíóúÑñ]/.test(char)) {
      let value = '';
      while (index < source.length && /[A-Za-z0-9_ÁÉÍÓÚáéíóúÑñ]/.test(source[index])) {
        value += source[index];
        advance();
      }

      if (value === 'chiqaq' || value === 'llulla') {
        tokens.push({ type: 'boolean', value, line: startLine, column: startColumn });
      } else if (keywordSet.has(value as (typeof quechuaKeywords)[number])) {
        tokens.push({ type: 'keyword', value, line: startLine, column: startColumn });
      } else {
        tokens.push({ type: 'identifier', value, line: startLine, column: startColumn });
      }
      continue;
    }

    throw new Error(`Símbolo no reconocido "${char}" en la línea ${startLine}, columna ${startColumn}.`);
  }

  return tokens;
}
