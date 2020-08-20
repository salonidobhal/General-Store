const express= require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const Vendor= require('../models/Vendor');

router.post('/', (req, res, next) =>{
    Vendor.find({email : req.body.email})
    .exec()
    .then(vendor => {
        if (vendor.length<1){
            return res.status(401).json({
                message: "Status 2"
            });
        }
        bcrypt.compare(req.body.password, vendor[0].password, (err, result)=>{
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