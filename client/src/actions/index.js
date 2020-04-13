export const login = token =>{
    return {
        type: 'LOGIN',
        token:token
    }
} 
export const logout = () =>{
    return {
        type: 'LOGOUT'
    }
} 
export const setUser = user =>{
    return {
        type: 'SET_USER',
        data:user
    }
}
export const setFriends = friends =>{
    return {
        type: 'SET_FRIEND',
        data: friends
    }
}

export const setServers = servers =>{
    return {
        type: 'SET_SERVER',
        data: servers
    }
}
export const addServer = server =>{
    return {
        type: 'ADD_SERVER',
        data: server
    }
}
export const addFriend = friend =>{
    return {
        type: 'ADD_FRIEND',
        data: friend
    }
}

export const setRequest = request =>{
    return {
        type: 'SET_REQUEST',
        data: request
    }
}

export const addRequest = request =>{
    return {
        type: 'ADD_REQUEST',
        data: request
    }
}