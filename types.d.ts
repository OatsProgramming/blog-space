type CommentObj = {
    body: string,
    userEmail: string,
    postId: string,
    id?: string
}

type HTTP = 'GET' | 'POST' | 'PATCH' | 'DELETE'

type PostObj = {
    title: string,
    body: string,
    userId: string,
    id?: string,
}

type Status = {
    status: number,
    headers: {
        "Content-Type" : string
    }
}

type UserObj = {
    id: string,
    userEmail: string,
    subscribedTo: string[]
}

interface UserReqObj extends UserObj {
    otherUserId?: string,
    PATCHMethod?: 'add' | 'delete'
}

