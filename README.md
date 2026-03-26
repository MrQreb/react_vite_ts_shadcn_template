# React + TypeScript + Vite - Project Template

Un cascaron completo para crear proyectos modernos con **React 19**, **TypeScript**, **Vite** y un conjunto de librerías profesionales.

##  Características

- **Vite** - Build tool ultrarrápido con HMR
- **TypeScript** - Tipado estático para mayor seguridad
- **ESLint** - Linting automático con reglas recomendadas
- **React Compiler** - Optimización automática de componentes

## Librerías Incluidas

| Librería | Versión | Descripción |
|----------|---------|-------------|
| **Shadcn** | Latest | Componentes UI basados en Tailwind |
| **Tailwind CSS** | v4.22 | Framework de estilos utility-first |
| **React** | v19 | Librería de UI |
| **Zod** | v4 | Validación de esquemas TypeScript |
| **React Hook Form** | v7.2 | Gestión de formularios |
| **TanStack Query** | v5.95 | Fetching y caching de datos |
| **TanStack Router** | v1.16 | Enrutamiento moderno |
| **Zustand** | v5.0 | Gestión de estado global |
| **TanStack Table** | v8.0 | Componentes de tablas avanzadas |

## Iniciar proyecto

### Requisitos Previos
- Node.js 18+ instalado
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd directory

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

### Build para Producción

```bash
# Compilar proyecto
npm run build

# Ver preview de producción
npm run preview
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm run lint` - Ejecuta ESLint
- `npm run preview` - Vista previa del build

## ESLint - Configuración Avanzada

Para proyectos en producción, habilita **type-aware lint rules**:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
```

### Plugins React Recomendados

```js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  {
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
  },
])
```

## Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/         # Páginas de la aplicación
├── hooks/         # Custom hooks
├── store/         # Estado global (Zustand)
├── api/           # Configuración de queries (TanStack Query)
├── lib/           # Utilidades y helpers
└── App.tsx        # Componente raíz
```

