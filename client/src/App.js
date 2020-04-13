import React from 'react'
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"
import HomeRoute from './modules/HomeRoute'
import Landing from './containers/Landing'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/home" component={HomeRoute}/>
      </Switch>
    </Router>
  )
}

export default App;
