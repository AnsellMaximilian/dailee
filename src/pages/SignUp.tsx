import { Button, Container, TextField } from '@material-ui/core';
import React, {useState} from 'react'
import {auth} from '../firebase/config';
import { Message } from '../types';

interface Props {
    setMessage: React.Dispatch<React.SetStateAction<Message | null>>
}

export default function SignUp({setMessage}: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => setMessage({type: 'success', content: 'Success'}))
            .catch((err: {message: string}) => setMessage({type: 'error', content: err.message}));
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.name === "email") setEmail(e.target.value);
        else if(e.target.name === "password") setPassword(e.target.value);
    }

    return (
        <Container maxWidth="xs">
            <form onSubmit={handleSubmit}>
                <TextField required fullWidth type="email" margin="normal" variant="outlined" label="Email" name="email" value={email} onChange={handleChange}/>
                <TextField required fullWidth type="password" margin="normal" variant="outlined" label="Password" name="password" value={password} onChange={handleChange}/>
                <Button fullWidth variant="contained" color="primary" type="submit">Sign Up</Button>
            </form>
        </Container>
    )
}
