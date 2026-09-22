'use client'

import { Stagger, StaggerItem } from '../FadeIn'

const stories = [
  {
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800',
    title: 'Utility Scale Commissioning',
  },
  {
    image: 'https://images.unsplash.com/photo-1548611716-3001a1a72f10?auto=format&fit=crop&q=80&w=800',
    title: 'Commercial Roof Installation',
  },
  {
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=800',
    title: 'Residential Hybrid Setup',
  },
  {
    image: 'https://images.unsplash.com/photo-1509391366360-1e96e95b0c79?auto=format&fit=crop&q=80&w=800',
    title: 'Remote Diagnostics Success',
  },
]

export function ServiceStories() {
  return (
    <section className="py-24 bg-white">
      <div className="container max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-semibold text-oriana-navy md:text-4xl">
            Service Stories
          </h2>
          <p className="mt-4 text-oriana-muted max-w-2xl mx-auto">
            Real-world examples of our dedicated support team in action.
          </p>
        </div>

        <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story, i) => (
            <StaggerItem key={i}>
              <div className="group relative overflow-hidden rounded-2xl h-80 bg-oriana-surface cursor-pointer">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-display font-semibold text-white">
                    {story.title}
                  </h3>
                  <p className="text-white/80 mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-75">
                    Explore how our team delivered excellence.
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
