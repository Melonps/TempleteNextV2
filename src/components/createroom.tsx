import React, { ChangeEvent, useState, useEffect } from 'react'
import { TextField, Button, Typography } from '@mui/material'
import { db } from '../firebase/firebase'
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import UpdateCommentModal from './updatecomment'

interface Comment {
    id: string
    name: string
    comment: string
}

const CreateRoom: React.FC = () => {
    const [comment, setComment] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [commentList, setCommentList] = useState<Comment[]>([])
    const roomCollection = collection(db, 'room')

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const addComment = async () => {
        try {
            await addDoc(roomCollection, { name, comment })
        } catch (error) {
            console.log(error)
            // ユーザーにエラーメッセージを表示するコンポーネントを作成し、そこでエラーメッセージを表示する
        }
    }

    const removeComment = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'room', id))
        } catch (error) {
            console.log(error)
            // ユーザーにエラーメッセージを表示するコンポーネントを作成し、そこでエラーメッセージを表示する
        }
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(roomCollection, (snapshot) => {
            const updatedCommentList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Comment[]
            setCommentList(updatedCommentList)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    return (
        <>
            <Typography variant="h4" align="center" component="h2">
                Name and Comment
            </Typography>
            <TextField
                id="name"
                margin="normal"
                label="Name"
                type="text"
                fullWidth
                value={name}
                onChange={handleNameChange}
            />
            <TextField
                id="standard-basic"
                margin="normal"
                label="Comment"
                variant="standard"
                fullWidth
                autoFocus
                value={comment}
                onChange={handleCommentChange}
            />
            <Button variant="contained" color="primary" fullWidth onClick={addComment}>
                Submit Comment
            </Button>
            <Typography variant="body2" align="center" component="div">
                <Typography variant="h4" align="center" component="h2">
                    Comment List
                </Typography>
                {commentList.map((commentData) => (
                    <div key={commentData.id}>
                        <Typography variant="body2" component="body" sx={{ mt: 1 }}>
                            {commentData.name} : {commentData.comment}
                            <UpdateCommentModal id={commentData.id} comment={commentData.comment}></UpdateCommentModal>
                            <Button onClick={() => removeComment(commentData.id)} color="secondary">
                                Remove
                            </Button>
                        </Typography>
                    </div>
                ))}
            </Typography>
        </>
    )
}

export default CreateRoom
