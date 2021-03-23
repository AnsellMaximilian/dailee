import { IconButton, makeStyles } from '@material-ui/core'
import { CheckBoxOutlineBlank, Stop } from '@material-ui/icons'
import React from 'react'

interface Props {
    checked: boolean;
    completeTask: React.MouseEventHandler<HTMLButtonElement>
}

const useStyles = makeStyles(theme => ({
    checkBox: {
        position: 'relative'
    },

    checked: {
        position: "absolute",
        top: "50%",
        right: "50%",
        transform: "translate(50%, -50%)"
    }
}))

export default function CheckBox({checked, completeTask}: Props) {
    const classes = useStyles()

    return (
        <IconButton className={classes.checkBox} onClick={completeTask}>
            <CheckBoxOutlineBlank color="primary" />
            {checked && <Stop color="primary" className={classes.checked} fontSize="small"/>}
        </IconButton>
    )
}
