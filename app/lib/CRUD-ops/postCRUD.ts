import { url } from "../tempURL"

// Singular 
export async function mutatePost(method: HTTP, content: {}): Promise<void> {
    if (method === 'GET') return 
    const res = await fetch(`${url}/api/posts`, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
    })
    if (!res.ok) {
        console.log(await res.json())
    }
}

export async function getPost(postId: string) {
    const res = await fetch(`${url}/api/posts?postId=${postId}`, {
        next: { revalidate: 0 }
    })
    if (!res.ok) {
        const err = await res.json() as Error
        throw new Error(err.message, { cause: err.cause })
    }
    return res.json()
}




// Multiple 
export async function getUserPosts(userId: string): Promise<PostObj[]> {
    const res = await fetch(`${url}/api/posts?userId=${userId}`, {
        next: { revalidate: 0 }
    })
    if (!res.ok) {
        const err = await res.json() as Error
        console.log(err)
        throw new Error(err.message, { cause: err.cause })
    }
    return res.json()
}

export async function getAllPosts(userId: string): Promise<PostObj[]> {
    const res = await fetch(`${url}/api/allPosts?userId=${userId}`, {
        next: {revalidate: 0}
    })
    if (!res.ok) {
        const err = await res.json() as Error
        throw new Error(err.message, { cause: err.cause })
    }
    return res.json()
}