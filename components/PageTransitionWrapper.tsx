// components/PageTransitionWrapper.tsx
'use client'

import { AnimatePresence, motion, Easing } from 'framer-motion' // <-- Easing imported here
import { usePathname } from 'next/navigation'
import React from 'react'

// Define the easing curves and assert their types to satisfy TypeScript
const easeInCubic = [0.55, 0.05, 0.67, 0.19] as Easing; 
const easeOutCubic = [0, 0.55, 0.45, 1] as Easing; 

const variants = {
  // Page exit animation (fast fade out)
  fadeOut: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: easeInCubic,
    },
  },
  // Page entrance animation (smooth fade in from a slightly low position)
  fadeIn: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1, // Gives time for the old page to fade out
      ease: easeOutCubic,
    },
  },
}

export default function PageTransitionWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        // Keying by the pathname tells AnimatePresence that this is a new page element
        key={pathname}
        initial="fadeOut"
        animate="fadeIn"
        exit="fadeOut"
        variants={variants}
        // Prevents content from jumping or collapsing during the transition
        className="w-full" 
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}