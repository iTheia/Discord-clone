import React, {useState, useEffect} from 'react'
import {Route, Redirect, Switch, useHistory} from 'react-router-dom'
import Channel from '../containers/Channel'
import Home from '../containers/Home'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {setFriends, setServers, setRequest, setUser} from '../actions'
const URI = 'http://localhost:5000/api/v1/server'

export default function HomeRoute({ match: { url } }) {
    
    const token = useSelector(state => state.isLogged)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if(token === ''){
            history.push('/')
        }
        axios.get(`${URI}/`, {
            headers:{
                auth_token: token
            }
        })
        .then(response =>{
            const user = {
                name:response.data.name,
                email:response.data.email
            } 
            dispatch(setUser(user))
            dispatch(setRequest(response.data.pendingRequest))
            dispatch(setFriends(response.data.friends))
            dispatch(setServers(response.data.serverList))
        })
        .catch(error =>{
            history.push('/')
        })
        return () => {
            
        }
    }, [])

    return (
        <Switch>
            <Route exact path="/home" render={()=> {return <Redirect to={{pathname:"/home/me", from:'/home'}}/>}} />
            <Route path={`${url}/me`} component={Home}/>
            <Route path={`${url}/:channel`} component={Channel}/>
        </Switch>
    )
}
