export async function getSubscribedList(userId: string): Promise<string[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions?userId=${userId}`)
    // if (!res.ok) {
    //     const err = await res.json()
    //     console.log(err)
    // }
    return res.json()
}

export async function mutateSubscribeList(content: {
    id: UserReqObj['id'],
    PATCHMethod: UserReqObj['PATCHMethod'],
    otherUserId: UserReqObj['otherUserId']
}): Promise<void> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscriptions`, {
        method: 'PATCH',
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(content)
    })
    if (!res.ok) {
        console.log(await res.json())
    }
}