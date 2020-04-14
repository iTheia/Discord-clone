import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'

export default function FriendList({items, url}) {
    
    const token = useSelector(state => state.isLogged)

    const sendFriendRequest = async () =>{
        const email = prompt('Enter email')
        if(!email){
            return ''
        }
        try {
            const response = await axios.post('http://localhost:5000/api/v1/friends/', {email},{
                headers:{
                    auth_token: token
                }
            })
            alert(response.data.alredySended)
        } catch (error) {
            
        }
    }
    
    return (
        <>
            {
                items.map(item =>{
                    return (
                        <Link to={`${url}/${item.slug}`} className="friend" key={item._id}>
                            <img className="icon" src="" alt=""/><span>{item.name}</span>
                        </Link>
                    )
                })
            }
            <button className="fancy__button__active" onClick={sendFriendRequest}> Add friend </button>
        </>
    )
}
