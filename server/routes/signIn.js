const express= require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User= require('../models/User');
//const jwt= require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
var secret_key= process.env.SECRET_KEY;


router.post('/', (req, res, next) =>{
    User.find({userName : req.body.userName})
    .exec()
    .then(user => {
        if (user.length<1){
            return res.status(401).json({
                message: "Status 2: Unauthorised"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message:"Status 2"
                });
            }
            if(result){
                /*const token= jwt.sign({
                    userid: user[0]._id,
                    firstName: user[0].firstName,
                    lastName: user[0].lastName,
                    email: user[0].email,
                    userName: user[0].userName, 
                },
                 secret_key,
                 {
                     expiresIn: '1d'
                 });*/
                return res.status(200).json({
                    message:"Status 1:Auth Successful",
                    //token: token
                });
            }
            res.status(401).json({
                message:"Status 2:Unauthorised"      
            });
        });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({//500:server error
            error: err
    });
});
});

module.exports= router;