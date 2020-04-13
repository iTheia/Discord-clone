const serversReducer = (state = [] , action) =>{
    switch (action.type) {
        case "SET_SERVER":
            return action.data
        case 'ADD_SERVER':
            let server = action.data
            const copyState = state
            copyState.push(server)
            return copyState
        case 'LOGOUT':
            return []
        default:
            return state
    }
}

export default serversReducer;