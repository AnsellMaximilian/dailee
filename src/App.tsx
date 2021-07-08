import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import firebase from "firebase";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

import Header from "./components/Header";

import "./App.css";
import { auth, firestore } from "./firebase/config";
import { Message as MessageType, Task } from "./types";
import theme from "./theme";
import Message from "./components/Message";

const App = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [reserveTasks, setReserveTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState<MessageType | null>(null);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => listener();
  }, []);

  useEffect(() => {
    let tasksListener: firebase.Unsubscribe | null;
    let reserveTasksListener: firebase.Unsubscribe | null;
    if (user) {
      tasksListener = firestore
        .collection("tasks")
        .where("user", "==", user.uid)
        .orderBy("importance", "desc")
        .onSnapshot((snapshot) => {
          let tasks: Task[] = snapshot.docs.map((docSnapshot) => {
            let task: Task = {
              id: docSnapshot.id,
              user: user.uid,
              title: "Unavailable",
              description: "Unavailable",
              timeFrame: "Unavailable",
              importance: 1,
              ...docSnapshot.data(),
            };
            return task;
          });
          setTasks(tasks);
        });

      reserveTasksListener = firestore
        .collection("reserveTasks")
        .where("user", "==", user.uid)
        .onSnapshot((snapshot) => {
          let reserveTasks: Task[] = snapshot.docs.map((docSnapshot) => {
            let reserveTask: Task = {
              id: docSnapshot.id,
              user: user.uid,
              title: "Unavailable",
              description: "Unavailable",
              timeFrame: "Unavailable",
              importance: 1,
              ...docSnapshot.data(),
            };
            return reserveTask;
          });
          setReserveTasks(reserveTasks);
        });
    }
    return () => {
      tasksListener && tasksListener();
      reserveTasksListener && reserveTasksListener();
    };
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Header />

          <Switch>
            <Route exact path={process.env.PUBLIC_URL + "/"}>
              <Home
                tasks={tasks}
                reserveTasks={reserveTasks}
                setMessage={setMessage}
              />
            </Route>

            <Route exact path={process.env.PUBLIC_URL + "/signup"}>
              {user ? (
                <Redirect to={process.env.PUBLIC_URL + "/"} />
              ) : (
                <SignUp setMessage={setMessage} />
              )}
            </Route>

            <Route exact path={process.env.PUBLIC_URL + "/signin"}>
              {user ? (
                <Redirect to={process.env.PUBLIC_URL + "/"} />
              ) : (
                <SignIn setMessage={setMessage} />
              )}
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
};

export default App;
