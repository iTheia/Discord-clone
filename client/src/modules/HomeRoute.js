import React, {useState} from 'react'
import {Route, Redirect } from 'react-router-dom'
import Home from '../containers/Home'
import Channel from '../containers/Channel'

export default function HomeRoute({ match: { url } }) {
    
    const [token, setToken] = useState(localStorage.getItem('auth-token'))
    
    const logOut = ()=>{
        localStorage.removeItem('auth-token')
        setToken(null)
    }
    
    if(!token){
        return(
            <Redirect to="/login"/>
        )
    }
   
    return (
        <>
          <Home logOut={logOut} url={`${url}`}></Home>
          <Route path={`${url}/:channel`} component={Channel} />
        </>
    )
}
