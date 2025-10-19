// components/Feature.tsx
'use client'
import { motion, Easing } from 'framer-motion' // <-- Easing imported here

type Props = { 
  title: string
  desc: string
}

// Define the easing curve and assert its type
const easeOutCubic = [0, 0.55, 0.45, 1] as Easing; 

// Animation for individual items in a staggered list
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: easeOutCubic // Correctly typed
    } 
  },
}

export function Feature({ title, desc }: Props) {
  return (
    <motion.div
      variants={itemVariants} // Enables staggered entrance
      // Your existing CSS hover is preserved for snappy interaction
      className="group rounded-2xl border bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-transform"
    >
      <h3 className="text-base font-semibold text-brand-charcoal group-hover:text-brand-red transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600">{desc}</p>
    </motion.div>
  )
}