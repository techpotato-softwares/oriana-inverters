'use client'

import { useState } from 'react'
import { FadeIn, Stagger, StaggerItem } from '../FadeIn'
import { cn } from '@/utilities/ui'

const categories = ['All', 'On-grid', 'Hybrid', 'Utility', 'BESS']

const stories = [
  {
    category: 'Utility',
    title: '150MW Solar Farm in Rajasthan',
    image: 'https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&q=80&w=800',
  },
  {
    category: 'Hybrid',
    title: 'Smart Home Energy System',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
  },
  {
    category: 'On-grid',
    title: 'Commercial Factory Rooftop',
    image: 'https://images.unsplash.com/photo-1548611716-3001a1a72f10?auto=format&fit=crop&q=80&w=800',
  },
  {
    category: 'BESS',
    title: 'Grid Stabilization Project',
    image: 'https://images.unsplash.com/photo-1623345805780-8f01f714e65f?auto=format&fit=crop&q=80&w=800',
  },
]

export function SuccessStories() {
  const [activeTab, setActiveTab] = useState('All')

  const filteredStories = stories.filter(
    (story) => activeTab === 'All' || story.category === activeTab
  )

  return (
    <section className="py-24 bg-oriana-surface">
      <div className="container max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-semibold text-oriana-navy md:text-4xl">
            Success Stories
          </h2>
          <p className="mt-4 text-oriana-muted max-w-2xl mx-auto">
            Discover how Oriana Inverters are powering projects worldwide.
          </p>
        </div>

        <FadeIn className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-colors border",
                activeTab === cat 
                  ? "bg-oriana-blue text-white border-oriana-blue" 
                  : "bg-white text-oriana-navy border-gray-200 hover:border-oriana-blue hover:text-oriana-blue"
              )}
            >
              {cat}
            </button>
          ))}
        </FadeIn>

        <Stagger key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStories.map((story, i) => (
            <StaggerItem key={i}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-oriana-blue uppercase tracking-wider">
                    {story.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-oriana-navy mb-2 line-clamp-2 group-hover:text-oriana-blue transition-colors">
                    {story.title}
                  </h3>
                  <a href="#" className="text-sm text-oriana-muted group-hover:text-oriana-blue transition-colors inline-flex items-center">
                    Read Story
                    <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
