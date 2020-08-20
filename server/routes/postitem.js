const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Item = require('../models/Item');

router.post('/', (req, res, next) => {
    console.log(req.body);
    let item = new Item({
        _id: new mongoose.Types.ObjectId,
        Title: req.body.Title,
        Description: req.body.Description,
        Price: req.body.Price,
    });

    item.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Item entered successfully in the database."
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

module.exports = router;