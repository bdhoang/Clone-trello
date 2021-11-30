import { Close } from '@mui/icons-material'
import { Button, IconButton, InputBase, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React, { useState, useContext } from 'react'
import storeApi from '../Utils/storeApi';


const useStyle = makeStyles((theme) => ({
    card: {
        margin: '0px 8px 8px 8px',
        paddingBottom: '32px',
        width: '280px'
    },
    input: {
        margin: "8px !important"
    },
    btnConfirm: {
        background: '#5AAC44 !important',
        color: '#fff !important',
        '&:hover': {
            opacity: '0.8'
        }
    },
    confirm: {
        margin: '0px 8px 8px 8px',
    }
}))
export default function InputCard({ setOpen, listId, type }) {
    const classes = useStyle()
    const { addMoreCard, addMoreList } = useContext(storeApi);
    const [title, setTitle] = useState('');
    const handleOnChange = (e) => {
        setTitle(e.target.value);
    }
    const handleBtnConfirm = () => {
        if (type === 'card') {
            addMoreCard(title, listId);
            setTitle('')
            setOpen(false)
        }
        else {
            addMoreList(title)
            setTitle('')
            setOpen(false)
        }
    }
    return (
        <>
            <div >
                <Paper className={classes.card}>
                    <InputBase
                        multiline={true}
                        onChange={handleOnChange}
                        onBlur={() => setOpen(false)}
                        fullWidth
                        inputProps={{
                            className: classes.input
                        }}
                        placeholder={type === 'card'
                            ? 'Enter a title of this card ..'
                            : 'Enter list title'}
                        value={title}
                    /></Paper>
            </div>
            <div className={classes.confirm}>
                <Button className={classes.btnConfirm}
                    onClick={handleBtnConfirm}>
                    {type === 'card' ? 'Add Card' : 'Add List'}
                </Button>
                <IconButton onClick={() => setOpen(false)}>
                    <Close />
                </IconButton>
            </div>
        </>
    )
}
