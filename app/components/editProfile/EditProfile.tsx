import { auth } from "@/app/config/firebase-config"
import { updateProfile, updateEmail, updatePassword } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useState, MouseEvent } from "react"
import styles from '@/app/components/css/signIn.module.css'
import dynamic from "next/dynamic"
import { url } from "@/app/lib/tempURL"

type NewInfo = {
    userName: string,
    email: string,
    password: string,
}

export default function EditProfile() {
    const router = useRouter()
    const [newInfo, setNewInfo] = useState({} as NewInfo)

    // Toast related items for errors
    const ToastContainer = dynamic(() =>
        import('@/app/lib/toast/ToastContainer')
    ) as React.ForwardRefExoticComponent<any>

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
            
            // To update all user posts with new data
            await fetch(`${url}/api/allPosts?userId=${auth.currentUser?.uid}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                // Ideally, want to do this with displayName ( change this later )
                body: JSON.stringify({ email: newInfo.email })
            })
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
                fetch(`${url}/api/allPosts?userId=${auth.currentUser?.uid}`, {
                    method: "DELETE",
                }),
                // Delete user comments
                fetch(`${url}/api/comments?userEmail=${auth.currentUser?.email}`, {
                    method: "DELETE",
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
        <div>
            <form className={styles['form']}>
                <div className={styles['textField']}>
                    <input type="text" id="userName" name='userName' placeholder=" "
                        onChange={(e) => setNewInfo({ ...newInfo, userName: e.target.value.trim() })}
                    />
                    <label htmlFor="userName">Username</label>
                </div>
                <div className={styles['textField']}>
                    <input type="email" id="email" name='password' placeholder=" "
                        onChange={(e) => setNewInfo({ ...newInfo, email: e.target.value.trim() })}
                    />
                    <label htmlFor="email">New Email</label>
                </div>
                <div className={styles['textField']}>
                    <input type="password" id="password" name='password' placeholder=" "
                        onChange={(e) => setNewInfo({ ...newInfo, password: e.target.value.trim() })}
                    />
                    <label htmlFor="password">Password</label>
                </div>
            </form>
            <div>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={router.back}>Cancel</button>
                <button onClick={handleDelete}>Delete Account</button>
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