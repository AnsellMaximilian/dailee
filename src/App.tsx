import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

import Header from './components/Header';

import './App.css';
import { auth, firestore } from './firebase/config';
import { Message as MessageType, Task } from './types';
import theme from './theme';
import Message from './components/Message';

const App = () => {

  const [user, setUser] = useState(auth.currentUser)
  const [tasks, setTasks] = useState<Task[]>([])
  const [reserveTasks, setReserveTasks] = useState<Task[]>([])
  const [message, setMessage] = useState<MessageType | null>(null);

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

      firestore.collection('reserveTasks')
        .where('user', '==', user.uid)
        .onSnapshot((snapshot) => {
          let reserveTasks: Task[] = snapshot.docs.map(docSnapshot => {
            let reserveTask: Task = {
              id: docSnapshot.id,
              user: user.uid,
              title: 'Unavailable',
              description: 'Unavailable',
              timeFrame: 'Unavailable',
              ...docSnapshot.data(),
            };
            return reserveTask;
          })
          setReserveTasks(reserveTasks);
        })
    }
  }, [user])

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Header/>

          <Switch>
            <Route exact path={process.env.PUBLIC_URL + "/"}>
              <Home tasks={tasks} reserveTasks={reserveTasks}/>
            </Route>

            <Route exact path={process.env.PUBLIC_URL + "/signup"}>
              { user ? <Redirect to={process.env.PUBLIC_URL + "/"}/> : <SignUp setMessage={setMessage}/>}
            </Route>

            <Route exact path={process.env.PUBLIC_URL + "/signin"}>
              { user ? <Redirect to={process.env.PUBLIC_URL + "/"}/> : <SignIn setMessage={setMessage}/>}
            </Route> 
          </Switch>
          <Message 
            open={!!message} 
            message={message}
            handleClose={() => {
              setMessage(null);
            }}
          />
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
