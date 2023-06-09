import { auth } from "@/app/config/firebase-config"
import { updateProfile, updateEmail, updatePassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useState, MouseEvent } from "react"
import styles from '@/app/components/css/signIn.module.css'
import ToastContainer from '../../lib/toast/ToastContainer'

type NewInfo = {
    userName: string,
    email: string,
    password: string,
}

export default function EditProfile() {
    const router = useRouter()
    const [newInfo, setNewInfo] = useState({} as NewInfo)
    // Used for updating
    const currentEmail = auth.currentUser?.email

    const notify = async (message: string) => {
        const toast = await import('@/app/lib/toast/toastNotification').then((mod) => mod.default)
        return toast.error(message, {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    async function handleUpdate(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (!newInfo.userName && !newInfo.email && !newInfo.password) return
        // Note to self: cant use Promise.all() here; will cause errors
        
        try {
            if (newInfo.userName) {
                await updateProfile(auth.currentUser!, {
                    displayName: newInfo.userName
                })
            }
            if (newInfo.email) {
                await updateEmail(auth.currentUser!, newInfo.email)
            }
            if (newInfo.password) {
                await updatePassword(auth.currentUser!, newInfo.password)
            }

            await Promise.all([
                // Update user posts
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/allPosts?userId=${auth.currentUser?.uid}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: auth.currentUser?.email })
                }),
                // Update user comments
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?userEmail=${currentEmail}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email: auth.currentUser?.email })
                }),
                // Update user data from db
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userEmail: auth.currentUser?.email,
                        id: auth.currentUser?.uid
                    })
                }),
            ])
            router.back()
        } catch (err) {
            console.log(err)
            const error = err as Error
            notify(`Server Error: ${error.message}`)
        }
    }

    async function handleDelete(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        try {
            await Promise.all([
                // Delete user posts
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/allPosts?userId=${auth.currentUser?.uid}`, {
                    method: "DELETE",
                }),
                // Delete user comments
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments?userEmail=${auth.currentUser?.email}`, {
                    method: "DELETE",
                }),
                // Delete user data from db
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type" : "application/json"
                    },
                    body: JSON.stringify({ id: auth.currentUser?.uid })
                })
            ])
            // Then delete user ( might be the first one to execute; best for it to be last )
            await auth.currentUser?.delete()
            router.push('/')
        } catch (err) {
            console.log(err)
            const error = err as Error
            notify(`Server Error: ${error.message}`)
        }
    }

    return (
        <div style={{
            position: 'relative',
            top: '15rem'
        }}>
            <form className={styles['form']}>
                <div className={styles['textField']}>
                    <input type="email" id="email" name='password' placeholder=" "
                        onChange={(e) => setNewInfo({ ...newInfo, email: e.target.value.trim() })}
                    />
                    <label htmlFor="email">New Email?</label>
                </div>
                <div className={styles['textField']}>
                    <input type="password" id="password" name='password' placeholder=" "
                        onChange={(e) => setNewInfo({ ...newInfo, password: e.target.value.trim() })}
                    />
                    <label htmlFor="password">New Password?</label>
                </div>
            </form>
            <div style={{
                width: '100%',
                display: 'flex',
                padding: '0 1rem',
                gap: '1rem',
                justifyContent: 'space-evenly'
            }}>
                <button onClick={handleDelete}>Delete Account</button>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={router.back}>Cancel</button>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                limit={3}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}