import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {useHistory, Link } from 'react-router-dom'

const URI = 'http://localhost:5000/api/v1/server'

export default function Home({ url ,logOut } ) {

    const [channels, setChannels] = useState([])

    const history = useHistory()

    useEffect(() => {
        let token = localStorage.getItem('auth-token')
        axios.get(`${URI}/`, {
                headers:{
                    auth_token: token
                }
            })
            .then(response =>{
                setChannels(response.data)
            })
            .catch(error =>{
                history.push('/')
            })
    }, [])
    
    return (
        <div>
            <button onClick={logOut}>Log out</button>
            <div className="channel-list">
                {channels.map(channel =>{
                    return (<Link key={channel._id} to={`${url}/${channel._id}`} >
                        {channel.name} </Link>)
                })}
            </div>
        </div>
    )
}
