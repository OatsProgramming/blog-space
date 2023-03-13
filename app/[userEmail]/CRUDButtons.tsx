'use client'

import { doc, setDoc, getDoc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { auth, db } from "../(config)/firebase-config"
import MovieItem from "./MovieItem"
import { MovieData } from "./types"

export default function CRUDButtons(){
    // General state
    const [creating, setCreating] = useState(false)
    // Data states
    const [movieList, setMovieList] = useState<MovieData[]>([])
    const [newData, setNewData] = useState<MovieData>({} as MovieData)
    // Access firestore (specifically firestoreDatabase/users/userID)
    const userRef = doc(db, 'users', auth.currentUser!.uid)

    const router = useRouter()

    useEffect(() => {
        // Having issues with user being undefined but still logged in
        if (!auth.currentUser) router.push('/')
        else if (auth.currentUser.uid) onRead()
    }, [auth.currentUser])
    
    // Easier to hashmap; dont addDoc/deleteDoc
    async function onAdd(){
        if (!newData.title || !newData.releaseYear) return
        // Create 'users' collection and use userId as document id
        try {
            const userDoc = await getDoc(userRef)
            // User data already in?
            if (userDoc.data()){
                // Add on top of the data
                await updateDoc(userRef, {
                    movies: arrayUnion({
                        ...newData,
                        id: crypto.randomUUID()
                    })
                })
            } else {
                // otherwise, create new array with setDoc
                await setDoc(userRef, {
                    movies: arrayUnion({
                        ...newData,
                        id: crypto.randomUUID()
                    })
                })
            }
        } catch (err) {
            throw err
        } finally {
             // Reset input data; for some reason its not working
             setNewData({} as MovieData)
             onRead()
        }
    }

    async function onRead(){
        try {
            const userDoc = await getDoc(userRef)
            const userDataObj = userDoc.data()
            setMovieList(userDataObj ? userDataObj.movies : [])
        } catch (err) {
            throw err
        }
    }

    async function onDelete(movieObj: MovieData){
        try {
            await updateDoc(userRef, {
                movies: arrayRemove(movieObj)
            })
        } catch (err) {
            throw err
        } finally {
            onRead()
        }
    }

    return (
        <div>
            {creating ? (
                <>
                    <input 
                        placeholder={newData.title ?? 'A Trip to the Moon'} 
                        onChange={(e) => setNewData({...newData, title: e.target.value})}/>
                    <input 
                        type='number' 
                        placeholder={newData.releaseYear ? `${newData.releaseYear}` : '1902'} 
                        onChange={(e) => setNewData({...newData, releaseYear: +e.target.value})}/>
                    <button 
                        onClick={onAdd}>
                            Create new data
                    </button>
                    <button 
                        onClick={() => {
                            setNewData({} as MovieData)
                            setCreating(false)
                        }}>
                            Cancel
                    </button>
                </>
            ) : (
                <>
                    <button 
                        onClick={() => setCreating(true)}>
                            Create?
                    </button>
                    <button 
                        onClick={onRead}>
                            Data Retrieval
                    </button>
                </>
            )}
            {movieList.map(movie => (
                <MovieItem 
                    key={movie.id} 
                    movieObj={movie} 
                    userRef={userRef} 
                    onDelete={onDelete} 
                    onRead={onRead}
                />
            ))}
        </div>
    )
}