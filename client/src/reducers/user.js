const userReducer = (state = {name:'', email:''}, action) =>{
    switch (action.type) {
        case 'SET_USER':
            state = action.data
            return state
        default:
            return state
    }
}

export default userReducer