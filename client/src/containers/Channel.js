import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {useHistory } from 'react-router-dom'
const URI = 'http://localhost:5000/api/v1/server'

export default function Channel({match: { url} }) {
    
    const channelId = url.substring(6,url.length)
    const history = useHistory()
    const [server, setServer] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        axios.get(`${URI}/${channelId}`, {
            headers:{
                auth_token: token
            }
        }).then(response =>{
            setServer(response.data)
        }).catch(error =>{
            history.push('/')
        })
    },[url])

    return (
        <div>
            {server.name}
        </div>
    )
}
