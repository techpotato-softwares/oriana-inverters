/** Abstract energy-flow dot pattern for footer — inspired by manufacturer catalogue sites, Oriana-original */
export function FooterBackground() {
  const curves = [
    { p0: { x: -40, y: 280 }, p1: { x: 420, y: 40 }, p2: { x: 900, y: 200 }, count: 72, r: 1.6, o: 0.55 },
    { p0: { x: 80, y: 320 }, p1: { x: 520, y: 80 }, p2: { x: 1100, y: 260 }, count: 80, r: 1.4, o: 0.45 },
    { p0: { x: 200, y: 340 }, p1: { x: 640, y: 120 }, p2: { x: 1240, y: 180 }, count: 76, r: 1.5, o: 0.4 },
    { p0: { x: -20, y: 180 }, p1: { x: 380, y: 300 }, p2: { x: 820, y: 60 }, count: 68, r: 1.3, o: 0.35 },
    { p0: { x: 300, y: 60 }, p1: { x: 720, y: 280 }, p2: { x: 1180, y: 100 }, count: 70, r: 1.2, o: 0.3 },
    { p0: { x: 500, y: 360 }, p1: { x: 900, y: 160 }, p2: { x: 1320, y: 300 }, count: 64, r: 1.1, o: 0.25 },
  ]

  const dots = curves.flatMap((curve) => {
    const { p0, p1, p2, count, r, o } = curve
    return Array.from({ length: count + 1 }, (_, i) => {
      const t = i / count
      const mt = 1 - t
      return {
        cx: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
        cy: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
        r,
        o,
      }
    })
  })

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 380"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="footer-glow" cx="70%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#1a428a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#051018" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="footer-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#051018" stopOpacity="0.2" />
            <stop offset="55%" stopColor="#051018" stopOpacity="0" />
            <stop offset="100%" stopColor="#051018" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <rect width="1200" height="380" fill="url(#footer-glow)" />
        <rect width="1200" height="380" fill="url(#footer-fade)" />

        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill="#eef2f8"
            opacity={dot.o}
          />
        ))}

        {/* Secondary accent arcs — sparse sky-blue dots */}
        {curves.slice(0, 3).flatMap((curve, ci) => {
          const { p0, p1, p2 } = curve
          return Array.from({ length: 12 }, (_, i) => {
            const t = (i + 1) / 13
            const mt = 1 - t
            return (
              <circle
                key={`accent-${ci}-${i}`}
                cx={mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x}
                cy={mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y}
                r={2.2}
                fill="#4da3ff"
                opacity={0.12}
              />
            )
          })
        })}
      </svg>
    </div>
  )
}
