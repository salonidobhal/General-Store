const express= require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
//const jws= require('jsonwebtoken');
const Vendor= require('../models/Vendor');

router.post('/', (req, res, next) =>{
    Vendor.find({mobile : req.body.mobile})
    .exec()
    .then(vendor => {
        if (vendor.length<1){
            return res.status(401).json({
                message: "Status 2: Unauthorized"
            });
        }
        bcrypt.compare(req.body.password, vendor[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message:"Status 2:unauthorized"
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
                    message:"Status 1: Successful",
                    //token: token
                });
            }
            res.status(401).json({
                message:"Status 2"      
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