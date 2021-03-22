import React from 'react'
import { auth } from '../firebase/config'

import TaskForm from '../components/TaskForm'
import { Task } from '../types'
import TaskList from '../components/TaskList'

export default function Home({ tasks }: {tasks: Task[]}) {
    return (
        <div>
            { auth.currentUser ?
                <div>
                    <TaskForm user={auth.currentUser}/>
                    <TaskList tasks={tasks}/>
                    
                </div>
                :
                <h2>Please Sign Up or Sign In</h2>
            }
        </div>
    )
}
