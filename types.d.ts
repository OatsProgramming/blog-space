// Best to not convert Timestamp objects and Date objects back and fourth
// Timestamp: nanoseconds
// Date: milliseconds

type AuthState = {
    createAccount: boolean,
    signedIn: boolean,
    createInfo: UserInfo,
    signInInfo: UserInfo,
    registerAccount: () => void | Promise<Error>,
    signIn: () => void | Promise<Error>,
    signInPop: () => void | Promise<Error>,
    logOut: () => void,
}

type CommentObj = {
    dateMS: number,
    body: string,
    userEmail: string,
    postId: string,
    id?: string
}

type HTTP = 'GET' | 'POST' | 'PATCH' | 'DELETE'

type Navi = 'explore' | 'following' | 'main'

type Params = {
   params: {
    [key: string]: string
   } 
}

type PostObj = {
    dateMS: number,
    title: string,
    body: string,
    userId: string,
    userEmail: string,
    id?: string,
}

type QuickParam = { 
    dateMS: number, 
    [key: string] : any
}[]

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

type UserState = {
    userInfo: UserObj,
    userPosts: PostObj[],
    updateUserInfo: (userId: string) => void | Promise<Error>,
    createUserInfo: (userId: string, userEmail: string) => void,
    updateUserPosts: (userId: string) => void,
}

interface UserReqObj {
    id: string,
    otherUserId: string,
    PATCHMethod: 'add' | 'delete'
}

