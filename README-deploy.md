# Deploy Portfolio React a GitHub Pages

Este proyecto contiene un portafolio profesional desarrollado con React que se despliega automáticamente en GitHub Pages.

## 🚀 Deployment Manual

Para desplegar manualmente a GitHub Pages:

```bash
cd portfolio-react
npm run deploy
```

Este comando:
1. Ejecuta `npm run build` para crear la versión de producción
2. Usa `gh-pages` para publicar la carpeta `build` en la rama `gh-pages`
3. GitHub Pages sirve automáticamente el contenido de la rama `gh-pages`

## 🔄 Deployment Automático (CI/CD)

El proyecto incluye un workflow de GitHub Actions que despliega automáticamente:

- **Trigger**: Cada push a `main` o `master`
- **Ubicación**: `.github/workflows/deploy-portfolio.yml`
- **URL Final**: https://alejandro-rodriguez.github.io

### Configuración Necesaria en GitHub:

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. Source: **Deploy from a branch**
4. Branch: **gh-pages** / **(root)**
5. Save

O si usas GitHub Actions:

1. Settings → Pages
2. Source: **GitHub Actions**

## 📝 Estructura del Proyecto

```
alejandro.github.io/
├── portfolio-react/          # Aplicación React
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── build/               # Generado por npm run build
├── .github/
│   └── workflows/
│       └── deploy-portfolio.yml
└── README-deploy.md
```

## 🛠️ Comandos Disponibles

```bash
# Desarrollo local
npm start              # Puerto 3001

# Build de producción
npm run build

# Deploy manual a GitHub Pages
npm run deploy

# Test
npm test
```

## 🌐 URLs

- **Desarrollo**: http://localhost:3001
- **Producción**: https://alejandro-rodriguez.github.io

## 📦 Tecnologías

- React 18.2.0
- React Scripts 5.0.1
- gh-pages (deployment)
- GitHub Actions (CI/CD)

---

**Nota**: El primer deployment puede tardar unos minutos en estar disponible después de hacer push.
