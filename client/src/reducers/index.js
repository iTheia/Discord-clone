import { combineReducers } from 'redux'
import serverReducer from './server'
import friendsReducer from './friends'
import isLoggedReducer from './isLogged'
import requestReducer from './request'
import userReducer from './user'

const disableActive = (state = function () {}, action ) =>{
    return (leftPannel, rightPannel) =>{
        const left = document.querySelector(`.${leftPannel}`)
        left.classList.remove(`${leftPannel}__active`)
        const right = document.querySelector(`.${rightPannel}`)
        right.classList.remove(`${rightPannel}__active`)
    }
}


const root = combineReducers({
    servers: serverReducer,
    user: userReducer,
    isLogged: isLoggedReducer,
    request: requestReducer,
    friends: friendsReducer,
    disableActive:disableActive
})

export default root