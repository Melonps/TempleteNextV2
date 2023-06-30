import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { auth } from '../firebase/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, User } from 'firebase/auth'
import { FirebaseError } from '@firebase/util'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SignUp: React.FunctionComponent = () => {
    const [signUpEmail, setSignUpEmail] = useState<string>('')
    const [signUpPassword, setSignUpPassword] = useState<string>('')
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    const handleSignUp = async (event: FormEvent) => {
        event.preventDefault()

        try {
            await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
            console.log('[Succeeded] Sign up')
        } catch (error) {
            if (error instanceof FirebaseError) {
                alert(error.message)
            }
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSignUpEmail(event.target.value)
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSignUpPassword(event.target.value)
    }

    if (user) {
        router.push('/home')
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <form onSubmit={handleSignUp}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={signUpEmail}
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
                    value={signUpPassword}
                    onChange={handlePasswordChange}
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    アカウント作成
                </Button>
                <Typography variant="body2" sx={{ mt: 2 }} align="center">
                    ログインは<Link href="/loginpage">こちら</Link>
                </Typography>
            </form>
        </>
    )
}

export default SignUp
