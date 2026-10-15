# Plataforma CoopBono

Propuesta comercial con demo interactiva para las cooperativas escolares de Misiones.

## Desarrollo

```sh
npm install
npm run dev
```

## Scripts

- `npm run build`: chequeo de tipos y build de producción en `dist/`
- `npm run preview`: sirve el build localmente
- `npm test`: tests con Vitest

## Despliegue en Vercel

Importá el repositorio en Vercel: detecta Vite automáticamente (`vercel.json` fija build y carpeta `dist`). No requiere variables de entorno.

## Stack

Vite, React, TypeScript, Tailwind CSS, Recharts y Leaflet.
