const containerVariant = {
    initial: {},
    enter: {
        transition: {
            staggerChildren: 0.2,
        }
    },
    exit: {
        transition: {
            staggerChildren: 0.2,
        }
    }
}

const itemVariant = {
    initial: {
        opacity: 0,
        y: -20,
    },
    enter: {
        opacity: 1,
        y: 0,
    },
    exit: {
        opacity: 0,
        y: -15,
    }
}

const transition = {
    duration: 0.3,
    ease: 'easeIn'
}

export { containerVariant, itemVariant, transition }