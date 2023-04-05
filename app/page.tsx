'use client'
import SignInPageAnimation from './components/signIn/SignInPageAnimation'
import { userPosts } from '@/toyData/postData'
import PostComponent from './components/posting/Post'
import { userId } from '@/toyData/userData'
import { useAuth } from './lib/stateManagement/authState'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const { logOut } = useAuth()
  const router = useRouter()

  function handleLogOut() {
    logOut()
    router.push('/')
  }

  return (
    <div>
      {/* <SignInPageAnimation /> */}
      <div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          {userPosts.map(post => (
            <PostComponent key={post.id} userId={userId} post={post} />
          ))}
        </div>
        <div>
          <button onClick={handleLogOut}>Log out</button>
        </div>
      </div>
    </div>
  )
}