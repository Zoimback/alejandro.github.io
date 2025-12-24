---
applyTo: '**/*.js'
---
# Guía de Estilo - JavaScript Vanilla
## 1. General

Usar const por defecto, let solo si el valor cambia.
Evitar var.
Siempre terminar líneas con ;.
Indentación de 2 espacios.
Nombres descriptivos en camelCase.
```javascript
const userName = "Alex";
let userAge = 25;
```
## 2. Funciones

Preferir funciones flecha para callbacks simples.
Funciones pequeñas, con una sola responsabilidad.
Declarar funciones antes de usarlas (hoisting).
```javascript
// Función flecha
const sumar = (a, b) => a + b;

// Función tradicional
function multiplicar(a, b) {
  return a * b;
}
```

## 3. Objetos y Arrays

Mantener consistencia en comillas (' o ", elegir una).
Comas al final en listas multilinea (trailing comma).
Desestructuración para acceder a propiedades.

```javascript
const persona = {
  nombre: "Alex",
  edad: 25,
};

const { nombre, edad } = persona;

const numeros = [1, 2, 3, 4];
const [primero, segundo] = numeros;
```

## 4. Buenas Prácticas

Evitar console.log en producción.
Manejar errores con try/catch.
Evitar mutar variables globales.
Usar eventos y delegación de manera eficiente.
Documentar funciones con JSDoc si es necesario.

```javascript
/**
 * Suma dos números.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function suma(a, b) {
  return a + b;
}
```
