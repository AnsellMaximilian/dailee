import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'
import React, { useState } from 'react'
import { firestore } from '../firebase/config'
import { Task } from '../types'
import CheckBox from './CheckBox'

const useStyles = makeStyles(theme => ({
    taskItem: {
        transition: "all 0.5s",
    },
    deleted: {
        transform: "translateX(200%)",
        position: "relative"
    }
}))

export default function TaskItem({task}: {task: Task}) {

    const classes = useStyles();

    const [checked, setChecked] = useState(false);

    const completeTask = () => {
        setChecked(true);
        (new Promise<void>((resolve, reject) => {
            setTimeout(() => resolve(), 500)
        })).then(() => {
            firestore.collection('tasks').doc(task.id).delete();
        })
    }

    return (
        <ListItem className={`${classes.taskItem} ${checked && classes.deleted}`}>
            <ListItemIcon>  
                <CheckBox checked={checked} completeTask={completeTask}/>
            </ListItemIcon>
            <ListItemText primary={task.title}/>
            <ListItemSecondaryAction>
                <IconButton>
                    <EditIcon color="primary"/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
