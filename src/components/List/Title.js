import { InputBase, Typography, IconButton } from '@mui/material'
import React, { useState, useContext } from 'react'
import { makeStyles } from '@mui/styles';
import { Close } from '@mui/icons-material';
import storeApi from '../Utils/storeApi';

const useStyle = makeStyles((theme) => ({
    editableTitle: {
        flexGrow: 1,
        fontSize: '1.2rem !important',
        fontWeight: 'bold !important',
        cursor: 'pointer'
    },
    editableContainer: {
        margin: '8px !important',
        display: 'flex'
    },
    input: {
        fontSize: '1.2rem !important',
        fontWeight: 'bold !important',
        margin: '8px !important',
        '&:focus': {
            background: "#ddd"
        }
    }
}))

export default function Title({ title, listId }) {
    const [open, setOpen] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const { updateListTitle, deleteList } = useContext(storeApi)
    const classes = useStyle()
    const handleOnChange = (e) => {
        setNewTitle(e.target.value)
    }
    const handleOnBlur = () => {
        updateListTitle(newTitle, listId)
        setOpen(false)
    }
    const handleClick = () => {
        deleteList(listId)
    }
    return (
        <div>
            {open ?
                (<div>
                    <InputBase
                        onChange={handleOnChange}
                        value={newTitle}
                        autoFocus
                        inputProps={{ className: classes.input }}
                        fullWidth
                        onBlur={handleOnBlur}
                    />
                </div>) : (<div className={classes.editableContainer}>
                    <Typography
                        onClick={() => setOpen(!open)}
                        className={classes.editableTitle}
                    >
                        {title}
                    </Typography>
                    <IconButton onClick={handleClick}>
                        <Close />
                    </IconButton>
                </div>)}
        </div>
    )
}
