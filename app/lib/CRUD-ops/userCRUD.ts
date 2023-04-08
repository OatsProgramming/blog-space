// Only interested if it doesnt exists
export async function getUser(userId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users?userId=${userId}`)
    if (!res.ok) {
        return res
    }
}

export async function createUser(content: UserObj) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(content)
    })
    if (!res.ok) {
        console.log(await res.json())
    }
}