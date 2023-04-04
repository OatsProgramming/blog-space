'use client'

import LoadingCircle from './components/loading/LoadingCircle'
import LoadingSquare from './components/loading/LoadingSquare'
import SignInPageAnimation from './components/signIn/SignInPageAnimation'
import StaticModal from './components/modal/StaticModal'
import { userId } from '@/toyData/userData'
import { explorePosts } from '@/toyData/postData'
import Slider from './components/posting/Slider'
import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { FaRegCompass } from 'react-icons/fa'
import AddPost from './components/posting/AddPost'
import RefreshPage from './components/RefreshPage'
import styles from './components/css/nav.module.css'
import Image from 'next/image'
import navImg from '../public/navBg.svg'

export default function SignIn() {

  return (
    <div>
      {/* <StaticModal userId={'userId'} posts={explorePosts} changePost={function (index: number): void {
        console.log('hello')
      } }/> */}
      <SignInPageAnimation />
      {/* <Slider posts={explorePosts} userId={userId} /> */}
    </div>
  )
}