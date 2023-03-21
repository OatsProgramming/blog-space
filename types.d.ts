type useAuthMethodsObj = {
    createAccount: boolean,
    signedIn: boolean,
    createInfo: UserInfo,
    signInInfo: UserInfo,
    registerAccount: () => void,
    signIn: () => void,
    signInPop: () => void,
    logOut: () => void,
}

type CommentObj = {
    body: string,
    userEmail: string,
    postId: string,
    id?: string
}

type HTTP = 'GET' | 'POST' | 'PATCH' | 'DELETE'

type Params = {
   params: {
    [key: string]: string
   } 
}

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

type UserInfo =  {
    email: string,
    password: string,
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

