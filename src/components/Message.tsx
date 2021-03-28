import { Box, makeStyles, Snackbar } from '@material-ui/core'
import React from 'react'
import { Message as MessageType} from '../types'

interface Props {
    message: MessageType | null;
    open: boolean
    handleClose: ((event: React.SyntheticEvent<any, Event>) => void)
}

const useStyles = makeStyles(theme => ({
    message: {
        color: theme.palette.grey[50],
        padding: theme.spacing(1),
        borderRadius: theme.shape.borderRadius
    },

    error: {
        backgroundColor: theme.palette.error.main
    },

    info: {
        backgroundColor: theme.palette.info.main
    },

    success: {
        backgroundColor: theme.palette.success.main
    }
}))

export default function Message({message, open, handleClose}: Props) {
    const classes = useStyles();
    if(message) {
        let className: string;
        switch (message.type) {
            case 'error':
                className = classes.error;
                break;
            case 'success':
                className = classes.success;
                break;
            case 'info':
                className = classes.info;
                break;
            default:
                className = classes.info;
                break;
        }
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                // message={message.content}
                // className={classes.message}
            >
                <Box className={`${classes.message} ${className}`}>
                    {message.content}
                </Box>
            </Snackbar>
        )
    }
        
    return null;
}
