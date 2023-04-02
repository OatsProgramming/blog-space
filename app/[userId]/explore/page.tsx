'use client'

import { getPostContext } from "@/app/components/posting/PostProvider"
import PostComponent from "@/app/components/posting/Post"
import { AnimatePresence, LazyMotion, m } from "framer-motion"
import { useState } from "react"
import { wrap } from "popmotion"

export default function Explore({ params: { userId } }: Params) {
  const [[page, direction], setPage] = useState([0, 0])
  const { explorePosts } = getPostContext()

  // This will help create an infinite swipe gallery 
  // by returning values only within min and max values
  const postIndex = wrap(0, explorePosts.length, page)

  const loadFeatures = () => import('../../lib/animation/domMax').then((mod) => mod.default)
  
  // Swipe right: direction === 1
  // Swipe left: direction === -1 
  const variant = {
    // If current post swiped to the right
    // New post must come from left initially (vice versa)
    enter: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    }),
    // Animate in the new post
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    // If current post swiped to the right
    // Current post must exit to the right
    exit: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000
    })
  }

  const swipeThreshold = 10_000
  function calculateSwipePower(offset: number, velocity: number) {
    return Math.abs(offset) * velocity
  }

  function paginate(newDirection: number) {
    setPage([page + newDirection, newDirection])
  }
  
  return (
    <div>
      <LazyMotion features={loadFeatures} strict>
        <AnimatePresence custom={direction} initial={false}>
          <m.div
            className="flexContainer"
            key={page}
            variants={variant}
            custom={direction}
            initial='enter'
            animate='center'
            exit='exit'
            drag='x'
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = calculateSwipePower(offset.x, velocity.x)
              // Swiped right
              if (swipe > swipeThreshold) {
                paginate(1)

              // Swiped left
              } else if (swipe < -swipeThreshold) {
                paginate(-1)
              }
            }}
          >
            <PostComponent post={explorePosts[postIndex]} userId={userId} />
          </m.div>
        </AnimatePresence>
        <div className="next" onClick={() => paginate(1)}>
          {"‣"}
        </div>
        <div className="prev" onClick={() => paginate(-1)}>
          {"‣"}
        </div>
      </LazyMotion>
    </div>
  )
}