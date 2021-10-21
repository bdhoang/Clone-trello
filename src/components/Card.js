import { Paper, IconButton, InputBase } from '@mui/material'
import React, { useContext, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { Draggable } from 'react-beautiful-dnd';
import { Close, Edit } from '@mui/icons-material';
import storeApi from './Utils/storeApi';

const useStyle = makeStyles((theme) => ({
    card: {
        padding: '8px 8px 8px 16px !important',
        margin: '8px !important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn: {
        fontSize: '1rem !important',
        float: 'right !important'
    }
}))

export default function Card({ card, index, listId }) {
    const { deleteCard, editCard } = useContext(storeApi)
    const handleDeleteCard = () => {
        deleteCard(card.id, listId)
    }
    const handleShowEditor = () => {
        setIsEdit(true)
    }
    const handleEditCard = (e) => {
        setIsEdit(false)
        editCard(e.target.value, listId, card.id)
    }
    const [isEdit, setIsEdit] = useState(false)
    const [cardTitle, setCardTitle] = useState(card.title)
    const classes = useStyle()
    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided) => (<div
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
            >
                <Paper className={classes.card}>
                    {isEdit ? <InputBase value={cardTitle} onChange={(e) => setCardTitle(e.target.value)} onBlur={handleEditCard} /> : card.title}
                    <div><IconButton onClick={handleDeleteCard}>
                        <Close className={classes.btn} />
                    </IconButton>
                        <IconButton onClick={handleShowEditor} >
                            <Edit className={classes.btn} />
                        </IconButton></div>
                </Paper>
            </div>)}

        </Draggable>
    )
}
