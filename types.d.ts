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

type PostsMap = Map<string, PostObj[]>

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

type UserState = {
    userInfo: UserObj,
    userPosts: PostObj[],
    updateUserInfo: (userId: string) => void | Promise<Error>,
    createUserInfo: (userId: string, userEmail: string) => void,
    updateUserPosts: (userId: string) => void,
    filterPosts: (posts: PostObj[], subscribedTo: string[]) => PostObj[],
    resetPostsMap: () => void
}

interface UserReqObj extends UserObj {
    otherUserId?: string,
    PATCHMethod?: 'add' | 'delete'
}

