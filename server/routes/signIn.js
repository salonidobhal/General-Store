const express= require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const User= require('../models/User');

router.post('/', (req, res, next) =>{
    User.find({email : req.body.email})
    .exec()
    .then(user => {
        if (user.length<1){
            return res.status(401).json({
                message: "Status 2"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result)=>{
            if(err){
                return res.status(401).json({
                    message:"Status 2"
                });
            }
            if(result){
                return res.status(200).json({
                    message:"Status 1"
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