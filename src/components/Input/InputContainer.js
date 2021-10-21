import { Collapse, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import InputCard from './InputCard';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '300px',
        marginTop: '8px'
    },
    addCard: {

        padding: '8px 8px 8px 16px !important',
        margin: '0px 8px 8px 8px !important',
        background: '#EBECF0 !important',
        '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.2)',
            cursor: 'pointer'
        }
    }
}))
export default function InputContainer({ listId, type }) {
    const classes = useStyle()
    const [open, setOpen] = useState(false)
    return (
        <div className={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen} listId={listId} type={type} />
            </Collapse>
            <Collapse in={!open}>
                <Paper
                    className={classes.addCard}
                    elevation={0}
                    onClick={() => setOpen(!open)}>
                    <Typography >
                        {type === 'card' ? '+ Add a Card' : 'Add another List'}
                    </Typography>
                </Paper>
            </Collapse>
        </div>
    )
}
