import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {useHistory, Route } from 'react-router-dom'
import ServerList from '../components/ServerList'
import TopSlide from '../modules/TopSlide'
import ChannelList from '../components/ChannelList'
import { useSelector } from 'react-redux'
import TextChannel from '../components/TextChannel'

const URI = 'http://localhost:5000'
export default function Channel({match}) {
    
    const history = useHistory()
    const [server, setServer] = useState({
        owner: {},
        users:[],
        textChannels:[]
    })
    const [serverList, setServerList] = useState([])
    const token = useSelector(state => state.isLogged)
    

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
                        <div className="text-channel__list">
                            <ChannelList textChannels={server.textChannels} url={match.url}></ChannelList>
                        </div>
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
