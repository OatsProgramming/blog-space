'use client'
import styles from '@/app/components/css/signIn.module.css'
import { auth } from '@/app/config/firebase-config';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css'

export default function Edit() {
    const router = useRouter()

    const [credentialInfo, setCredentialInfo] = useState({} as UserInfo)
    const [isAuth, setIsAuth] = useState(false)

    // When authorized
    const EditProfile = dynamic(() => 
        import('@/app/components/editProfile/EditProfile')
    )

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
    
    // User must sign in ( again ) for verification
    async function handleAuth() {
        const { email, password } = credentialInfo
        try {
            const credentials = EmailAuthProvider.credential(email, password)
            await reauthenticateWithCredential(auth.currentUser!, credentials)
            setIsAuth(true)
        } catch (err) {
            const error = err as Error
            // Ignored: don't want to import another package for something simple
            
            // @ts-ignore
            if (error.code === 'auth/invalid-email') {
                notify("Invalid email")
            }
            // @ts-ignore
            else if (error.code === 'auth/wrong-password') {
                notify("Wrong password")
            }
            // @ts-ignore
            else if (error.code === 'auth/user-mismatch') {
                notify("Provided info doesn't match currently signed in user")
            }
            else notify(`Server Error: ${error.message}`)
        }
    }

    return (
        <>
            {isAuth ? (
                <EditProfile />
            ) : (
                <div style={{
                        position: 'relative',
                        top: '25vh',
                }}>
                    <form className={styles['form']}>
                        <div className={styles['textField']}>
                            <input type="email" id="email" name='password' placeholder=" "
                                onChange={(e) => setCredentialInfo({ ...credentialInfo, email: e.target.value })}
                            />
                            <label htmlFor="email">Current Email</label>
                        </div>
                        <div className={styles['textField']}>
                            <input type="password" id="password" name='password' placeholder=" "
                                onChange={(e) => setCredentialInfo({ ...credentialInfo, password: e.target.value })}
                            />
                            <label htmlFor="password">Current Password</label>
                        </div>
                    </form>
                    <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '1rem'
                    }}>
                        <button onClick={router.back}>Cancel</button>
                        <button onClick={handleAuth}>Verify</button>
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
            )}
        </>
    )
}
