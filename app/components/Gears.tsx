import { BsFillGearFill, BsGearWideConnected } from 'react-icons/bs'
import { LazyMotion, m, useTime, useTransform } from 'framer-motion'
import styles from './css/gears.module.css'

export default function Gears({ size, x, y }: {
    size?: number,
    x?: number,
    y?: number,
}) {
    const loadFeatures = () => import('../lib/animation/domAnimation').then((mod) => mod.default)
    const time = useTime()
    const clockWise = useTransform(
        time,
        [0, 4000],
        [0, 360],
        { clamp: false }
    )
    const counterClockwise = useTransform(
        time,
        [0, 4500],
        [360, 0],
        { clamp: false }
    )

    return (
        <div
            style={{
                position: 'relative',
                transformOrigin: 'center',
                transform: `scale(${size ?? 1}) translate(${x ?? 0}px, ${y ?? 0}px)`,
            }}>
            <LazyMotion features={loadFeatures} strict>
                <m.span
                    className={styles['one']}
                    style={{ rotate: clockWise }}
                >
                    <BsFillGearFill className={styles['icon']} />
                </m.span>
                <m.span
                    className={styles['two']}
                    style={{ rotate: counterClockwise }}
                >
                    <BsGearWideConnected className={styles['icon']} />
                </m.span>
                <m.span
                    className={styles['three']}
                    style={{ rotate: clockWise }}
                >
                    <BsFillGearFill className={styles['icon']} />
                </m.span>
            </LazyMotion>
        </div>
    )
}

