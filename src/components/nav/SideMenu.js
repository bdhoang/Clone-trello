import React, { useState, useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { Drawer, Grow } from '@mui/material';
import colors from '../Utils/color';
import { getImages } from '../Utils/ImageApi';

const useStyle = makeStyles((theme) => ({
    drawer: {
        width: '400px'
    },
    menu: {
        marginTop: '16px',
        display: 'flex',
        justifyContent: 'space-around',
    },
    box: {
        width: '45%',
        height: '90px',
        backgroundColor: 'blue',
        borderRadius: '9px',
        marginBottom: '16px'
    },
    optionContainer: {
        marginTop: '16px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }
}))
export default function SideMenu({ openSideMenu, setOpenSideMenu, setBackgroundImage }) {
    const classes = useStyle()
    const [openOptionColor, setOpenOptionColor] = useState(false)
    const [openOptionImage, setOpenOptionImage] = useState(false)
    const [images, setImages] = useState([])
    const getListOfImage = async () => {
        const listOfImages = await getImages()
        setImages(listOfImages)
    }

    useEffect(() => {
        getListOfImage()

    }, [])
    return (
        <div>
            <Drawer open={openSideMenu} anchor='right'
                onClose={() => setOpenSideMenu(false)}
            >
                <div className={classes.drawer}>
                    <div className={classes.menu}>
                        <div className={classes.box}
                            style={{
                                backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Landscape_Arnisee-region.JPG/1200px-Landscape_Arnisee-region.JPG)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            onClick={() => setOpenOptionImage(true)}> </div>
                        <div className={classes.box}
                            style={{
                                backgroundImage: 'url(https://htmlcolorcodes.com/assets/images/html-color-codes-color-palette-generators-hero.jpg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover'
                            }}
                            onClick={() => {
                                setOpenOptionColor(true)
                                setOpenOptionImage(false)
                            }}
                        > </div>

                    </div>
                    {openOptionImage ? <Grow in={openOptionImage}>
                        <div className={classes.optionContainer}>
                            {images.map((image, index) => {
                                return (
                                    <div
                                        className={classes.box}
                                        key={index}
                                        style={{
                                            backgroundImage: `url(${image.thumb})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                        }}
                                        onClick={() => setBackgroundImage(image.url)}
                                    > </div>)

                            })}
                        </div>
                    </Grow>
                        :
                        <Grow in={openOptionColor}>
                            <div className={classes.optionContainer}>
                                {colors.map((color, index) => {
                                    return (<div className={classes.box}
                                        key={index}
                                        style={{
                                            backgroundColor: color
                                        }}
                                        onClick={() => setBackgroundImage(color)}
                                    > </div>)

                                })}
                            </div>
                        </Grow>}


                </div>
            </Drawer>
        </div>
    )
}