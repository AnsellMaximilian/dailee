import React, { useState } from 'react'
import { auth } from '../firebase/config'

import TaskForm from '../components/TaskForm'
import { Task } from '../types'
import TaskList from '../components/TaskList'
import { Fab, makeStyles } from '@material-ui/core'
import { ListAlt } from '@material-ui/icons'
import TaskReserve from '../components/TaskReserve'

interface Props {
    tasks: Task[];
    reserveTasks: Task[];
}

const useStyles = makeStyles(theme => ({
    taskReserveButton: {
        position: 'fixed',
        bottom: 15,
        right: 15
    }
}))

export default function Home({ tasks, reserveTasks }: Props) {

    const classes = useStyles()

    const [isTaskReserveOpen, setIsTaskReserveOpen] = useState(false)

    return (
        <div>
            { auth.currentUser ?
                <div>
                    <TaskForm user={auth.currentUser}/>
                    <TaskList tasks={tasks}/>
                    <TaskReserve reserveTasks={reserveTasks} open={isTaskReserveOpen} user={auth.currentUser}/>
                    <Fab 
                        color="primary" 
                        aria-label="add" 
                        title="Task Reserve" 
                        className={classes.taskReserveButton}
                        onClick={() => setIsTaskReserveOpen(state => !state)}
                    >
                        <ListAlt/>
                    </Fab>
                </div>
                :
                <h2>Please Sign Up or Sign In</h2>
            }
        </div>
    )
}
