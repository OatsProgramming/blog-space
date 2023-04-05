import dynamic from "next/dynamic";
import { useState } from "react";
import styles from 'app/components/css/modal.module.css'

export default function StaticModal({ posts, userId, changePost }: {
    posts: PostObj[],
    userId: string,
    changePost: (index: number) => void,
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
            <span onClick={handleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={styles['menu']} viewBox="0 0 16 16">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
            </span>
            {isOpen && (<DynamicModal posts={posts} userId={userId} onClose={handleClose} changePost={changePost} />)}
        </div>
    );
}

