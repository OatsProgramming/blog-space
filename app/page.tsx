'use client'

// import SignInPageAnimation from './components/signIn/SignInPageAnimation'
import { explorePosts } from '@/toyData/postData'
// import StaticModal from './components/modal/StaticModal'
import { userId } from '@/toyData/userData'
import Slider from './components/posting/Slider'

export default function SignIn() {

  return (
    <div>
      {/* <StaticModal userId={'userId'} posts={userPosts}/> */}
      {/* <SignInPageAnimation /> */}
      <Slider posts={explorePosts} userId={userId} />
    </div>
  )
}
