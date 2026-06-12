import { Link } from 'react-router-dom'
import { useWorldCup } from '../context/WorldCupContext'

// ─── Team colors for the 5 players ───
const PLAYERS = [
  { id: 'fra',  name: 'Francia',   jersey: '#1a3c6e',  shorts: '#0f2440', skin: '#e8c5a0', hair: '#4a2c1a', accent: '#ffffff' },
  { id: 'arg',  name: 'Argentina', jersey: '#75aadb',  shorts: '#1a1a1a', skin: '#d4a574', hair: '#3a2210', accent: '#ffffff', stripes: true },
  { id: 'nor',  name: 'Noruega',   jersey: '#c8102e',  shorts: '#1a1a1a', skin: '#e8c5a0', hair: '#c8a060', accent: '#ffffff' },
  { id: 'por',  name: 'Portugal',  jersey: '#c8102e',  shorts: '#006633', skin: '#d4a574', hair: '#3a2210', accent: '#ffd700' },
  { id: 'bra',  name: 'Brasil',    jersey: '#f7d917',  shorts: '#003f87', skin: '#c8956a', hair: '#2a1a0a', accent: '#009639' },
]

function PlayerFigure({ p, index }) {
  const jersey = p.stripes
    ? `url(#argStripes${index})`
    : p.jersey
  const zIndex = index === 2 ? 10 : index === 1 || index === 3 ? 8 : 6
  const rot = index === 0 ? -4 : index === 4 ? 4 : 0

  return (
    <svg
      viewBox="0 0 70 140"
      className="w-14 sm:w-[70px] h-auto drop-shadow-xl"
      style={{
        marginLeft: index === 0 ? 0 : '-1.25rem',
        zIndex,
        transform: `rotate(${rot}deg) translateY(${index === 2 ? -4 : 0}px)`,
        filter: `brightness(${index === 2 ? 1.1 : 0.95}) drop-shadow(0 4px 12px rgba(0,0,0,0.5))`,
      }}
    >
      {p.stripes && (
        <defs>
          <pattern id={`argStripes${index}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(90)">
            <rect width="4" height="8" fill="#75aadb"/>
            <rect x="4" width="4" height="8" fill="#ffffff"/>
          </pattern>
        </defs>
      )}
      {/* Head */}
      <circle cx="35" cy="18" r="13" fill={p.skin} />
      {/* Hair */}
      <ellipse cx="35" cy="12" rx="13" ry="7" fill={p.hair} />
      {/* Neck */}
      <rect x="32" y="29" width="6" height="4" fill={p.skin} />
      {/* Body/Jersey */}
      <path d="M18 33 Q18 32 20 32 L50 32 Q52 32 52 33 L54 70 L16 70 Z" fill={jersey} />
      {/* Collar */}
      <rect x="28" y="31" width="14" height="4" rx="2" fill={p.accent} />
      {/* Shorts */}
      <rect x="18" y="70" width="34" height="18" rx="3" fill={p.shorts} />
      {/* Left arm */}
      <rect x="6" y="36" width="14" height="8" rx="3" fill={p.skin} transform="rotate(-20 13 40)" />
      <rect x="4" y="43" width="8" height="18" rx="3" fill={p.skin} transform="rotate(-10 8 52)" />
      {/* Right arm */}
      <rect x="50" y="36" width="14" height="8" rx="3" fill={p.skin} transform="rotate(20 57 40)" />
      <rect x="58" y="43" width="8" height="18" rx="3" fill={p.skin} transform="rotate(10 62 52)" />
      {/* Left leg */}
      <rect x="21" y="88" width="10" height="28" rx="4" fill={p.skin} transform="rotate(-8 26 102)" />
      {/* Right leg */}
      <rect x="39" y="88" width="10" height="28" rx="4" fill={p.skin} transform="rotate(8 44 102)" />
      {/* Left shoe */}
      <rect x="17" y="114" width="14" height="8" rx="4" fill="#222" transform="rotate(-8 24 118)" />
      {/* Right shoe */}
      <rect x="39" y="114" width="14" height="8" rx="4" fill="#222" transform="rotate(8 46 118)" />
      {/* Jersey number accent */}
      <text x="35" y="58" textAnchor="middle" fontSize="8" fill={p.accent} fontWeight="bold" opacity="0.6">
        {index + 1}
      </text>
    </svg>
  )
}

function StadiumBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Night sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e2a] via-[#141b3d] to-[#1a2840]" />

      {/* Stars */}
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            top: Math.random() * 30 + '%',
            left: Math.random() * 100 + '%',
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            animationDelay: Math.random() * 3 + 's',
          }}
        />
      ))}

      {/* Floodlights - Left */}
      <div className="absolute -top-10 left-0 w-1/3 h-1/2 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 30% 0%, rgba(255,255,240,0.5) 0%, rgba(255,255,240,0.1) 30%, transparent 60%)',
          animation: 'pulseGlow 4s ease-in-out infinite',
        }}
      />
      {/* Floodlights - Center */}
      <div className="absolute -top-10 left-1/4 w-1/2 h-2/3 opacity-70"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,240,0.6) 0%, rgba(255,255,240,0.15) 25%, transparent 55%)',
          animation: 'pulseGlow 5s ease-in-out infinite 1s',
        }}
      />
      {/* Floodlights - Right */}
      <div className="absolute -top-10 right-0 w-1/3 h-1/2 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 70% 0%, rgba(255,255,240,0.5) 0%, rgba(255,255,240,0.1) 30%, transparent 60%)',
          animation: 'pulseGlow 4.5s ease-in-out infinite 0.5s',
        }}
      />

      {/* Beam streaks */}
      <div className="absolute top-0 left-[15%] w-[2px] h-[60%] opacity-10 bg-gradient-to-b from-white via-transparent to-transparent transform -rotate-12" />
      <div className="absolute top-0 right-[20%] w-[2px] h-[55%] opacity-10 bg-gradient-to-b from-white via-transparent to-transparent transform rotate-12" />

      {/* Grass field */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%]"
        style={{
          background: 'linear-gradient(180deg, #1a5c2a 0%, #0f3d1a 30%, #0a2e14 60%, #061f0c 100%)',
        }}
      />
      {/* Grass stripes */}
      <div className="absolute bottom-0 left-0 right-0 h-[35%] overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full"
            style={{
              height: '100%',
              top: 0,
              background: i % 2 === 0
                ? 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)'
                : 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
              clipPath: `polygon(${i * 12.5}% 0%, ${(i + 1) * 12.5}% 0%, ${(i + 1) * 12.5 + 2}% 100%, ${i * 12.5 - 2}% 100%)`,
            }}
          />
        ))}
      </div>

      {/* Fog layer */}
      <div className="absolute bottom-[15%] left-0 right-0 h-[40%]"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(180,200,220,0.07) 30%, rgba(180,200,220,0.12) 50%, rgba(180,200,220,0.05) 70%, transparent 100%)',
          filter: 'blur(20px)',
          animation: 'fogDrift 12s ease-in-out infinite alternate',
        }}
      />

      {/* Light flare overlay */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,220,150,0.08) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}

function GoldTitle() {
  return (
    <div className="relative text-center pt-6 pb-2">
      <h1
        className="text-2xl sm:text-3xl md:text-4xl font-black tracking-widest uppercase leading-tight"
        style={{
          background: 'linear-gradient(180deg, #f7d875 0%, #d4a017 30%, #f7d875 50%, #b8860b 70%, #f7d875 100%)',
          backgroundSize: '100% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 2px 8px rgba(184,134,11,0.6)) drop-shadow(0 1px 3px rgba(0,0,0,0.8))',
          animation: 'goldShimmer 4s ease-in-out infinite',
        }}
      >
        Copa Mundial
        <br />
        FIFA 2026
      </h1>
      <p
        className="text-xs sm:text-sm font-semibold tracking-widest mt-1 uppercase"
        style={{
          color: '#c8a85e',
          textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 0 10px rgba(200,168,94,0.3)',
        }}
      >
        11 de junio — 19 de julio
      </p>
      {/* Decorative line */}
      <div className="flex items-center justify-center gap-2 mt-2">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#d4a017] shadow-[0_0_6px_rgba(212,160,23,0.6)]" />
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent" />
      </div>
    </div>
  )
}

function PlayersRow() {
  return (
    <div className="relative flex justify-center items-end h-28 sm:h-36 overflow-visible px-2" style={{ zIndex: 5 }}>
      <div className="flex items-end justify-center">
        {PLAYERS.map((p, i) => (
          <PlayerFigure key={p.id} p={p} index={i} />
        ))}
      </div>
    </div>
  )
}

const GROUP_LETTERS = ['A','B','C','D','E','F','G','H','I','J','K','L']

function GroupButton({ letter }) {
  return (
    <Link
      to={`/grupos/${letter}`}
      className="block w-full text-left px-3 py-1.5 rounded-md text-xs font-bold tracking-wider uppercase transition-all duration-150 active:translate-y-0.5"
      style={{
        background: 'linear-gradient(180deg, #8a8a8a 0%, #6b6b6b 40%, #5a5a5a 60%, #6b6b6b 100%)',
        color: '#e0e0e0',
        textShadow: '0 1px 2px rgba(0,0,0,0.5)',
        boxShadow: '0 3px 0 #3a3a3a, 0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
        border: '1px solid #4a4a4a',
      }}
    >
      GRUPO {letter}
    </Link>
  )
}

function LeftPanel({ timezone, setTimezone }) {
  return (
    <div className="flex flex-col gap-2">
      {/* INGRESO button (big) */}
      <Link
        to="/grupos"
        className="block w-full text-center py-3 rounded-xl text-sm font-black tracking-widest uppercase transition-all duration-150 active:translate-y-0.5"
        style={{
          background: 'linear-gradient(180deg, #4a9e5e 0%, #3a8a4e 40%, #2d7a3e 60%, #3a8a4e 100%)',
          color: '#ffffff',
          textShadow: '0 1px 3px rgba(0,0,0,0.5)',
          boxShadow: '0 4px 0 #1a5a2a, 0 6px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          border: '1px solid #5aae6e',
        }}
      >
        INGRESO
      </Link>

      {/* Group buttons grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {GROUP_LETTERS.map(l => (
          <GroupButton key={l} letter={l} />
        ))}
      </div>
    </div>
  )
}

function RightPanel() {
  const stages = [
    'Dieciseisavos de final',
    'Octavos de final',
    'Cuartos de final',
    'Semifinales',
    'FINAL del torneo',
  ]

  return (
    <div className="flex flex-col gap-2 h-full">
      {stages.map((label) => (
        <Link
          key={label}
          to="/eliminatorias"
          className="flex-1 flex items-center justify-center w-full rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-150 active:scale-[0.97]"
          style={{
            background: 'rgba(20, 80, 40, 0.55)',
            border: '2px solid #f7d917',
            boxShadow: '0 0 12px rgba(247, 217, 23, 0.3), inset 0 0 20px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            color: '#ffffff',
            textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            minHeight: '48px',
            padding: '10px 12px',
          }}
        >
          {label}
        </Link>
      ))}
    </div>
  )
}

export default function Home() {
  const { timezone, setTimezone } = useWorldCup()

  return (
    <div className="relative min-h-[calc(100vh-3rem)] overflow-hidden" style={{ zIndex: 1 }}>
      {/* Inject global keyframes */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        @keyframes goldShimmer {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 0% 100%; }
        }
        @keyframes fogDrift {
          0% { transform: translateX(-5%) scaleX(1); opacity: 0.6; }
          50% { transform: translateX(0%) scaleX(1.1); opacity: 1; }
          100% { transform: translateX(5%) scaleX(1); opacity: 0.6; }
        }
      `}</style>

      {/* Stadium background */}
      <StadiumBackground />

      {/* Content overlay */}
      <div className="relative flex flex-col" style={{ zIndex: 2 }}>
        {/* Gold title */}
        <GoldTitle />

        {/* Players row */}
        <PlayersRow />

        {/* Today's matches button */}
        <div className="px-3 mt-3">
          <Link
            to="/calendario?hoy=1"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold tracking-wider uppercase transition-all duration-150 active:scale-[0.97]"
            style={{
              background: 'linear-gradient(135deg, rgba(247,217,23,0.25) 0%, rgba(247,217,23,0.10) 100%)',
              border: '1.5px solid rgba(247,217,23,0.5)',
              boxShadow: '0 0 16px rgba(247,217,23,0.15), inset 0 0 20px rgba(247,217,23,0.05)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              color: '#f7d917',
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            }}
          >
            <span className="text-lg">📅</span>
            <span>Partidos de HOY</span>
            <span className="text-xs opacity-60">{new Date().getDate()}/{new Date().getMonth() + 1}</span>
          </Link>
        </div>

        {/* Controls section */}
        <div className="flex-1 px-3 pb-4 mt-4 overflow-y-auto">
          {/* Desktop/tablet: side by side. Mobile: stacked */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-3">
            {/* Left Panel - Groups */}
            <div className="flex-1 min-w-0">
              <LeftPanel timezone={timezone} setTimezone={setTimezone} />
            </div>

            {/* Right Panel - Navigation */}
            <div className="w-full md:w-48 lg:w-56 relative">
              <RightPanel />
            </div>
          </div>
        </div>

        {/* Link to global standings page */}
        <div className="px-3 pb-6">
          <Link
            to="/clasificacion"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold tracking-widest uppercase transition-all duration-150 active:scale-[0.97]"
            style={{
              background: 'linear-gradient(180deg, rgba(247,217,23,0.2) 0%, rgba(247,217,23,0.08) 100%)',
              border: '1.5px solid rgba(247,217,23,0.4)',
              boxShadow: '0 0 16px rgba(247,217,23,0.1), inset 0 0 20px rgba(247,217,23,0.03)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              color: '#f7d917',
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
            }}
          >
            <span className="text-sm">📊</span>
            <span>Clasificación General</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
