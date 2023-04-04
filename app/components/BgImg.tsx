'use client'
import Image from "next/image";
import { useEffect, useState } from "react"
import navBg from "../../public/navBg.svg";
import navBg2 from "../../public/navBg2.svg";

export default function BgImg() {
    const [img, setImg] = useState('')
    
    useEffect(() => {
        function handleMediaChange (e: MediaQueryListEvent | MediaQueryList) {
            const imgPath = e.matches ? navBg2 : navBg;
            setImg(imgPath)
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        handleMediaChange(mediaQuery); // Set the initial image

        mediaQuery.addEventListener('change', handleMediaChange)

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange)
        }
    }, [])

    return (
        <Image
            src={img}
            alt=''
            style={{
                position: 'absolute',
                zIndex: -99,
                objectPosition: '0 300px',
                transform: 'scaleY(0.6)',
                top: '-20rem'
            }}
        />
    )
}