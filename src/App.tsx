import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import Header from './components/Header';

import './App.css';
import { auth, firestore } from './firebase/config';
import Home from './pages/Home';
import { Task } from './types';

const App = () => {

  const [user, setUser] = useState(auth.currentUser)

  const [tasks, setTasks] = useState<Task[]>([])

  const [error, setError] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  }, [])

  useEffect(() => {
    if(user){
      firestore.collection('tasks')
        .where('user', '==', user.uid)
        .onSnapshot((snapshot) => {
          let tasks: Task[] = snapshot.docs.map(docSnapshot => {
            let task: Task = {
              id: docSnapshot.id,
              user: user.uid,
              title: 'Unavailable',
              description: 'Unavailable',
              timeFrame: 'Unavailable',
              ...docSnapshot.data(),
            };

            return task;
          })

          setTasks(tasks);
        })
    }
  }, [user])

  return (
    <div className="App">
      <Router>
        <Header/>

        <div>{error}</div>

        <Switch>
          <Route exact path="/">
            <Home tasks={tasks}/>
          </Route>

          <Route exact path="/signup">
            { user ? <Redirect to="/"/> : <SignUp setError={setError}/>}
          </Route>

          <Route exact path="/signin">
            { user ? <Redirect to="/"/> : <SignIn setError={setError}/>}
          </Route> 
        </Switch>

      </Router>
    </div>
  );
}

export default App;
