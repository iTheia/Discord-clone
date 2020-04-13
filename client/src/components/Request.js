import React, {useState} from 'react'
import {useSelector , useDispatch} from 'react-redux'
import axios from 'axios'
import { setRequest } from '../actions'
export default function Request() {

    const [pendingRequest, setPendingRequest] = useState(useSelector(state => state.request))
    const disableActive = useSelector(state => state.disableActive)
    const token = useSelector(state => state.isLogged)
    const dispatch = useDispatch()

    const acceptRequest = async id =>{
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/friends/${id}`,{
                headers:{
                    auth_token:token
                }
            })
            let copy =pendingRequest
            for (let index = 0; index < copy.length; index++) {
                const element = copy[index];
                if(element._id === response.data.id){
                    copy.splice(index,1)
                }
            }
            setPendingRequest(copy)
            dispatch(setRequest(copy))
        } catch (error) {
            console.log(error)
        }
       

    }
    const cancelRequest = async id =>{
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/friends/cancel/${id}`,{
                headers:{
                    auth_token:token
                }
            })
            let copy =pendingRequest
            for (let index = 0; index < copy.length; index++) {
                const element = copy[index];
                if(element._id === response.data.id){
                    copy.splice(index,1)
                }
            }
            setPendingRequest(copy)
            dispatch(setRequest(copy))
        } catch (error) {
            console.log(error)
        }
       
    }
    
    return (
        <div className="request-list" onClick={()=> disableActive('left-panel', 'menu')}>
            {
                pendingRequest.map(request =>{
                    return (
                        <div key={request._id} className="request">
                            <span className="request__name">{request.name} </span>
                            <img onClick={() => acceptRequest(request._id)} src={require('../src/check.svg')} alt="" className="request__icon"/>
                            <img onClick={() => cancelRequest(request._id)} src={require('../src/close.svg')} alt="" className="request__icon"/>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}
