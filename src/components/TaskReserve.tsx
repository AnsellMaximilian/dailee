import { Box, Container, List, makeStyles, Slide, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import theme from '../theme'
import { Task, Message } from '../types'
import TaskReserveItem from './TaskReserveItem'
import firebase from 'firebase'
import { firestore } from '../firebase/config'
import TaskDetail from './TaskDetail'

interface Props {
    reserveTasks: Task[];
    open: boolean;
    user: firebase.User;
    setMessage: React.Dispatch<React.SetStateAction<Message | null>>;
}

const useStyles = makeStyles(theme => ({
    header: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius
    },

    container: {
        backgroundColor: theme.palette.grey[50],
        position: 'fixed',
        bottom: 50,
        maxHeight: '100vh',
        minHeight: 150,
        boxShadow: theme.shadows[3],
        padding: 0,
        width: '85%',
        margin: '0 7.5%',
        maxWidth: theme.breakpoints.values.sm,
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.up('sm')]:{
            right: 0
        }
    }
}))

export default function TaskReserve({reserveTasks, open, user, setMessage}: Props) {
    const classes = useStyles();

    const [openTaskDetail, setOpenTaskDetail] = useState('');

    const handleTaskDetailClose = () => setOpenTaskDetail('');

    const saveChange = (reserveTask: Task) => {
        firestore.collection('reserveTasks').doc(reserveTask.id).update(reserveTask);
        setOpenTaskDetail('');
    }

    const reserveTaskItems = reserveTasks.map(task => (
        <TaskReserveItem
            setMessage={setMessage}
            reserveTask={task} 
            key={task.id} 
            user={user}
            setOpenTaskDetail={setOpenTaskDetail}
        />
    ))

    return (
        <Slide direction={window.innerWidth >= theme.breakpoints.values.sm ? 'left' : 'up'} in={open} mountOnEnter unmountOnExit>
            <Container className={classes.container}>
                <Box p={1} className={classes.header}>
                    <Typography>Task Reserve</Typography>
                </Box>
                {reserveTasks.length > 0 ?
                    <>
                    <List dense>
                        {reserveTaskItems}
                    </List>
                    {!!openTaskDetail &&
                        <TaskDetail 
                            task={reserveTasks.filter(task => task.id === openTaskDetail)[0]} 
                            open={!!openTaskDetail}
                            handleClose={handleTaskDetailClose}
                            saveChange={saveChange}
                        />
                    }
                    </>
                    :
                    <Typography>Get Yo Tasks</Typography>
                }
            </Container>
        </Slide>
    )
}
