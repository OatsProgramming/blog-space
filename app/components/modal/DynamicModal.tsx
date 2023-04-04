import PostComponent from "../posting/Post";
import { IoIosCloseCircleOutline } from 'react-icons/io'
import styles from '@/app/components/css/modal.module.css'

export default function DynamicModal({ posts, userId, onCancel, changePost }: {
    posts: PostObj[],
    userId: string,
    onCancel: () => void,
    changePost: (index: number) => void
}) {
    function handleClick(index: number) {
        changePost(index)
        onCancel()
    }

    return (
        <div className={styles['overlay']}>
            <div className={styles['dialog']}>
                <div className={styles['body']}>
                    {posts.map((post, index) => (
                        <div key={post.id} 
                            className="flexContainer" 
                            onClick={() => handleClick(index)} 
                            style={{ cursor: 'pointer' }}
                        >
                            <PostComponent post={post} userId={userId} />
                        </div>
                    ))}
        
                        <IoIosCloseCircleOutline className={styles['close']} onClick={onCancel} />
                </div>
            </div>
        </div>
    );
};

