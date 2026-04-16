# Rimay Yachay

Aplicación web educativa para introducir lógica de programación a niños mediante un lenguaje interpretado en quechua.

## Stack

- Frontend: React + Vite + TypeScript
- Editor: Monaco Editor
- Parser: Ohm-JS
- Ejecución: intérprete propio en JavaScript/TypeScript

## Qué incluye esta primera versión

- Un mini lenguaje llamado "RimayScript" con:
  - variables: `wakichiy`
  - impresión: `rimay`
  - condicionales: `sichus ... mana_chayqa`
  - repetición: `muyu ... kuti`
  - expresiones aritméticas y booleanas
- Un `lexer` educativo para visualizar tokens.
- Un `parser` basado en Ohm-JS que genera AST.
- Un intérprete que ejecuta el AST y mantiene memoria de variables.
- Un playground web con lecciones para niños y paneles de salida, tokens, AST y memoria.

## Estructura del proyecto

```text
src/
  App.tsx
  data/lessons.ts
  language/
    ast.ts
    interpreter.ts
    keywords.ts
    lexer.ts
    parser.ts
    runtime.ts
docs/
  prism/
    arquitectura.md
    manual-usuario.md
```

## Ejecutar localmente

1. Instala dependencias:

```powershell
npm.cmd install
```

2. Inicia el entorno de desarrollo:

```powershell
npm.cmd run dev
```

3. Abre la URL que Vite muestre en consola.

## Siguientes pasos recomendados

1. Añadir funciones nativas educativas como dibujar, sonidos y retos.
2. Crear niveles por edad y progreso con badges.
3. Incorporar validaciones pedagógicas que expliquen errores en lenguaje infantil.
4. Agregar persistencia de proyectos y perfiles de estudiantes.
5. Convertir la documentación de `docs/prism` en manuales colaborativos en Prism.
