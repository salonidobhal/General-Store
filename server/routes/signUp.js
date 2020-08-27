const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/', (req, res, next) => {
    console.log(req.body);
    
    User.find({ userName: req.body.userName })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "User already exists"
                });
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            error: err
                        });
                    }
                    else {
                        let user = new User({
                            _id: new mongoose.Types.ObjectId,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            userName: req.body.userName,
                            password: hash
                        });

                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    message: "User Created"
                                });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.status(432).json({
                error: err
            });
        });

});
module.exports = router;