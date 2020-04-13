const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http')
const socketio = require('socket.io')
const connectDB = require('./connection')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000
const server = http.createServer(app)
const io = socketio(server)
const { addUser, getUser, userInRoom, removeUser} = require('./usersSockets')

connectDB()

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(cors())

app.use('/api/v1/server', require('./routes/Server'))
app.use('/api/v1/acess', require('./routes/Login'))
app.use('/api/v1/friends', require('./routes/Friends'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), (err) =>{
    if (err) {
      res.status(500).send(err)
    }
  })
})


io.on('connection', socket =>{
  socket.on('join', ({name, room}, callback) =>{
    const user = addUser({id:socket.id, name, room})
    socket.join(user.room)
  })
  
  socket.on('sendMessage', ({message}, callback) =>{
    const user = getUser(socket.id)
    io.to(user.room).emit('message', { user:user.name, message:message})
    callback()
  })
  socket.on('discconect', ()=>{
    console.log(socket.id)
  })
})
 
server.listen(PORT, ()=>{
    console.log(`server on port ${PORT}`)
})