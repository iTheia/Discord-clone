const request = (state = [] , action )=>{

    switch (action.type) {
        case 'SET_REQUEST':
            return action.data
        case 'ADD_REQUEST':
            let copy = state
            copy.push(action.data)
            state = copy
            return state
        case 'LOGOUT':
            return []
        default:
            return state
    }
}

export default request