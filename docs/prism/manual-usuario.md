# Manual de usuario

## ¿Qué es Rimay Yachay?

Rimay Yachay es un entorno para que niños aprendan lógica de programación usando palabras en quechua. La idea es que el lenguaje se sienta cercano y que los conceptos computacionales aparezcan paso a paso.

## Primer recorrido

1. Abrir la aplicación.
2. Elegir una lección en la barra lateral.
3. Leer la meta y el consejo de la lección.
4. Probar el código del ejemplo.
5. Presionar **Ejecutar**.
6. Revisar la salida, los tokens, el AST o la memoria.

## Comandos disponibles

### Crear una variable

```txt
wakichiy suti = "Killa";
```

### Mostrar un mensaje

```txt
rimay "Allillanchu";
```

### Tomar decisiones

```txt
sichus (puntos >= 10) {
  rimay "Atipanki!";
} mana_chayqa {
  rimay "Yapamanta kallpachakuy";
}
```

### Repetir acciones

```txt
muyu 3 kuti {
  rimay "Yachay!";
}
```

## Cómo leer los paneles

- `Salida`: muestra lo que dice el programa.
- `Tokens`: enseña cómo el lexer separa cada pieza del código.
- `AST`: deja ver la estructura interna del programa.
- `Memoria`: muestra las variables después de ejecutar.

## Errores comunes

- Olvidar `;` al final de una instrucción.
- Usar una variable que todavía no fue creada.
- Escribir una cadena sin cerrar comillas.
- Intentar repetir con un número no entero.

## Recomendaciones pedagógicas

- Empezar con mensajes cortos y variables.
- Continuar con comparaciones sencillas.
- Introducir repeticiones cuando el niño entienda secuencia.
- Usar el panel de tokens y AST como apoyo visual, no como obligación.

## Próximas mejoras del manual

1. Crear capturas de pantalla por lección.
2. Añadir retos imprimibles por nivel.
3. Documentar buenas prácticas para docentes y familias.
