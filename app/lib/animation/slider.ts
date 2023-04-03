const slideShow = {
    // If current post swiped to the right
    // New post must come from left initially (vice versa)
    enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
    }),
    // Animate in the new post
    center: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.25,
        },
        zIndex: 1,
    },
    // If current post swiped to the right
    // Current post must exit to the right
    exit: (direction: number) => ({
        x: direction > 0 ? -1000 : 1000,
        opacity: 0,
    })
}

export default slideShow