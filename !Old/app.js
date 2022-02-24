const express = require('express');
const cors = require('cors');

//const {sequelize} = require('./models');

//const BookRoute = require('./routes/booksRoute.js');

const app = express();
const port = 3500;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors()); 

//app.use('/db/v1/books',BookRoute);

app.use((errMsg,req,res,next)=>{

    const err = new Error(errMsg);

    err.status=404;

    next(err);

});

app.use((err,req,res,next)=>{

   res.status(err.status||500);

   res.json({

       error:{
           message:err.message
       }

   })
});
// sequelize.sync().then(()=>{
//     const server =app.listen(port,()=>{
//        console.log("Listening on port " + port);
//     })
// });

app.listen(port,()=>console.log(`Listening on port ${port}`));