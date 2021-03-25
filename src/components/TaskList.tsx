import { Container, List } from '@material-ui/core'
import React, { useState } from 'react'
import { firestore } from '../firebase/config';
import { Task } from '../types'
import TaskDetail from './TaskDetail';
import TaskItem from './TaskItem'

export default function TaskList({tasks}: {tasks: Task[]}) {
    // which task is expanded -- details are revealed
    const [openTask, setOpenTask] = useState('');
    const [openTaskDetail, setOpenTaskDetail] = useState('');

    const handleTaskDetailClose = () => setOpenTaskDetail('');

    const saveChange = (task: Task) => {
        firestore.collection('tasks').doc(task.id).update(task);
        setOpenTaskDetail('');
    }

    const taskItems = tasks.map(task => (
        <TaskItem 
            task={task} 
            key={task.id} 
            isOpen={openTask === task.id}
            setOpenTask={setOpenTask}
            setOpenTaskDetail={setOpenTaskDetail}
        />
    ))

    return (
        <Container maxWidth="sm">
            <List style={{overflowX: "hidden"}}>
                {taskItems}
            </List>
            {!!openTaskDetail &&
                <TaskDetail 
                    task={tasks.filter(task => task.id === openTaskDetail)[0]} 
                    open={!!openTaskDetail}
                    handleClose={handleTaskDetailClose}
                    saveChange={saveChange}
                />
            }
        </Container>
    )
}
