# Instrucciones para Agentes de IA – Portfolio Alejandro Rodríguez

## Arquitectura General

Este es un **portfolio estático** desplegado en GitHub Pages (ver `CNAME`).
La estructura sigue un patrón clásico de sitio multi-página:

```
index.html          ← Página principal (hero, about, skills, projects, contact)
html/*.html         ← Páginas de detalle de proyectos (api.html, pipeline.html)
css/styles.css      ← Estilos globales (variables, reset, componentes)
css/template.css    ← Estilos para páginas de proyecto
js/scripts.js       ← Lógica: ThemeManager, NavigationManager, TypingEffect
images/{Api,Jenkins,ico}/  ← Recursos gráficos organizados por contexto
```

## Convenciones de Código

Cada extensión tiene su guía en `.github/instructions/`:
- **HTML** → `html.instructions.md`  (estructura, a11y, kebab-case)
- **CSS** → `css.instructions.md`  (variables CSS, rem/em, orden de propiedades)
- **JS** → `javascript.instructions.md`  (const/let, funciones flecha, clases)

### Patrones clave observados

| Aspecto | Convención |
|---------|------------|
| Clases CSS | `kebab-case` (`hero-section`, `project-header`) |
| Variables CSS | Prefijo `--` en `:root` (`--primary-color`, `--bg-color`) |
| JavaScript | Clases ES6 (`ThemeManager`, `NavigationManager`) |
| Iconos | Bootstrap Icons via CDN (`bi bi-*`) |
| Framework CSS | Bootstrap 5 (grid, navbar, botones) |
| Fuentes | Google Fonts: Inter + JetBrains Mono |

## Flujo de Trabajo

1. **Desarrollo local**: abrir `index.html` en navegador o usar Live Server.
2. **Deploy**: push a `main` → GitHub Pages publica automáticamente.
3. No hay build step, bundlers ni tests automatizados.

## Agregar una Nueva Página de Proyecto

1. Copiar `html/template.html` como base.
2. Actualizar `<title>`, contenido y rutas relativas (`../css/`, `../images/`).
3. Añadir assets en `images/<NombreProyecto>/`.
4. Vincular desde `index.html` en la sección `#projects`.

## Notas Importantes

- **Tema claro/oscuro**: controlado por `data-theme` en `<html>` y gestionado por `ThemeManager` en `scripts.js`.
- **Navegación sticky**: usa `id="main-nav"` — evita duplicar IDs.
- **Responsive**: media queries en `styles.css` y `template.css` (breakpoints 991px, 767px).
- Los archivos `.drawio` en `arquitectura/` son diagramas editables; no afectan el sitio.
