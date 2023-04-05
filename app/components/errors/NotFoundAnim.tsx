'use client'

import { LazyMotion, m } from "framer-motion"
import { Roboto_Mono } from 'next/font/google'
import { containerVariant, itemVariant, transition, messageVariant } from "@/app/lib/animation/NotFound"
import { useRouter } from "next/navigation"
import styles from '../css/notFound.module.css'

const roboto = Roboto_Mono({ subsets: ['latin'] })

export default function NotFoundAnim({ message }: {
    message: string
}) {
    const loadFeatures = () => import('../../lib/animation/domAnimation').then((mod) => mod.default)
    const router = useRouter()

    return (
        <LazyMotion features={loadFeatures} strict>
            <div className={roboto.className}>
                <m.div
                    className={styles['container']}
                    variants={containerVariant}
                    initial='initial'
                    animate='enter'
                >
                    <m.div
                        variants={itemVariant}
                        transition={transition}
                    >
                        4
                    </m.div>
                    <m.div
                        variants={itemVariant}
                        transition={transition}
                    >
                        0
                    </m.div>
                    <m.div
                        variants={itemVariant}
                        transition={transition}
                    >
                        4
                    </m.div>
                </m.div>
                <div className={styles['messageContainer']}>
                    <m.div
                        initial='initial'
                        animate='enter'
                        variants={messageVariant}
                    >
                        { message }
                    </m.div>
                    <m.button
                        initial='initial'
                        animate='enter'
                        variants={messageVariant}
                        onClick={router.back}
                    >
                        Go back
                    </m.button>
                </div>
            </div>
        </LazyMotion>
    )
}