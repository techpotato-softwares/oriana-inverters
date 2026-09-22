'use client'

import { FadeIn } from '../FadeIn'

export function GlobalPresence() {
  return (
    <section className="py-24 bg-oriana-deep overflow-hidden relative">
      {/* Background World Map Image */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" 
          alt="World Map" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-oriana-deep/60 mix-blend-multiply" />
      </div>

      <div className="container relative z-10">
        <FadeIn className="text-center">
          <h2 className="text-3xl font-display font-semibold text-white md:text-4xl">
            Global Presence
          </h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            A vast network of service centers and professionals ready to support your energy needs anywhere in the world.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2} className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center max-w-4xl mx-auto">
          <p className="text-oriana-silver text-lg">
            Our global service platform is expanding. We have established dedicated support centers and strategic partnerships across major regions to deliver localized, responsive support.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
