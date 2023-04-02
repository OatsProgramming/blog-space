import dynamic from "next/dynamic";
import { useState } from "react";

export default function StaticModal({ posts, userId, changePost }: {
    posts: PostObj[],
    userId: string,
    changePost: (index: number) => void
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
            {isOpen && (<DynamicModal posts={posts} userId={userId} onCancel={handleClose} changePost={changePost} />)}
        </div>
    );
}

