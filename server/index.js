  const express = require('express')
  const mongoose = require('mongoose')
  const cors = require('cors') 

  const app = express()
  app.use(cors())
  app.use(express.json())

  //run the server 
  app.listen(3001, ()=> {
        console.log("Server is Running")
  })