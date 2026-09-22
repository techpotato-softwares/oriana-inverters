'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Stagger, StaggerItem } from '../FadeIn'
import { cn } from '@/utilities/ui'

const steps = [
  {
    title: 'Identify',
    description: 'We proactively identify the scope and precise nature of any operational issue or requirement through advanced monitoring.',
    number: '01'
  },
  {
    title: 'Diagnose',
    description: 'Our technical experts run advanced diagnostics to pinpoint the root cause accurately, leveraging big data from our global installations.',
    number: '02'
  },
  {
    title: 'Resolve',
    description: 'We implement efficient, field-level or remote solutions to resolve the issue swiftly, deploying certified technicians where needed.',
    number: '03'
  },
  {
    title: 'Support',
    description: 'Ongoing monitoring and continuous assistance ensure minimal downtime moving forward, protecting your renewable assets long-term.',
    number: '04'
  },
]

export function SupportApproach() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  })

  // Height of the progress line connecting the steps
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={containerRef} className="py-24 lg:py-32 bg-oriana-surface relative overflow-hidden">
      <div className="container max-w-5xl relative z-10">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="text-3xl font-display font-semibold text-oriana-navy md:text-5xl tracking-tight">
            Our Approach
          </h2>
          <p className="mt-6 text-lg text-oriana-muted max-w-2xl mx-auto leading-relaxed">
            A systematic, four-step methodology designed to ensure maximum reliability and swift resolution for every installation.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Track */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-oriana-navy/10 transform md:-translate-x-1/2" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute left-4 md:left-1/2 top-0 w-[2px] bg-oriana-blue transform md:-translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <div key={step.title} className="relative flex flex-col md:flex-row items-start md:items-center group">
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 border-oriana-blue bg-white transform -translate-x-[7px] md:-translate-x-1/2 mt-2 md:mt-0 z-10 transition-transform duration-500 group-hover:scale-150 group-hover:bg-oriana-blue" />
                  
                  {/* Content Box */}
                  <div className={cn(
                    "ml-12 md:ml-0 md:w-1/2",
                    isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:ml-auto"
                  )}>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="bg-white p-8 rounded-2xl shadow-sm border border-black/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <span className="text-5xl font-display font-bold text-oriana-silver/50 block mb-4">
                        {step.number}
                      </span>
                      <h3 className="text-2xl font-semibold text-oriana-navy mb-3">
                        {step.title}
                      </h3>
                      <p className="text-oriana-muted leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
