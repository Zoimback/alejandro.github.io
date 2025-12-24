---
applyTo: '**/*.html'
---

# Guía de Estilo - HTML
## 1. Estructura General

Siempre usar <!DOCTYPE html> al inicio.
Etiqueta <html> con atributo lang.
Encabezado <head> con meta charset="UTF-8" y meta name="viewport".
Orden recomendado dentro de <head>:
```html
<meta> tags

<title>

Links a CSS

Scripts (defer si es posible)

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mi Proyecto</title>
  <link rel="stylesheet" href="styles.css">
  <script src="app.js" defer></script>
</head>
<body>
  <!-- Contenido -->
</body>
</html>
```

## 2. Nomenclatura y Convenciones
Usar kebab-case para clases y id.
Evitar abreviaciones ambiguas.
Preferir class sobre id para estilos y scripts.
Comentarios claros y concisos:

<!-- Sección de navegación principal -->

## 3. Accesibilidad (a11y)
Todos los <img> con alt.
Formularios con <label> vinculados por for.
Evitar usar solo colores para transmitir información.
Usar roles y atributos ARIA cuando sea necesario.


## 4. Buenas Prácticas
Indentación de 2 espacios.
Etiquetas anidadas correctamente.
Evitar atributos de estilo en línea (style="").
Evitar comentarios innecesarios en producción.
Agrupar scripts al final o usar defer.