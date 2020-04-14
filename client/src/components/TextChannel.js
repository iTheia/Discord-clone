import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import io from 'socket.io-client'

let socket;
const URI = 'http://localhost:5000'

export default function TextChannel({match}) {
    
    const user = useSelector(state => state.user)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')

    const disableActive = useSelector(state => state.disableActive)
    useEffect(() => {

        socket = io(URI)
        const room = match.params.id
        socket.emit('join', {room, name:user.name}, () =>{
        })
        return () =>{
            socket.emit('disconnect')
            socket.off()
        }
    }, [match.params.id])

    useEffect(() =>{
        socket.on('message', ({user,message}) =>{
            setMessages([...messages,{message,user}])
        })
    }, [messages])

    const sendMessage = e =>{
        e.preventDefault()
        if(message){
            socket.emit('sendMessage', {message} , () => setMessage(''))
        }
    }

    return (
        <div className="text-channel" onClick={() =>{
                disableActive('left-panel', 'menu')
                disableActive('left-panel', 'friend-list')
        }}>
            <div className="text-channel__title">
                <img src={require('../src/numeral.png')} alt=""/>
                TITLE
            </div>
            <div className="scroll text-channel__container">
                {
                    messages.map((message, index) =>{
                        return (
                            <div className="text-channel__message" key={index} >
                                <div className="text-channel__message__title">{message.user}</div>
                                <p className="text-channel__message__body">{message.message} </p>
                            </div>
                        )
                    })
                }
            </div>
            <input 
                className="fancy__input" type="text"
                value={message} 
                onChange={e => setMessage(e.target.value)}
                onKeyPress={e => e.key ==='Enter' ? sendMessage(e) : null }
                
                />
        </div>
    )
}
