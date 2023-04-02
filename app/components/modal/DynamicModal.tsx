import PostComponent from "../posting/Post";

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
        <div className="modal-overlay">
            <div className="modal-dialog">
                <div className="modal-body">
                    {posts.map((post, index) => (
                        <div key={post.id} className="flexContainer" onClick={() => handleClick(index)} style={{cursor: 'pointer'}}>
                            <PostComponent post={post} userId={userId} />
                        </div>
                    ))}
                </div>
                <div className="modal-footer">
                    <button className="modal-button modal-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

