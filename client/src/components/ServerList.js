import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import {setServers} from '../actions'
import { useState } from 'react'

const URI = 'http://localhost:5000'

export default function ServerList() {
    
    const [channels, setchannels] = useState(useSelector(state => state.servers))
    const token = useSelector(state => state.isLogged)
    const distpatch = useDispatch()

    const createServer = async () =>{
        const serverName = prompt('Enter server name')
        if(!serverName){
            return
        }
        try {
            const response = await axios.post(`${URI}/api/v1/server/`, {
                serverName
            }, {
                headers:{auth_token: token}
            })

            const data = await response
            let copy = channels
            copy.push(data.data)
            setchannels(copy)
            distpatch(setServers(copy))
        } catch (error) {
            console.log(error)
        }

    }
    const addExistingServer = async () =>{
        const serverId = prompt('paste server link')
        if(!serverId){
            return 
        }
        try {
            const response = await axios.post(`${URI}/api/v1/server/${serverId}`,{},{
                headers:{
                    auth_token:token
                }
            })
            const data = await response
            let copy = channels
            copy.push(data.data)
            setchannels(copy)

        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="server-list scroll">
            <Link to={`/home/me`} className="server" >
                <img className="homeIcon" src={require('../src/homeIcon.png')} alt=""/>
            </Link>
                {
                    channels.map(channel =>{
                        return (
                            <Link
                                key={channel._id} 
                                to={`/home/${channel._id}`} 
                                className="server"></Link>
                        )
                    })
                }
            <div className="server__add" onClick={createServer}>
                <span>+</span>
            </div>
            <button className="fancy__button__active margin__top" style={{'--margin':'8px'}} onClick={addExistingServer}>Add server </button>
        </div>
    )
    
    
}
