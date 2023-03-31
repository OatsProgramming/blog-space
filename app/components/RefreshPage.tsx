'use client'

import { useRouter } from "next/navigation";
import { MdOutlineRefresh } from 'react-icons/md'

export default function RefreshPage() {
    const router = useRouter()

    return (
        <div onClick={router.refresh} className="navBarItem">
            <MdOutlineRefresh className="icon refresh"/>
        </div>
    )
}
