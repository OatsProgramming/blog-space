'use client'

// import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
// import { ForwardedRef, forwardRef } from "react";
import { MdOutlineRefresh } from 'react-icons/md'

export default function RefreshPage() {
    const router = useRouter()

    return (
        <div onClick={router.refresh} className="navBarItem">
            <div>
                <MdOutlineRefresh className="icon" />
            </div>
        </div>
    )
}

// const MotionRefreshPage = motion(RefreshPage, { forwardMotionProps: true })

// export default MotionRefreshPage