const express= require('express');
const mongoose= require('mongoose');
const morgan= require('morgan');
const cors= require('cors');
const bodyParser= require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

var dbUrl= process.env.MONGODB_URI;

const app= express();

mongoose.connect(dbUrl,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', ()=>{
    console.log("Connected to db");
});
mongoose.connection.on('error',(error)=>{
    console.log("Error at MongoDB: "+ error);
});
mongoose.Promise= global.Promise;

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 

//Routes
app.use('/user/register', require('./routes/signUp'));
app.use('/vendor/register', require('./routes/vendorSignUp'));
app.use('/user/login', require('./routes/signIn'));
app.use('/vendor/login', require('./routes/vendorSignIn'));
app.use('/vendor/list', require('./routes/items'));
app.use('/additem', require('./routes/postitem'));

module.exports =app;