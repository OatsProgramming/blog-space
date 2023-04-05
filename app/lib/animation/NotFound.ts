const containerVariant = {
    initial: {
        y: '50vh',
        scale: 5,
        zIndex: 99,
        scaleX: 0,
    },
    enter: {
        scaleX: [0, 1],
        y: '10vh',
        transition: {
            y: {
                delay: 3,
                type: 'tween',
                duration: 2,
                ease: 'easeInOut',
                staggerChildren: 0.2,
            },
            scaleX: {
                duration: 1.5,
                ease: 'easeIn'
            },
            staggerChildren: 0.2,
            delayChildren: 1.5,
        }
    },
}

const itemVariant = {
    initial: {
        y: -100,
        opacity: 0,
    },
    enter: {
        y: 0,
        opacity: 1
    }
}

const transition = {
    type: 'tween',
    duration: 1,
}

const messageVariant = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1,
        transition: {
            delay: 5,
            type: 'spring'
        }
    }
}

export { containerVariant, itemVariant, transition, messageVariant }