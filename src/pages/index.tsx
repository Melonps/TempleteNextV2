import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebase'

import LogIn from '../components/login'
import Home from '@/pages/home'
import SignUpPage from './signuppage'

const Index: React.FC = () => {
    const [user, setUser] = useState<any>({})

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser ? currentUser : {})
        })
    }, [])

    return <>{user ? <SignUpPage /> : <Home />}</>
}

export default Index
