const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const connection = async () =>{
  await mongoose.connect(process.env.DB_CONNECT, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

module.exports = connection