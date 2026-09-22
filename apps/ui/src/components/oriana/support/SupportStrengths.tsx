'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utilities/ui'

const strengths = [
  {
    title: 'Installation & Commissioning',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1c77eca2?auto=format&fit=crop&q=80&w=800',
    className: 'col-span-1 md:col-span-2 row-span-2'
  },
  {
    title: 'Technical Support',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    className: 'col-span-1 md:col-span-1 row-span-1'
  },
  {
    title: 'Customer Support',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80&w=800',
    className: 'col-span-1 md:col-span-1 row-span-1'
  },
  {
    title: 'Diagnostics',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    className: 'col-span-1 md:col-span-1 row-span-2'
  },
  {
    title: 'Warranty Service',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
    className: 'col-span-1 md:col-span-1 row-span-1'
  },
  {
    title: 'Remote Monitoring',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800',
    className: 'col-span-1 md:col-span-2 row-span-1'
  },
]

export function SupportStrengths() {
  return (
    <section className="py-24 lg:py-32 bg-white relative">
      <div className="container">
        <div className="text-center mb-16 lg:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-display font-semibold text-oriana-navy md:text-5xl tracking-tight"
          >
            Our Strength
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-oriana-muted max-w-2xl mx-auto"
          >
            Providing unparalleled assistance and support across multiple facets of our solar solutions. From technical diagnostics to remote monitoring, our team ensures your operations never skip a beat.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[240px] gap-4 lg:gap-6">
          {strengths.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={cn(
                "group relative overflow-hidden rounded-[2rem] bg-oriana-surface",
                item.className
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-oriana-deep/90 via-oriana-deep/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                <h3 className="text-2xl font-display font-medium text-white mb-2 leading-tight">
                  {item.title}
                </h3>
                <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  <p className="text-white/80 text-sm mt-2">
                    Industry-leading expertise ensuring your systems operate at peak efficiency.
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
