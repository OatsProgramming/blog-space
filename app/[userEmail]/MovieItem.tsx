import { arrayRemove, arrayUnion, DocumentData, DocumentReference, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { MovieData } from "./types"

export default function MovieItem({movieObj, userRef, onDelete, onRead} : {
    movieObj: MovieData,
    userRef: DocumentReference<DocumentData>
    onDelete: (movieObj: MovieData) => void,
    onRead: () => void,
}){
    const [isEditing, setIsEditing] = useState(false)
    const [updateData, setUpdateData] = useState<MovieData>({} as MovieData)
    const {title, releaseYear} = movieObj

    async function onEdit(){
        if (!updateData.title || !updateData.releaseYear || !isEditing) return
        try {
            onDelete(movieObj)
            await updateDoc(userRef, {
                movies: arrayUnion(updateData)
            })
            setUpdateData({} as MovieData)
        } catch (err) {
            throw err
        }
    }

    return (
        <div>
            {isEditing ? (
                <>
                    <input 
                        value={updateData.title}
                        placeholder={title} 
                        onChange={(e) => setUpdateData({...updateData, title: e.target.value})}
                    />
                    <input 
                        value={updateData.releaseYear}
                        placeholder={`${releaseYear}`} 
                        onChange={(e) => setUpdateData({...updateData, releaseYear: +e.target.value})}
                    />
                </>
            ): (
                <>
                    <h1>{title}</h1>
                    <h2>{releaseYear}</h2>
                </>
            )}
            <button onClick={() => {
                setIsEditing(!isEditing)
                onEdit()
                onRead()
            }}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => onDelete(movieObj)}>Delete</button>
        </div>
    )
}