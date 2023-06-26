import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'
import SignOut from '../components/signout'
import LogIn from '../components/login'
import { Typography } from '@mui/material'

const Index: React.FC = () => {
    const [user, setUser] = useState<any>({})

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser ? currentUser : {})
        })
    }, [])

    return (
        <main className="flex items-center justify-center ">
            {user ? (
                <div className="text-center">
                    <Typography component="h1" variant="h3">
                        Home
                    </Typography>
                    <LogIn />
                </div>
            ) : (
                <div>
                    <SignOut />
                </div>
            )}
        </main>
    )
}

export default Index
