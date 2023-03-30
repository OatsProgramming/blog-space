import { url } from "../tempURL"

// Singular
export async function mutateComment(postId: string, method: HTTP, content: {}) {
    const res = await fetch(`${url}/api/comments?postId=${postId}`, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
    })
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err)
    }
}

// Multiple
export async function getComments(postId: string): Promise<CommentObj[]> {
    const res = await fetch(`${url}/api/comments?postId=${postId}`, {
        cache: 'no-store'
    })
    if (!res.ok) {
        const err = await res.json() as Error
        console.log(err)
        throw new Error(err.message, { cause: err.cause })
    }
    return res.json()
}