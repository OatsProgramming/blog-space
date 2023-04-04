import dynamic from "next/dynamic";
import { useState } from "react";
import { CiMenuKebab } from 'react-icons/ci'
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
                <CiMenuKebab className={styles['menu']} />
            </span>
            {isOpen && (<DynamicModal posts={posts} userId={userId} onClose={handleClose} changePost={changePost} />)}
        </div>
    );
}

