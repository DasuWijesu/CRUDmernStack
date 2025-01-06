  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  const dotenv = require("dotenv");
  const UserModel = require('./models/Users');
  const { connectDB } = require('./config/db');

  //load environment variable
  dotenv.config();

  const PORT = process.env.PORT || 5000;

 //initialized express app
  const app = express();

  //middleware
  app.use(cors());
  app.use(express.json());

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

// //routes
// app.get('/', (req, res) => {
//   UserModel.find({})
//     .then(users => res.json(users))
//     .catch(err => res.status(500).json(err));
// });



// // Adding route to get user by ID
// app.get('/getUser/:id', (req, res) => {
//   const { id } = req.params;
//   console.log(`Fetching user with ID: ${id}`); //debug log
//   UserModel.findById(id)
//     .then(user => {
//       if(!user){
//         return res.status(404).json({message:"User not found"})
//       }
//     res.json(user)
//     })
//     .catch(err => res.status(500).json({ error: "Error fetching user", message: err.message }));
// })

// app.put('/updateUser/:id', (req,res) => {
//   const { id } = req.params;
//   const { name , email, age } = req.body;

//   UserModel.findByIdAndUpdate(id, { name, email, age }, { new : true })
//     .then(updateUser=>res.json(updateUser))
//     .catch(err=> res.status(500).json({ error : "Error updating user", message:err.message}))
// })

// app.delete('/deleteUser/:id', (req, res) => {
//   const { id } = req.params;
//   console.log(`Received DELETE request for user ID: ${req.params.id}`);
//   UserModel.findByIdAndDelete(id)
//       .then(() => res.json({ message: 'User deleted successfully' }))
//       .catch(err => res.status(500).json({ error: 'Error deleting user', message: err.message }));
// });


// app.post('/createUser', (req, res) => {
//     const { name, email, age } = req.body;
//     UserModel.create({ name, email, age })
//         .then((user) => res.json(user))
//         .catch((err) => res.status(500).json(err));
//     });

  //run the server 
  // console.log(process.env.MONGO_URI);
  // app.listen(5000, ()=> {
  //       connectDB();
  //       console.log("Server is Running " +  PORT + "😁😘👌")
  // })
  connectDB()
  .then(() => {
    //routes
    app.get('/', (req, res) => {
      UserModel.find({})
        .then(users => res.json(users))
        .catch(err => res.status(500).json(err));
    });



    // Adding route to get user by ID
    app.get('/getUser/:id', (req, res) => {
      const { id } = req.params;
      console.log(`Fetching user with ID: ${id}`); //debug log
      UserModel.findById(id)
        .then(user => {
          if(!user){
            return res.status(404).json({message:"User not found"})
          }
        res.json(user)
        })
        .catch(err => res.status(500).json({ error: "Error fetching user", message: err.message }));
    })

    app.put('/updateUser/:id', (req,res) => {
      const { id } = req.params;
      const { name , email, age } = req.body;

      UserModel.findByIdAndUpdate(id, { name, email, age }, { new : true })
        .then(updateUser=>res.json(updateUser))
        .catch(err=> res.status(500).json({ error : "Error updating user", message:err.message}))
    })

    app.delete('/deleteUser/:id', (req, res) => {
      const { id } = req.params;
      console.log(`Received DELETE request for user ID: ${id}`);
      UserModel.findByIdAndDelete(id)
          .then(user => { 
            if (user) { 
              res.json({ message: 'User deleted successfully' }); 
            } else { 
              res.status(404).json({ error: 'User not found' }); 
            } 
          })
          .catch(err => res.status(500).json({ error: 'Error deleting user', message: err.message }));
    });


    app.post('/createUser', (req, res) => {
        const { name, email, age } = req.body;
        UserModel.create({ name, email, age })
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});


  // DONE❤️

 