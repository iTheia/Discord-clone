const users = []

const addUser = ({id, name, room}) =>{
    const user = {
        id,
        name,
        room
    }
    users.push(user)
    return user 
}

const removeUser = (id) =>{
    const index = users.find(user => user.id === id)
    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}


const getUser = (id) => users.find( user => user.id === id)

const userInRoom = (room) => users.filter( user => user.room === room)


module.exports = { addUser, getUser, userInRoom, removeUser}