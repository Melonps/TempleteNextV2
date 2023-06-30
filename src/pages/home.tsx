import React from 'react'
import CreateRoom from '@/components/createroom'
import SignOut from '../components/signout'
import { Typography } from '@mui/material'

const Home = () => {
    return (
        <>
            <main className="flex items-center justify-center ">
                <div>
                    <CreateRoom />
                    <SignOut />
                </div>
            </main>
        </>
    )
}

export default Home
