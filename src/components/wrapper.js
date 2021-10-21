import React, { useState } from 'react'
import List from './List/List'
import store from './Utils/store'
import StoreApi from './Utils/storeApi'
import { v4 as uuid } from "uuid"
import { makeStyles } from '@mui/styles';
import InputContainer from './Input/InputContainer'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        overflowY: 'auto'
    }
}))
export default function Wrapper() {
    const [data, setData] = useState(store)
    const classes = useStyle()

    const addMoreCard = (title, listId) => {
        const newCardId = uuid()
        const newCard = {
            id: newCardId,
            title,
        }
        const list = data.lists[listId]
        list.cards = [...list.cards, newCard]
        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            },
        };
        setData(newState);
    }
    const addMoreList = (title) => {
        const newListId = uuid()
        const newList = {
            id: newListId,
            title,
            cards: [],
        }
        const newState = {
            listIds: [...data.listIds, newListId],
            lists: {
                ...data.lists,
                [newListId]: newList,
            }
        }
        setData(newState)
    }
    const updateListTitle = (title, listId) => {
        const list = data.lists[listId]
        list.title = title
        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: list,
            }
        }
        setData(newState)
    }
    const deleteList = (listId) => {
        const newState = {
            ...data,
            listIds: data.listIds.filter((e) => e !== listId),
        }
        setData(newState)
    }
    const deleteCard = (cardId, listId) => {
        const newList = data.lists[listId]
        newList.cards = newList.cards.filter((e) => e.id !== cardId)
        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: newList
            }
        }
        setData(newState)
    }
    const editCard = (value, listId, cardId) => {
        const newList = data.lists[listId]
        newList.cards = newList.cards.map((e) => {
            if (e.id === cardId) {
                e.title = value
            }
            return e
        })
        const newState = {
            ...data,
            lists: {
                ...data.lists,
                [listId]: newList
            }
        }
        setData(newState)

    }
    const onDragEnd = (result) => {
        const { destination, source, draggableId, type } = result
        if (!destination) {
            return
        }
        if (type === 'list') {
            const newListIds = data.listIds;
            newListIds.splice(source.index, 1)
            newListIds.splice(destination.index, 0, draggableId)
            return
        }
        const sourceList = data.lists[source.droppableId]
        const destinationList = data.lists[destination.droppableId]
        const draggingCard = sourceList.cards.filter((card) => card.id === draggableId)[0]
        if (source.droppableId === destination.droppableId) {
            sourceList.cards.splice(source.index, 1)
            destinationList.cards.splice(destination.index, 0, draggingCard)
            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: destinationList
                }
            }
            setData(newState)
        } else {
            sourceList.cards.splice(source.index, 1)
            destinationList.cards.splice(destination.index, 0, draggingCard)
            const newState = {
                ...data,
                lists: {
                    ...data.lists,
                    [sourceList.id]: sourceList,
                    [destinationList]: destinationList
                }
            }
            setData(newState)
        }
    }
    return (
        <StoreApi.Provider value={{ addMoreCard, addMoreList, updateListTitle, deleteList, deleteCard, editCard }}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='app' type='list' direction='horizontal'>
                    {(provided) => (
                        <div className={classes.root} ref={provided.innerRef}
                            {...provided.droppableProps}>
                            {data.listIds.map((listId, index) => {
                                const list = data.lists[listId];
                                return <List list={list} key={listId} index={index} />
                            })}
                            <InputContainer type="list" />
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>
            </DragDropContext>
        </StoreApi.Provider>
    )
}
