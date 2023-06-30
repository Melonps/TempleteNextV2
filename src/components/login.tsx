import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import { signInWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import { FirebaseError } from '@firebase/util'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

const SignIn: React.FC = () => {
    const [signInEmail, setSignInEmail] = useState<string>('')
    const [signInPassword, setSignInPassword] = useState<string>('')
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    // Firebaseのユーザーのサインイン状態を監視するためのuseEffectフック
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    // フォームのサブミット時のハンドラー関数
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        try {
            // FirebaseのsignInWithEmailAndPasswordメソッドを使用して、ユーザーのサインインを試行する
            await signInWithEmailAndPassword(auth, signInEmail, signInPassword)
            console.log('[Succeeded] Sign in')
            router.push('/home')
        } catch (error) {
            if (error instanceof FirebaseError) {
                alert(error.message)
            }
        }
    }

    // メールアドレスの入力フィールドの変更時のハンドラー関数
    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSignInEmail(event.target.value)
    }

    // パスワードの入力フィールドの変更時のハンドラー関数
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSignInPassword(event.target.value)
    }

    return (
        <>
            {user ? (
                // ユーザーがサインインしている場合はホームページへのリンクを表示
                <Link href={`/home`} passHref />
            ) : (
                // ユーザーがサインインしていない場合はサインインフォームを表示
                <>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={signInEmail}
                            onChange={handleEmailChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={signInPassword}
                            onChange={handlePasswordChange}
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 4, mx: 'auto' }}>
                            Log In
                        </Button>
                        <Typography variant="body2" sx={{ mt: 2 }} align="center">
                            新規ユーザ登録は<Link href={'/signuppage'}>こちら</Link>
                        </Typography>
                    </form>
                </>
            )}
        </>
    )
}

export default SignIn
