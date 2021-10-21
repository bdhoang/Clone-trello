import React from 'react'
import { makeStyles } from '@mui/styles';
import { AppBar, Button, Toolbar } from '@mui/material';

const useStyle = makeStyles((theme) => ({
    AppBar: {
        background: 'none !important',

    },
    title: {
        flexGrow: 1,
    },
    btn: {
        color: '#fff !important',
        backgroundColor: '#000 !important'
    }
}))
export default function TopBar({ setOpenSideMenu }) {
    const classes = useStyle()
    return (
        <div>
            <AppBar position='static' className={classes.AppBar} elevation={0}>
                <Toolbar>
                    <h1 className={classes.title}>Daily Todo</h1>
                    <Button className={classes.btn}
                        onClick={() => setOpenSideMenu(true)} >
                        Change Background
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}