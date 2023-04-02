import SignInPageAnimation from './components/signIn/SignInPageAnimation'
import { userPosts } from '@/toyData/postData'
import StaticModal from './components/modal/StaticModal'

export default function SignIn() {
  return (
    <main>
      {/* <StaticModal userId={'userId'} posts={userPosts}/> */}
      <SignInPageAnimation />
    </main>
  )
}
