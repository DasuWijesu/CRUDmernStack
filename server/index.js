  const express = require('express')
  const mongoose = require('mongoose')
  const cors = require('cors') 
  const UserModel = require('./models/Users')
  const dotenv = require("dotenv");

  const { connectDB } = require('./config/db');

  //load environment variable
  dotenv.config();

  const PORT = process.env.pORT || 5000;


  const app = express()

  //middleware
  app.use(cors())
  app.use(express.json())

  //connect to the db
//   mongoose.connect("mongodb://127.0.0.1:27017/crud"),{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
//     .then(() => console.log("Connected to MongoDB"))
//     .catch(err => console.log("Failed to connect to MongoDB:", err));
// Connect to the database
// (async () => {
//     try {
//       await mongoose.connect('mongodb://127.0.0.1:27017/crud', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log('Connected to MongoDB');
//     } catch (err) {
    //   console.error('Failed to connect to MongoDB:', err);
//     }
//   })();

//routes
app.get('/', (req,res)=>{
  UserModel.find({})
  .then(users=>res.json(users))
  .catch(err=> res.status(500).json(err))
})

app.post('/createUser', (req, res) => {
    const { name, email, age } = req.body;
    UserModel.create({ name, email, age })
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    });

  //run the server 
  console.log(process.env.MONGO_URI);
  app.listen(5000, ()=> {
        connectDB();
        console.log("Server is Running " +  PORT + "😁😘👌")
  })

  // DONE❤️

 