import { List } from '@material-ui/core'
import React from 'react'
import { Task } from '../types'
import TaskItem from './TaskItem'

export default function TaskList({tasks}: {tasks: Task[]}) {

    const taskItems = tasks.map(task => <TaskItem task={task} key={task.id}/>)

    return (
        <div>
            <List style={{overflowX: "hidden"}}>
                {taskItems}
            </List>
        </div>
    )
}
