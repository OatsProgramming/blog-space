'use client'

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ForwardedRef, forwardRef } from "react";
import { MdOutlineRefresh } from 'react-icons/md'

const RefreshPage = forwardRef(function RefreshPage(props, ref: ForwardedRef<any>) {
    const router = useRouter()

    return (
        <div onClick={router.refresh} className="navBarItem">
            <div ref={ref}>
                <MdOutlineRefresh className="icon" />
            </div>
        </div>
    )
})

const MotionRefreshPage = motion(RefreshPage, { forwardMotionProps: true })

export default MotionRefreshPage