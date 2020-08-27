const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Vendor = require('../models/Vendor');
const app = require("../app");

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.post('/', (req, res, next) => {
    console.log(req.body);
    Vendor.find({ mobile: req.body.mobile })
        .exec()
        .then(vendor => {
            if (vendor.length >= 1) {
                return res.status(409).json({
                    message: "Vendor already exists"
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
                        let vendor = new Vendor({
                            _id: new mongoose.Types.ObjectId,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            mobile: req.body.mobile,
                            password: hash
                        });

                        vendor.save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    message: "Vendor Created"
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