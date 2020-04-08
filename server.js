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

connectDB()

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(cors())

app.use('/api/v1/server', require('./routes/Server'))

app.use('/api/v1/home', require('./routes/Home'))
app.use('/api/v1/acess', require('./routes/Login'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), (err) =>{
    if (err) {
      res.status(500).send(err)
    }
  })
})


io.on('connection', socket =>{
    console.log('conecction')
})
 
server.listen(PORT, ()=>{
    console.log(`server on port ${PORT}`)
})