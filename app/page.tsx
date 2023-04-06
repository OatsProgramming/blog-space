'use client'
import SignInPageAnimation from './components/signIn/SignInPageAnimation'
import { userPosts } from '@/toyData/postData'
import PostComponent from './components/posting/Post'
import { userId } from '@/toyData/userData'
import { useAuth } from './lib/stateManagement/authState'
import { useRouter } from 'next/navigation'
import Empty from './components/Empty'

export default function SignIn() {
  const { logOut } = useAuth()
  const router = useRouter()

  function handleLogOut() {
    logOut()
    router.push('/')
  }

  return (
    <div>
      <SignInPageAnimation />
      {/* <div >
        {userPosts.length > 0 ? (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
            padding: '2rem',
            // border: '1px solid red',
          }}>
            {userPosts.map(post => (
              <PostComponent key={post.id} userId={userId} post={post} />
            ))}
          </div>
        ) : (
          <Empty inUserPage />
        )}
        <div>
          <button onClick={() => console.log()}>Log out</button>
        </div>
      </div> */}

    </div>
  )
}