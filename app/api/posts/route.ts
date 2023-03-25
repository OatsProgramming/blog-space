import { db } from "@/app/config/firebase-config";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { badRequest, creationSuccess, failedResponse, fetchFail, NotFound, notFoundRequest, responseSuccess } from "../requestStatus";

// Reference the 'posts' collection 
const collectionRef = collection(db, 'posts')

export async function GET(request: Request){
    // Parse the query
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const postId = searchParams.get('postId')

    // Find out if its possible to minimize the amount of code here

    // For multiple posts
    if (userId){
        const q = query(collectionRef, where('userId', '==', userId))
        let documentData;
        try {
             // Get posts for that user
            documentData = await getDocs(q)
            if (documentData.empty) throw new NotFound('Query returned empty for posts')
        } catch (err) {
            // On client error
            if (err instanceof NotFound) return failedResponse(err, notFoundRequest)
            const error = err as Error
            // On network error
            return failedResponse(error, fetchFail)
        }
        // Dont forget .docs to access all documents
        const posts = documentData.docs.map(post => ({
            ...post.data(),
            id: post.id
        }))
        return new Response(JSON.stringify(posts), responseSuccess)

    // For a specific post
    } else if (postId) {
        // Don't use 'where' query for documentId; just 'doc' path
        const postRef = doc(collectionRef, postId)
        let postData
        try {
            // console.log(postRef.path)
            // console.log(postId)
            postData = await getDoc(postRef)
            // console.log(postData.data())
            if (!postData.exists()) throw new NotFound('Post not found')
        } catch (err) {
            if (err instanceof NotFound) return failedResponse(err, notFoundRequest)
            const error = err as Error
            return failedResponse(error, fetchFail)
        }

        const post = {
            ...postData.data(),
            id: postData.id
        }

        return new Response(JSON.stringify(post), responseSuccess)

    }

    else return failedResponse(new Error('User ID / Post ID not given'), badRequest)
    
}

export async function POST(request: Request){
    const post = await ValidateRequest(request, 'POST')
    if (post instanceof Error) return failedResponse(post, badRequest)

    try {
        // id is auto generated
        await addDoc(collectionRef, post)
    } catch (err) {
        // On network error
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
    return new Response(JSON.stringify(post), creationSuccess)
}

export async function PATCH(request: Request){
    const post = await ValidateRequest(request, 'PATCH')
    if (post instanceof Error) return failedResponse(post, badRequest)
    try {
        // Get specific post
        const postDoc = doc(db, 'posts', post.id!)
        await updateDoc(postDoc, {
            title: post.title,
            body: post.body
        })
    } catch (err) {
        // On network error
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
    return new Response(JSON.stringify(post), responseSuccess)
}

export async function DELETE(request: Request){
    const post = await ValidateRequest(request, 'DELETE')
    if (post instanceof Error) return failedResponse(post, badRequest)
    try {
        // Identify the specific post
        const postDoc = doc(db, 'posts', post.id!)

        // When deleting the post, don't forget to delete everything associated to it
        // (i.e. comments)
        await deleteDoc(postDoc)
    } catch (err) {
        // On network error
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
    return new Response(JSON.stringify(post), responseSuccess)
}

async function ValidateRequest(request: Request, HTTP: HTTP){
    let post: PostObj;
    try {
        post = await request.json()
        switch (HTTP){
            // Check if its missing any required properties (for each method)
            case 'POST': {
                if (!post.body || !post.title || !post.userId || !post.dateMS || !post.userEmail){
                    throw new Error(`\nInvalid 'post' request body:
                        body?               ${post.body ? 'OK' : 'MISSING'}
                        title?              ${post.title ? 'OK' : 'MISSING'}
                        userId?             ${post.userId ? 'OK' : 'MISSING'}
                        userEmail?          ${post.userEmail ? 'OK' : 'MISSING'}
                        dateMS?             ${post.dateMS ? 'OK' : 'MISSING'}
                    `)
                }
                break;
            }
            case 'PATCH' : {
                if (!post.body || !post.title){
                    throw new Error(`\nInvalid 'post' request body:
                        body?               ${post.body ? 'OK' : 'MISSING'}
                        title?              ${post.title ? 'OK' : 'MISSING'}
                    `)
                }
            }
            case 'DELETE' : {
                if (!post.id){
                    throw new Error(`\nInvalid 'post' request body:
                        id?               ${post.id ? 'OK' : 'MISSING'}
                    `)
                }
            }
            default : {
                throw new Error('Unknown HTTP method')
            }
        }
    } catch (err) {
        // Error if missing any properties
        return err as Error
    }
    // Will return if valid as Promise<PostObj>
    return post
}