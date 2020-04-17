const mongoose = require('mongoose');
const User = require('./models/User');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const port = 4444 || process.env.PORT;

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/admin');
mongoose.connection
        .once('open', ()=>console.log('Connected'))
        .on('error', (err)=>{
          console.log(`could not connect`, err);
        });


app.post('/users', (req, res)=>{

      const newUser = new User({

        firstName: req.body.firstName,
        lastName: req.body.lastName,
        isActive: req.body.isActive
      });

      newUser.save().then(savedUser=>{

      res.send('saved user by me !!!');
    }).catch(error=>{
      res.status(404).send(`ERROR!!!${error }`)
    });

});

app.get('/users', (req, res)=>{

    User.find({}).then(users=>{

        res.status(200).send(users)
    }).catch(err=>{
      res.status(404).send(err);
    });

});

// app.patch('/users/:id', (req, res)=>{
//
//       const id = req.params.id;
//       const firstName = req.body.firstName;
//
//       User.findByIdAndUpdate({_id: id}, {$set: {firstName: firstName}}, {new: true})
//           .then(savedUser=>{
//               res.send('User Saved By Patch');
//           }).catch(err=>{
//             res.send(err);
//           });
// });

// app.put('/users/:id', (req, res)=>{
//
//       const id = req.params.id;
//       const firstName = req.body.firstName;
//       const lastName = req.body.lastName;
//
//       User.findByIdAndUpdate({_id: id}, {$set: {firstName: firstName, lastName: lastName}}, {new: true})
//           .then(savedUser=>{
//               res.send('User Saved By Patch');
//           }).catch(err=>{
//             res.send(err);
//           });
// });

// app.put('/users/:id', (req, res)=>{
//
//     User.findOne({_id: req.params.id}).then(user=>{
//         user.firstName = req.body.firstName;
//         user.lastName = req.body.lastName;
//
//         user.save().then(userSaved=>{
//           res.status(200).send(userSaved);
//
//         }).catch(err=>{console.log(err)});
//     });
// });

// app.delete('/users/:id', (req, res)=>{
//
//     User.findOne({_id: req.params.id}).then(user=>{
//
//         user.remove().then(userRemoved=>{
//           res.status(200).send('user remove'+ userRemoved);
//
//         }).catch(err=>{console.log(err)});
//     });
// });

// app.delete('/users/:id', (req, res)=>{
//
//     User.findByIdAndRemove(req.params.id).then(userRemoved=>{
//         res.send(`User ${userRemoved.lastName} removed`);
//     });
// });

// app.delete('/users/:id', (req, res)=>{
//
//     User.remove({_id: req.params.id}).then(userRemoved=>{
//         res.send(`User ${userRemoved.firstName} removed`);
//     });
// });






    app.listen(port, ()=>{
      console.log(`listening on ${port}`);
    });

//const {MongoClient, ObjectId} = require('mongodb');

//MongoClient.connect('mongodb://localhost:27017', function(err, client){

//  if(err) throw err;

//  console.log('CONNECTED');

//  const db = client.db('animals');

  //Creating Data //
        //db.collection('mamals').insertOne({
          //name:'Catt',
          //power:'veryNice',
          //size:1.93
        //}, (err, result)=>{
          //if(err) return console.log(err);

          //console.log('INSERTED');
        //});





  //Reading Data //
  //
  //      db.collection('mammals').find().toArray(function (err, result){
  //        if(err) throw err;

  //        console.log(result);
  //      });





  //Updating Data //
  //
  //db.collection('mammals').findOneAndUpdate({

  //  _id: new ObjectId('5e83735d890b4120f09dd4b0')
  //},

  //  {$set: {name: 'Catt'}}

  //).then(result=>{
  //  console.log(result);
  //}).catch(err=>{
  //  console.log(err);
  //});


//Deleting Data //
//let object = new ObjectId('5e83b62b82c33707c8c883ec');
//db.collection('mammals').findOneAndDelete({

//    _id: object
//}.then(result=>{
//  console.log(result);
//});

//});



//mongoose.connect('mongodb://localhost:4500').then(db =>{
  //console.log('Mongo Connected');
//}).catch(error=> console.log(error));

//var MongoClient = require('mongodb').MongoClient;

//MongoClient.connect('mongodb://localhost:27017/animals', function (err, db) {
  //if(err) throw err;
  //console.log('Connected');
  //db.collection('mammals').find().toArray(function (err, result) {
    //if(err) throw err;

    //console.log(result);
  //});
//});
