const express=require('express');
const cors=require('cors');
const bp=require('body-parser');
const {connect}=require('mongoose');
const {DB,PORT}=require('./Config/index');
const {success,error}=require('consola');
const bodyParser = require('body-parser').json();

// * App Initialization
const app=express();


// * user router middlewares
app.use('/api/users',bodyParser, require('./Routes/users'))

const startApp = async() => {
    
    // * Middlewares
    app.use(cors);
    app.use(bodyParser);

    try {

        //* Connect with DB
        await connect(DB,{  
            useNewUrlParser: true,
            useUnifiedTopology: true})
        .then(()=>{
            success({message:`Connected TO DATABASE SUCCESSFULLY `,badge:true})
        })
        
        // * Listening to App on Port 
    app.listen(PORT,()=>success({message:`Server is Listening on PORT ${PORT}`,badge:true}));

        

    }
    catch (error) {
            error({message:`Unable to connect with DB  ${err}`,badge:true})
    }
    
}

// * Calling App Start Method
startApp();
