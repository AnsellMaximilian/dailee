import React, { useState } from 'react'
import { firestore } from '../firebase/config';
import firebase from 'firebase';

interface Props {
    user: firebase.User
}

export default function TaskForm({user}: Props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [timeFrame, setTimeFrame] = useState('');

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (e) => {
        let value = e.target.value

        if(e.target.name === 'title') setTitle(value)
        else if(e.target.name === 'description') setDescription(value)
        else if(e.target.name === 'time-frame') setTimeFrame(value)
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        let task = { 
            user: user.uid,
            title,
            description,
            timeFrame
        }

        firestore.collection('tasks').add(task)
            .then()
            .catch();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" name="title" placeholder="Task Title" onChange={handleChange} value={title}/>
                </div>
                <div>
                    <textarea name="description" placeholder="Task Description" onChange={handleChange} value={description}>

                    </textarea>
                </div>
                <div>
                    
                    <input type="time" name="time-frame" onChange={handleChange} value={timeFrame} />
                    
                </div>
                <div>
                    <button>Add</button>
                </div>
            </form>
        </div>
    )
}
