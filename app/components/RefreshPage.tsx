'use client'

// import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MdOutlineRefresh } from 'react-icons/md'
import { LazyMotion, m } from "framer-motion";
import rotate from "../lib/animation/rotate";
import styles from '../components/css/nav.module.css'

export default function RefreshPage() {
    const router = useRouter()

    const loadFeatures = () => import('../lib/animation/domAnimation').then((mod) => mod.default)

    return (
        <LazyMotion features={loadFeatures} strict>
            <div onClick={router.refresh} className={styles['item']}>
                <m.div whileTap={rotate}>
                    <MdOutlineRefresh className="icon" />
                </m.div>
            </div>
        </LazyMotion>
    )
}