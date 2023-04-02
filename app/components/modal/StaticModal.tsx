'use client'

import dynamic from "next/dynamic";
import { useState } from "react";

export default function StaticModal({ posts }: {
    posts: PostObj[]
}) {
    const [isOpen, setIsOpen] = useState(false);

    function handleOpen() {
        setIsOpen(true);
    }

    function handleClose() {
        setIsOpen(false);
    }

    const DynamicModal = dynamic(() =>
        import('./DynamicModal').then((mod) => mod.default)
    )

    return (
        <div>
            <button onClick={handleOpen}>Open Modal</button>
            {isOpen && (<DynamicModal posts={posts} onCancel={handleClose} />)}
        </div>
    );
}

