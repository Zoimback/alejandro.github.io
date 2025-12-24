---
applyTo: '**/*.css'
---
# Guía de Estilo - CSS
## 1. Estructura General

Separar estilos en archivos .css.
Orden recomendado:
- Reset / Normalize
- Variables CSS
- Tipografía
- Layout
- Componentes
- Utilidades
``` css
/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

## 2. Convenciones

Nombres de clases: kebab-case
Variables CSS: --nombre-variable
Selectores simples, evitando la especificidad excesiva.
Evitar !important salvo casos extremos.
``` css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
}
```

## 3. Organización

Agrupar propiedades por tipo:
- Posicionamiento
- Display / Box model
- Tipografía
- Colores / Backgrounds
- Bordes / Sombras
``` css
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  font-family: 'Roboto', sans-serif;
  color: var(--primary-color);
  background-color: #fff;
  border-bottom: 1px solid #ccc;
}
```

## 4. Buenas Prácticas

Usar rem o em para tipografía y márgenes.
Evitar valores fijos en px salvo excepciones.
Usar flexbox o grid para layouts.
Mantener consistencia en unidades y colores.
Comentarios claros por secciones.