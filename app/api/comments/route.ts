import { db } from "@/app/config/firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where, writeBatch } from "@firebase/firestore/lite";
import { badRequest, creationSuccess, failedResponse, fetchFail, responseSuccess } from "../requestStatus";

// export const config = {
//     runtime: 'edge',
// }

// Reference the 'comments' collection 
const collectionRef = collection(db, 'comments')

export async function GET(request: Request){
    // Parse the query
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    // On bad request
    if (!postId) return failedResponse(new Error('Post ID not given'), badRequest)
    const q = query(collectionRef, where('postId', '==', postId))
    let documentData;
    try {
         // Get comments for that post
        documentData = await getDocs(q)
    } catch (err) {
        const error = err as Error
        // On server error
        return failedResponse(error, fetchFail)
    }
    // Dont forget .docs to access all documents
    let comments;
    if (documentData.empty) {
        comments = [] as CommentObj[]
    } else {
        comments = documentData.docs.map(comment => ({
            ...comment.data(),
            id: comment.id
        })) as CommentObj[]
    }
    return new Response(JSON.stringify(comments), responseSuccess)
}

export async function POST(request: Request){
    const comment = await ValidateRequest(request, 'POST')
    if (comment instanceof Error) return failedResponse(comment, badRequest)
    try {
        // id is auto generated
        await addDoc(collectionRef, comment)
    } catch (err) {
        // On network error
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
    return new Response(JSON.stringify(comment), creationSuccess)
}

export async function PATCH(request: Request) {
    const { searchParams } = new URL(request.url)
    // Temp ( change to displayName later )
    const targetEmail = searchParams.get('userEmail')
    console.log(targetEmail)

    // Mass update
    if (targetEmail) {
        const { email: newEmail} = await request.json() 
        console.log(newEmail)
        const q = query(collectionRef, where('userEmail', '==', targetEmail))
        let documentData;
        try {
            documentData = await getDocs(q)
            const batch = writeBatch(db)

            documentData.forEach((doc) => {
                const docRef = doc.ref;
                batch.update(docRef, {
                    // Change to displayName later
                    userEmail: newEmail
                })
            });
            await batch.commit()
            return new Response(JSON.stringify("Comment(s) updated to new email"), responseSuccess)
        } catch (err) {
            console.log(err)
            const error = err as Error
            return failedResponse(error, fetchFail)
        }
    } else {
        // Specific update
        const comment = await ValidateRequest(request, 'PATCH')
        if (comment instanceof Error) return failedResponse(comment, badRequest)
    
        try {
            // Identify which comment it is in comment collection
            const commentDoc = doc(db, 'comments', comment.id!)
            // Only update body ( all other properties: off limits )
            await updateDoc(commentDoc, {
                body: comment.body,
                dateMS: comment.dateMS
            })
        } catch (err) {
            // On network error
            const error = err as Error
            return failedResponse(error, fetchFail)
        }
        return new Response(JSON.stringify(comment), responseSuccess)
    }

}

export async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)
    // Ideally, want to get displayName ( aka userName )
    // Change later
    const userEmail = searchParams.get('userEmail')
    const postId = searchParams.get('postId')

    // Mass deletion ( cascade )
    if (userEmail) return deleteViaEmail(userEmail)
    else if (postId) return deleteViaPostId(postId)
    
    // Specific deletion
    else {
        const comment = await ValidateRequest(request, 'DELETE')
        if (comment instanceof Error) return failedResponse(comment, badRequest)
    
        try {
            // Identify which comment 
            const commentDoc = doc(db, 'comments', comment.id!)
            // Delete desired comment 
            await deleteDoc(commentDoc)
        } catch (err) {
            console.log(err)
            // On network error
            const error = err as Error
            return failedResponse(error, fetchFail)
        }
        return new Response(JSON.stringify(comment), responseSuccess)
    }
}

async function deleteViaEmail(userEmail: string) {
    const q = query(collectionRef, where('userEmail', '==', userEmail))
    let documentData;
    try {
        documentData = await getDocs(q)
        const batch = writeBatch(db)

        documentData.forEach((doc) => {
            const docRef = doc.ref;
            batch.delete(docRef)
        });
        await batch.commit()
        return new Response(JSON.stringify(`All comments related to ${userEmail} has been deleted`), responseSuccess)
    } catch (err) {
        console.log(err)
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
}

async function deleteViaPostId(postId: string) {
    const q = query(collectionRef, where('postId', '==', postId))
    let documentData;
    try {
        documentData = await getDocs(q)
        const batch = writeBatch(db)

        documentData.forEach((doc) => {
            const docRef = doc.ref;
            batch.delete(docRef)
        });
        await batch.commit()
        return new Response(JSON.stringify(`All comments related to ${postId} has been deleted`), responseSuccess)
    } catch (err) {
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
}

async function ValidateRequest(request: Request, HTTP: HTTP){
    let comment: CommentObj;
    try {
        comment = await request.json()
        switch (HTTP) {
            // Check if its missing any required properties (for each method)
            case 'POST': {
                if (!comment.body || !comment.postId || !comment.userEmail || !comment.dateMS){
                    throw new Error(`\nInvalid 'comment' request body:
                        body?               ${comment.body ? 'OK' : 'MISSING'}
                        postId?             ${comment.postId ? 'OK' : 'MISSING'}
                        userEmail?          ${comment.userEmail ? 'OK' : 'MISSING'}
                        dateMS?             ${comment.dateMS ? 'OK' : 'MISSING'}
                    `)
                }
                break;
            }
            case 'PATCH': {
                if (!comment.body || !comment.id || !comment.dateMS) {
                    throw new Error(`\nInvalid 'comment' request body:
                        body?               ${comment.body ? 'OK' : 'MISSING'}
                        dateMS?             ${comment.dateMS ? 'OK' : 'MISSING'}
                        id?                 ${comment.id ? 'OK' : 'MISSING'}
                    `)
                }
                break;
            }
            case 'DELETE': {
                if (!comment.id) {
                    throw new Error(`\nInvalid 'comment' request body:
                        id?               ${comment.id ? 'OK' : 'MISSING'}
                    `)
                }
                break;
            }
            default : {
                throw new Error('Unknown HTTP method')
            }
        }
    } catch (err) {
        // Error if missing any properties
        return err as Error
    }
    // Will return if valid as Promise<CommentObj>
    return comment
}