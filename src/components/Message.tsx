import { Snackbar } from '@material-ui/core'
import React from 'react'

interface Props {
    type: 'error' | 'info';
    open: boolean;
    message: string;
    handleClose: ((event: React.SyntheticEvent<any, Event>) => void)
}

export default function Message({type, open, message, handleClose}: Props) {
    return (
        <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={message}
        />
    )
}
