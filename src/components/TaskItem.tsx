import { Collapse, IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles, Typography } from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'
import React, { useState } from 'react'
import { firestore } from '../firebase/config'
import { Task } from '../types'
import CheckBox from './CheckBox'

interface Props {
    isOpen: boolean;
    task: Task;
    setOpenTask: React.Dispatch<React.SetStateAction<string>>;
    setOpenTaskDetail: React.Dispatch<React.SetStateAction<string>>;
}

const useStyles = makeStyles(theme => ({
    taskItem: {
        transition: "all 0.5s",
    },
    deleted: {
        transform: "translateX(200%)",
        position: "relative"
    }
}))

export default function TaskItem({task, isOpen, setOpenTask, setOpenTaskDetail}: Props) {

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

    const toggleDetails = () => {
        // if details already open; close
        if(isOpen) setOpenTask('');
        else setOpenTask(task.id);
    }

    return (
        <>
        <ListItem button className={`${classes.taskItem} ${checked && classes.deleted}`} onClick={toggleDetails}>
            <ListItemIcon>  
                <CheckBox checked={checked} completeTask={completeTask}/>
            </ListItemIcon>
            <ListItemText primary={task.title}/>
            <ListItemSecondaryAction>
                <IconButton onClick={() => setOpenTaskDetail(task.id)}>
                    <EditIcon color="primary"/>
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
         <Collapse in={isOpen}>
            <Typography>
                {task.description}
            </Typography>
        </Collapse>
        </>
    )
}
