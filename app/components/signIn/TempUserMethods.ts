

export async function updateUserInfo(userId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?userId=${userId}`)
    if (!res.ok) {
        const err = await res.json() as Error
        // Return err, not throw: helps figure out if valid user needs to be created in db
        return new Error(err.message, { cause: err.cause })
    }
    const result = await res.json() as UserObj
}

export async function createUserInfo(userId: string, userEmail: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?userId=${userId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: userId,
            userEmail: userEmail,
            subscribedTo: []
        } as UserObj)
    })
    if (!res.ok) {
        const err = await res.json() as Error
        throw new Error(err.message, { cause: err.cause })
    }
    const result = await res.json() as UserObj
}

// Note to self: Be sure to check for typos: ( i.e. ? not / )
export async function updateUserPosts(userId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts?userId=${userId}`)
    if (!res.ok) {
        const err = await res.json() as Error
        if (res.status == 404) return []
        throw err
    } else {
        const result = await res.json() as PostObj[]
        return result
    }
}