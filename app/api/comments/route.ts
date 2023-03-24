import { db } from "@/app/config/firebase-config";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { badRequest, creationSuccess, failedResponse, fetchFail, NotFound, responseSuccess } from "../requestStatus";

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
        if (documentData.empty) throw new NotFound('Query returned empty')
    } catch (err) {
        const error = err as Error
        // On client error
        if (error instanceof NotFound) return failedResponse(error, badRequest)
        // On server error
        return failedResponse(error, fetchFail)
    }
    // Dont forget .docs to access all documents
    const comments = documentData.docs.map(comment => ({
        ...comment.data(),
        id: comment.id
    }))
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

export async function PATCH(request: Request){
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

export async function DELETE(request: Request){
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
                if (!comment.body || !comment.dateMS) {
                    throw new Error(`\nInvalid 'comment' request body:
                        body?               ${comment.body ? 'OK' : 'MISSING'}
                        dateMS?             ${comment.dateMS ? 'OK' : 'MISSING'}
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