import React from 'react'
import { Task } from '../types'

export default function TaskItem({task}: {task: Task}) {
    return (
        <li>
            {task.title}
        </li>
    )
}
