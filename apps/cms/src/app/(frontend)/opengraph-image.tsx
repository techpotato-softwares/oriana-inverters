import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Oriana Inverters'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(145deg, #071525 0%, #1a428a 55%, #0b2748 100%)',
          padding: '64px 72px',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#4da3ff',
          }}
        >
          Oriana Inverters
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 920,
            }}
          >
            Advanced solar inverter solutions
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              lineHeight: 1.4,
              color: '#eef2f8',
              maxWidth: 860,
            }}
          >
            String, hybrid, utility-scale, and BESS systems for residential to utility projects.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 22,
            color: '#f5b942',
            fontWeight: 600,
          }}
        >
          orianainverters.com
        </div>
      </div>
    ),
    { ...size },
  )
}
