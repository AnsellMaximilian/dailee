import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core'
import { Delete, Publish } from '@material-ui/icons'
import React, { useState } from 'react'
import { firestore } from '../firebase/config'
import { Task } from '../types'
import firebase from 'firebase'

interface Props {
    reserveTask: Task;
    user: firebase.User;
    setOpenTaskDetail: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles(thme => ({
    reserveTaskItem: {
        transition: "all 0.5s",
    },
    deleted: {
        transform: "translateX(-200%)",
        position: "relative"
    }
}))

export default function TaskReserveItem({reserveTask, user, setOpenTaskDetail}: Props) {

    const classes = useStyles();

    const [deleted, setDeleted] = useState(false)

    const deleteReserveTask: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        setDeleted(true);

        setTimeout(() => {
            firestore.collection('reserveTasks').doc(reserveTask.id).delete();
        }, 500);
    }

    const transferReserveTask: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        e.stopPropagation();
        firestore.collection('tasks').add({
            title: reserveTask.title,
            description: reserveTask.description,
            timeFrame: reserveTask.timeFrame,
            user: user.uid
        })
    }

    return (
        <ListItem button className={`${classes.reserveTaskItem} ${deleted && classes.deleted}`} onClick={() => setOpenTaskDetail(reserveTask.id)}>
            <ListItemIcon>
                <IconButton color="primary" onClick={transferReserveTask}>
                    <Publish/>
                </IconButton>
            </ListItemIcon>
            <ListItemText>{reserveTask.title}</ListItemText>
            <ListItemSecondaryAction>
                <IconButton style={{color: 'red'}} onClick={deleteReserveTask}>
                    <Delete/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
