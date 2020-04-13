const friendsReducer = (state = [], action) =>{
    
    switch (action.type) {
        case "SET_FRIEND":
            return action.data
        case "ADD_FRIEND":
            let copy = state
            copy.push(action.data)
            state = copy
            return state
        case "LOGOUT":
            return []
        default:
            return state
    }
}

export default friendsReducer