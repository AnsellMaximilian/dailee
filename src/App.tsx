import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import Header from './components/Header';

import './App.css';
import { auth } from './firebase/config';

interface Props {

}

const App: React.FC<Props> = () => {

  const [user, setUser] = useState(auth.currentUser)
  const [error, setError] = useState('')

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  }, [])

  return (
    <div className="App">
      <Router>
        <Header/>

        <div>{error}</div>

        <Switch>
          <Route path="/signup">
            { user ? <Redirect to="/"/> : <SignUp setError={setError}/>}
          </Route>

          <Route path="/signin">
            { user ? <Redirect to="/"/> : <SignIn setError={setError}/>}
          </Route> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
