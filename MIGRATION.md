# Migration from react-scripts to Vite

This document outlines the changes made to migrate the Score Calculator project from react-scripts to Vite.

## Changes Made

1. **Dependencies**
   - Removed `react-scripts`
   - Added `vite` and `@vitejs/plugin-react`

2. **Configuration Files**
   - Created `vite.config.ts` with React plugin and GitHub Pages base path
   - Updated `tsconfig.json` for Vite compatibility
   - Created `.env` file for Vite environment variables
   - Updated `.gitignore` to include Vite-specific entries

3. **HTML Entry Point**
   - Moved `index.html` from `public/` to project root
   - Added script tag to load the entry point: `<script type="module" src="/src/index.tsx"></script>`

4. **Scripts**
   - Updated npm scripts in `package.json`:
     - `"build": "vite build"` (was `"build": "react-scripts build"`)
     - `"dev": "vite"` (was `"start": "react-scripts start"`)
     - `"preview": "vite preview"` (new)
     - Removed `"eject": "react-scripts eject"` (not applicable in Vite)
     - Updated `"predeploy"` and `"deploy"` to use `dist` directory instead of `build`

5. **CI/CD Workflows**
   - Updated `.github/workflows/performance-analysis.yml` to serve from `dist` directory instead of `build`

## Benefits of Vite

- Faster development server startup
- Faster hot module replacement (HMR)
- Better TypeScript integration
- Modern ESM-based build system
- Smaller bundle sizes
- Better tree-shaking