# ⚽ Mundial FIFA 2026 App

Aplicación web progresiva (PWA) para consultar toda la información del **Mundial FIFA 2026**: calendario, grupos, posiciones, eliminatorias y equipos. Instalable en celular desde el navegador, sin backend — toda la data está embebida como JSON.

## 📋 Características

- **Inicio**: portada con animación de estadio nocturno y acceso rápido a grupos y partidos de hoy
- **Grupos**: 12 grupos (A–L) con sus 4 equipos cada uno; detalle por grupo con tabla de posiciones y partidos
- **Calendario**: los 104 partidos ordenados por fecha, con filtros por fase (grupos, dieciseisavos, octavos, cuartos, semifinales, tercer puesto, final) y vista de "partidos de hoy"
- **Eliminatorias**: árbol de llaves visual desde dieciseisavos hasta la final
- **Equipos**: listado de los 48 participantes con buscador y fichas individuales con estadísticas
- **Clasificación general**: tabla de posiciones acumulada de toda la fase de grupos
- **Zona horaria**: selector de husos horarios (países de América y España) para ajustar los horarios de los partidos a tu localidad
- **Marcadores editables**: puedes ir cargando los resultados de los partidos y las posiciones se recalculan automáticamente (guardado en `localStorage`)
- **PWA**: instalable en celular, funciona sin conexión gracias al service worker

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | Interfaz de usuario |
| Vite | 8 | Bundler y servidor de desarrollo |
| Tailwind CSS | 4 | Estilos y diseño responsive |
| React Router DOM | 7 | Navegación SPA |
| vite-plugin-pwa | 1.3 | Progressive Web App (service worker, manifest) |
| Workbox | 7.4 | Caché offline |

## 🗂️ Estructura del Proyecto

```
mundial-app/
├── public/                 # Assets estáticos (iconos, favicon)
├── src/
│   ├── App.jsx             # Rutas y layout principal
│   ├── main.jsx            # Punto de entrada
│   ├── index.css           # Estilos globales (Tailwind)
│   ├── data/               # Datos embebidos en JSON
│   │   ├── teams.json      # 48 equipos (nombre, grupo)
│   │   ├── matches.json    # 104 partidos (fecha, hora, estadio, marcadores)
│   │   ├── groups.json     # 12 grupos (A–L)
│   │   ├── stadiums.json   # 16 estadios (nombre, ciudad, país, UTC)
│   │   └── timezones.json  # Husos horarios por país/región
│   ├── components/         # Componentes reutilizables
│   │   ├── MatchCard.jsx   # Tarjeta de partido con inputs de marcador
│   │   ├── StandingsTable.jsx # Tabla de posiciones por grupo
│   │   └── TimezoneSelector.jsx # Selector de zona horaria
│   ├── context/            # Contexto global de la app
│   │   └── WorldCupContext.jsx # Proveedor de scores y zona horaria
│   ├── hooks/              # Hooks personalizados
│   │   ├── useScores.jsx   # Gestión de marcadores (localStorage)
│   │   └── useTimezone.jsx # Gestión de zona horaria (localStorage)
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Home.jsx        # Pantalla de inicio
│   │   ├── Groups.jsx      # Listado de grupos
│   │   ├── GroupDetail.jsx # Detalle de un grupo
│   │   ├── Calendar.jsx    # Calendario de partidos
│   │   ├── Knockout.jsx    # Eliminatorias
│   │   ├── Standings.jsx   # Clasificación general
│   │   ├── Teams.jsx       # Listado de equipos
│   │   └── TeamDetail.jsx  # Detalle de un equipo
│   └── utils/              # Utilidades
│       ├── data.js         # Carga y normalización de datos JSON
│       ├── standings.js    # Cálculo de posiciones (3 pts victoria, 1 empate)
│       └── timezone.js     # Conversión de horarios por zona horaria
├── vite.config.js          # Configuración de Vite y PWA
├── eslint.config.js        # Configuración de ESLint
├── package.json            # Dependencias y scripts
└── README.md
```

## 🚀 Instalación y Uso Local

### Requisitos
- Node.js 18 o superior
- npm

### Pasos

1. **Clonar o entrar al directorio del proyecto**:
   ```bash
   cd mundial-app
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```
   La app estará disponible en `http://127.0.0.1:3000`.

4. **Build para producción**:
   ```bash
   npm run build
   ```
   El resultado se genera en la carpeta `dist/`.

5. **Previsualizar el build**:
   ```bash
   npm run preview
   ```

6. **Lint**:
   ```bash
   npm run lint
   ```

## 🗺️ Rutas de la Aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio — portada del Mundial |
| `/grupos` | Listado de los 12 grupos |
| `/grupos/:letra` | Detalle de un grupo (posiciones y partidos) |
| `/calendario` | Calendario de todos los partidos con filtros |
| `/clasificacion` | Clasificación general de la fase de grupos |
| `/eliminatorias` | Árbol de llaves de la fase final |
| `/equipos` | Listado de los 48 equipos con buscador |
| `/equipos/:nombre` | Detalle de un equipo con sus partidos y estadísticas |

## 📊 Datos del Mundial

- **48 equipos** participantes
- **12 grupos** (A–L) de 4 equipos cada uno
- **104 partidos** en total (fase de grupos + eliminatorias)
- **16 estadios** en 3 países: Estados Unidos, México y Canadá
- **Fechas**: 11 de junio — 19 de julio de 2026

Los datos se extraen del archivo `Fixture-Copa-Mundial-FIFA-2026_ClasesExcel.xlsx` y se almacenan como JSON estáticos en `src/data/`.

## 📱 PWA (Progressive Web App)

La aplicación es instalable en dispositivos móviles:

1. Abre la app en el navegador del celular
2. Usa el menú del navegador → "Agregar a pantalla de inicio" o "Instalar app"
3. Funciona sin conexión gracias al service worker (cacheo de archivos estáticos)

## 🚢 Despliegue

### GitHub Pages

El proyecto incluye un workflow de GitHub Actions (`.github/workflows/deploy.yml`) que despliega automáticamente a GitHub Pages al hacer push a la rama `main`.

### Otros proveedores estáticos

El build es estático (`npm run build`), por lo que puede desplegarse en:
- Netlify (drag & drop de la carpeta `dist/`)
- Vercel
- GitHub Pages
- Cualquier hosting de archivos estáticos

**Nota**: Vite está configurado con `base: '/mundial-2026/'`. Si desplegas en un subdirectorio diferente, actualiza esta propiedad en `vite.config.js`.

## 🧑‍💻 Desarrollo

### Agregar o modificar datos

Los datos viven en `src/data/` como archivos JSON. Para actualizar:
1. Edita el archivo JSON correspondiente (`teams.json`, `matches.json`, etc.)
2. Reinicia el servidor de desarrollo

### Cálculo de posiciones

- Victoria: 3 puntos
- Empate: 1 punto
- Derrota: 0 puntos
- Desempate: diferencia de gol, luego goles a favor

Los marcadores se guardan en `localStorage` bajo la clave `mundial2026_scores`.

## 📄 Licencia

Este proyecto es de uso educativo/personal. No está afiliado oficialmente con la FIFA.

---

**Mundial FIFA 2026** — Estados Unidos, México y Canadá • 11 junio – 19 julio 2026