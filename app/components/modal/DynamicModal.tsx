import PostComponent from "../posting/Post";

export default function DynamicModal({ posts, onCancel }: {
    posts: PostObj[],
    onCancel: () => void,
}) {

    return (
        <div className="modal-overlay">
            <div className="modal-dialog">
                <div className="modal-body">
                    {posts.map(post => (
                        <div className="flexContainer">
                            <PostComponent post={post} userId={'12414'} />
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

