import { Container, List } from '@material-ui/core'
import React, { useState } from 'react'
import { Task } from '../types'
import TaskItem from './TaskItem'

export default function TaskList({tasks}: {tasks: Task[]}) {

    const [openTask, setOpenTask] = useState('');

    const taskItems = tasks.map(task => (
        <TaskItem 
            task={task} 
            key={task.id} 
            isOpen={openTask === task.id}
            setOpenTask={setOpenTask}
        />
    ))

    return (
        <Container maxWidth="sm">
            <List style={{overflowX: "hidden"}}>
                {taskItems}
            </List>
        </Container>
    )
}
