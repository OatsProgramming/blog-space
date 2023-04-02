import { LazyMotion, AnimatePresence, m } from "framer-motion"
import { wrap } from "popmotion"
import { useEffect, useState } from "react"
import CommentsSection from "../commenting/CommentSection"
import PostComponent from "@/app/components/posting/Post"
import slideShow from "@/app/lib/animation/slider"

const swipeThreshold = 10_000
function calculateSwipePower(offset: number, velocity: number) {
    return Math.abs(offset) * velocity
}

export default function Slider({ posts, userId }: {
    posts: PostObj[],
    userId: string
}) {
    const [postId, setPostId] = useState(posts[0].id!)
    const [[page, direction], setPage] = useState([0, 0])

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

    return (
        <LazyMotion features={loadFeatures} strict>
            <AnimatePresence custom={direction} initial={false}>
                <m.div
                    className="flexContainer"
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
                            paginate(1)

                            // Swiped left
                        } else if (swipe < -swipeThreshold) {
                            paginate(-1)
                        }
                    }}
                >
                    {/* Perhaps put the modal menu here
                        Then you can just have it setState when clicking on a component
                    */}
                    <div>
                        <PostComponent post={posts[postIndex]} userId={userId} inComment />
                    </div>
                    <div>
                        <CommentsSection postId={postId} />
                    </div>
                </m.div>
            </AnimatePresence>
            <div className="next" onClick={() => paginate(1)}>
                {"‣"}
            </div>
            <div className="prev" onClick={() => paginate(-1)}>
                {"‣"}
            </div>
        </LazyMotion>
    )
}