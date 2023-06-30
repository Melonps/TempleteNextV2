import { useState } from 'react'
import { TextField, Button, Typography, Box } from '@mui/material'
import { db } from '../firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import Modal from 'react-modal'

interface UpdateComponentProps {
    id: string
    comment: string
}

const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    return {
        isOpen,
        openModal,
        closeModal
    }
}

const UpdateCommentModal: React.FC<UpdateComponentProps> = ({ id, comment }) => {
    const { isOpen, openModal, closeModal } = useModal()
    const [newComment, setNewComment] = useState(comment)

    const handleOpenModal = () => {
        openModal()
    }

    const handleSaveComment = async () => {
        try {
            await updateDoc(doc(db, 'room', id), { comment: newComment })
            closeModal()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Button color="secondary" onClick={handleOpenModal}>
                Edit
            </Button>
            <Modal isOpen={isOpen} className="Modal flex justify-center " overlayClassName="Overlay">
                <Typography variant="body2" align="center" component="div">
                    <Typography variant="h6">Modal Content</Typography>
                    <div className="flex">
                        <TextField
                            label="Comment"
                            value={newComment}
                            onChange={(event) => setNewComment(event.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={handleSaveComment}>
                            Update
                        </Button>
                    </div>
                </Typography>
            </Modal>
        </>
    )
}

export default UpdateCommentModal
