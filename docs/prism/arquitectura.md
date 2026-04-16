# Arquitectura del sistema

## Visión general

Rimay Yachay es una app web que enseña lógica de programación a niños usando un lenguaje interpretado en quechua. La solución se divide en tres capas:

1. Interfaz didáctica en React.
2. Núcleo del lenguaje en TypeScript.
3. Documentación funcional y pedagógica.

## Módulos técnicos

### 1. Editor y experiencia de aprendizaje

- Usa Monaco Editor para escribir código.
- Presenta lecciones cortas con objetivos y ejemplos.
- Muestra cuatro vistas de aprendizaje:
  - salida del programa
  - tokens del lexer
  - AST generado por el parser
  - estado de memoria del intérprete

### 2. Lexer

- Analiza el texto fuente carácter por carácter.
- Reconoce:
  - palabras clave
  - identificadores
  - números
  - cadenas
  - operadores
  - puntuación
- También registra línea y columna para mensajes de error más claros.

### 3. Parser con Ohm-JS

- Usa una gramática declarativa.
- Convierte el código fuente en un AST.
- La gramática actual soporta:
  - declaraciones de variables
  - reasignación
  - impresión
  - condicionales
  - repetición
  - expresiones aritméticas, comparativas y booleanas

### 4. Intérprete

- Recorre el AST.
- Mantiene una tabla de variables en memoria.
- Ejecuta instrucciones secuencialmente.
- Produce una salida textual para que el estudiante vea el resultado.

## Flujo de ejecución

```text
Código fuente -> Lexer -> Parser (Ohm) -> AST -> Intérprete -> Salida/Estado
```

## Decisiones de diseño

- Se eligió intérprete propio para controlar la pedagogía y los errores.
- Se usó Ohm-JS para acelerar el parser y mantener la gramática legible.
- Se mantuvo Monaco Editor para evitar construir un editor desde cero.
- Se separó `lexer` y `parser` aunque Ohm puede cubrir parte del análisis, porque pedagógicamente es útil mostrar tokens.

## Evolución sugerida

1. Añadir funciones estándar del lenguaje.
2. Implementar scopes por bloque.
3. Crear sistema de retos y progreso.
4. Integrar guardado en backend.
5. Incorporar internacionalización quechua/español.
