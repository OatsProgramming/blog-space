import { db } from "@/app/config/firebase-config";
import { url } from "@/app/lib/tempURL";
import { collection, getDocs, query, where, writeBatch } from "@firebase/firestore/lite";
import { badRequest, failedResponse, fetchFail, responseSuccess } from "../requestStatus";

// export const config = {
//     runtime: 'edge',
// }

const collectionRef = collection(db, 'posts')

export async function GET(request: Request){
    // Extract userId query to make sure to get all posts but current user
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    if (!userId) return failedResponse(new Error('User ID not given'), badRequest)
    const q = query(collectionRef, where('userId', '!=', userId))
    let documentData;
    try {
        documentData = await getDocs(q)
    } catch (err) {
        const error = err as Error
        return failedResponse(error, fetchFail)
    }

    const allPosts = documentData.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    })) as PostObj[]

    return new Response(JSON.stringify(allPosts), responseSuccess)
}

// For user when editing profile
export async function PATCH(request: Request) {
    // Check if request body is valid
    // Ideally, want to do this with displayName ( change this later )
    let user = await request.json()
    if (!user.email) return failedResponse(new Error("Email was not given ( allPost )"), badRequest)

    // Verify if userId is given
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    if (!userId) return failedResponse(new Error("User ID not given"), badRequest)

    // Get all user posts
    const q = query(collectionRef, where('userId', '==', userId))
    let documentData;
    try {
        documentData = await getDocs(q)
        const batch = writeBatch(db)

        // Update 
        documentData.forEach((doc) => {
            const docRef = doc.ref;
            batch.update(docRef, { userEmail: user.email });
        });

        await batch.commit()
    } catch (err) {
        const error = err as Error
        return failedResponse(error, fetchFail)
    }
    return new Response(JSON.stringify(user), responseSuccess)
}

// For user when deleting profile
export async function DELETE(request: Request) {
    // Verify if userId is given
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    if (!userId) return failedResponse(new Error("User ID not given"), badRequest)

    // Get all user posts
    const q = query(collectionRef, where('userId', '==', userId))
    let documentData;
    try {
        documentData = await getDocs(q)
        const batch = writeBatch(db)

        // Prevent blocking
        const promises: Promise<Response>[] = []

        // Delete posts...
        documentData.forEach((doc) => {
            const docRef = doc.ref;
            // ...while also deleting the comments
            promises.push(
                fetch(`${url}/api/comments?postId=${doc.id}`, {
                    method: 'DELETE'
                })
            )
            batch.delete(docRef)
        });

        await Promise.all(promises)
        await batch.commit()
    } catch (err) {
        const error = err as Error
        console.log(error.message)
        return failedResponse(error, fetchFail)
    }
    return new Response(JSON.stringify(`All posts related to ${userId} has been deleted`), responseSuccess)
}