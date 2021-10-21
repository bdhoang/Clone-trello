import React from 'react'
import Title from './Title';
import { Paper, CssBaseline } from '@mui/material'
import { makeStyles } from '@mui/styles';
import Card from '../Card';
import InputContainer from '../Input/InputContainer';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const useStyle = makeStyles((theme) => ({
    root: {
        minWidth: '300px !important',
        backgroundColor: '#EBECF0 !important',
        marginLeft: '8px'
    },
    cardContainer: {
        marginTop: '32px !important'
    }
}))
export default function List({ list, index }) {
    const classes = useStyle()
    return (
        <Draggable draggableId={list.id} index={index}>
            {(provided) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <Paper className={classes.root} {...provided.dragHandleProps}>
                        <CssBaseline />
                        <Title title={list.title} listId={list.id} />
                        <Droppable droppableId={list.id}>
                            {(provided) =>
                            (<div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={classes.cardContainer}
                            >{
                                    list.cards?.map((card, index) => (
                                        <Card key={card.id} card={card} index={index} listId={list.id} />
                                    ))}
                                {provided.placeholder}
                            </div>)
                            }

                        </Droppable>
                        <InputContainer listId={list.id} type='card' />
                    </Paper>
                </div>
            )}

        </Draggable>
    )
}
