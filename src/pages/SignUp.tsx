import React, {useState} from 'react'
import {auth} from '../firebase/config';

interface Props {
    setError: React.Dispatch<React.SetStateAction<string>>
}

export default function SignUp({setError}: Props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then(() => setError(''))
            .catch((err: {message: string}) => setError(err.message));
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if(e.target.name === "email") setEmail(e.target.value);
        else if(e.target.name === "password") setPassword(e.target.value);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" name="email" value={email} onChange={handleChange}/>
                <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange}/>
                <button>Sign Up</button>
            </form>
        </div>
    )
}
