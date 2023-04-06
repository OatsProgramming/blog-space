import { LazyMotion, AnimatePresence, m } from "framer-motion"
import { wrap } from "popmotion"
import { useEffect, useState } from "react"
import CommentsSection from "../commenting/CommentSection"
import PostComponent from "@/app/components/posting/Post"
import slideShow from "@/app/lib/animation/slider"
import StaticModal from "../modal/StaticModal"
import styles from '@/app/components/css/slider.module.css'
import dynamic from "next/dynamic"

export default function Slider({ posts, userId }: {
    posts: PostObj[],
    userId: string,
}) {
    const Empty = dynamic(() => 
        import('../Empty')
    )

    if (posts.length === 0) return <Empty />
    
    const [postId, setPostId] = useState(posts[0]?.id!)
    const [[page, direction], setPage] = useState([0, 0])

    const swipeThreshold = 10_000
    function calculateSwipePower(offset: number, velocity: number) {
        return Math.abs(offset) * velocity
    }

    // This will help create an infinite swipe gallery 
    // by returning values only within min and max values
    const postIndex = wrap(0, posts.length, page)

    const loadFeatures = () => import('../../lib/animation/domMax').then((mod) => mod.default)

    useEffect(() => {
        setPostId(posts[postIndex].id!)
    }, [page])

    function paginate(newDirection: number) {
        setPage([page + newDirection, newDirection])
    }

    function handleClick(index: number) {
        let newDirection: number;
        if (index > postIndex) newDirection = 1
        else if (index < postIndex) newDirection = -1
        else newDirection = 0

        setPage([index, newDirection])
    }

    return (
        <LazyMotion features={loadFeatures} strict>
            <div className={styles['relativeContainer']}>
            <StaticModal posts={posts} userId={userId} changePost={handleClick} />
                <AnimatePresence custom={direction} initial={false}>
                    <m.div    
                        className={styles['absoluteContainer']}
                        key={page}
                        variants={slideShow}
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
                                paginate(-1)
                                // Swiped left
                            } else if (swipe < -swipeThreshold) {
                                paginate(1)
                            }
                        }}
                    >
                        <div>
                            <PostComponent post={posts[postIndex]} userId={userId} inComment />
                        </div>
                        <div>
                            <CommentsSection postId={postId} />
                        </div>
                    </m.div>
                </AnimatePresence>
            </div>
            <div className={styles['next']} onClick={() => paginate(1)}>
                {"‣"}
            </div>
            <div className={styles['prev']} onClick={() => paginate(-1)}>
                {"‣"}
            </div>
        </LazyMotion>
    )
}