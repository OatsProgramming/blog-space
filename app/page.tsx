'use client'
import { userId } from '@/toyData/userData'
import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai'
import { BiUserCircle } from 'react-icons/bi'
import { FaRegCompass } from 'react-icons/fa'
import BgImg from './components/BgImg'
import AddPost from './components/posting/AddPost'
import RefreshPage from './components/RefreshPage'
import SignInPageAnimation from './components/signIn/SignInPageAnimation'
import styles from './components/css/nav.module.css'

export default function SignIn() {

  return (
    <div>
      {/* <SignInPageAnimation /> */}
      <BgImg />
      <nav className={styles['nav']}>
        <Link href={`/${userId}/explore`} className={styles['item']}>
          <FaRegCompass className="icon" />
        </Link>
        <Link href={`/${userId}/home`} className={styles['item']}>
          <AiFillHome className="icon" />
        </Link>
        <AddPost />
        <Link href={`/${userId}/user`} className={styles['item']}>
          <BiUserCircle className="icon" />
        </Link>
        <RefreshPage />
      </nav>
    </div>
  )
}