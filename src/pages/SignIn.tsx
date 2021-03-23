import React, {useState} from 'react'
import {auth} from '../firebase/config';
import { Button, Container, TextField } from '@material-ui/core'

interface Props {
    setError: React.Dispatch<React.SetStateAction<string>>
}

export default function SignIn({setError}: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then(() => setError(''))
            .catch((err: {message: string}) => setError(err.message));
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
                <Button fullWidth variant="contained" color="primary" type="submit">Sign In</Button>
            </form>
        </Container>
    )
}
