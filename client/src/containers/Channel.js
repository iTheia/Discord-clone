import React,{useEffect, useState} from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import {useHistory, Route } from 'react-router-dom'
import ServerList from '../components/ServerList'
import TopSlide from '../modules/TopSlide'
import ChannelList from '../components/ChannelList'
import { useSelector } from 'react-redux'
import TextChannel from '../components/TextChannel'

const URI = 'http://localhost:5000'

let socket;
export default function Channel({match}) {
    
    const history = useHistory()
    const [server, setServer] = useState({
        owner: {},
        users:[],
        textChannels:[],
        voiceChannels:[
            {
                _id:123123213,
                name:'general'
            },
            {
                _id:151513213,
                name:'amigos'
            }
        ]
    })

    const [serverList, setServerList] = useState([])
    const token = useSelector(state => state.isLogged)
    const [idChannel, setIdChannel] = useState('')

    const setVoiceChannel = id =>{
        setVoiceChannel(id)
    }

    useEffect(() => {
        socket = io(URI)
        const room = idChannel
        socket.emit('join', {room, name:''}, () =>{

        })
        return () => {
            socket.emit('disconnect')
            socket.off()
        }
    }, [idChannel])
    
    useEffect(() => {
        
    })
    
    useEffect(() => {
        const savedServer = serverList.find( server => match.params.channel === server._id)
        if(savedServer){
            setServer(savedServer)
            return 
        }else{
            axios.get(`${URI}/api/v1/server/${match.params.channel}`, {
                headers:{
                    auth_token: token
                }
            }).then(response =>{
                setServer(response.data)
                let copyserverList = serverList
                copyserverList.push(response.data)
                setServerList(copyserverList)
            }).catch(error =>{
                history.push('/home')
            })
        }
        
    },[match.params.channel])

    return (
        <div className="home-container" style={{'--width':'300px'}}>
            <div className="left-panel">
                <ServerList></ServerList>
                <div className="secundary-panel" style={{background:'#2f3136'}}>
                    <div className="server-panel">
                        <div className="server-panel__title" onClick={() => alert(`send this link to your friends  ${match.params.channel}`)}>{server.name} <div className="icon">+</div> </div>
                        <ChannelList textChannels={server.textChannels} voiceChannels={server.voiceChannels} url={match.url}></ChannelList>
                    </div>
                </div>
            </div>
            <TopSlide leftPannel='left-panel' rigthPannel='friend-list' center={{title:'Games', link:'/home/me'}} />
            <div className="right-panel" style={{background:'#36393f'}}>
                <div>
                    <Route path={`${match.url}/:id`} component={TextChannel} />
                </div>
                <div className="friend-list scroll" style={{background:'#2f3136', paddingLeft:'20px'}} >
                        {
                            server.users.map((user, index) =>{
                                return (
                                    <div className="friend"  key={index} >
                                        <img className="icon" src="" alt=""/>
                                        <span>{user.name}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
        </div>
    )
}
