const express = require('express');
const router = express.Router();
const Item = require('../models/Item');


router.get('/', (req, res, next) => {
    console.log("Get Request");
    Item
    .find()
    .exec()
        .then(docs => {
            console.log(docs);
            console.log(req.body);
            console.log(res.body);
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;









/**/ 

/*router.route('/')
    .get(function(req, res){
        Items.find({}, function(err, result){
            if(err){
                res.status(500).send({error: 'Status 2'});
            } else{
                res.json(result);
            }
        })
    });

            /*.toArray((err, result) => {
                 result.forEach((err, doc) => {
                     if (err) {
                         console.log("Error:", err);
                     }
                     else { 
                        res.json({Title:doc.Title},{ Description :doc.Description}, { Price : doc.Price});
                    }
                });
            });
        });
        /*.find({}, (err, result)=>{
            if(err){
              res.send(err);
      
            }
            else{
              res.send(result);
            }
            
          });
      });*/
      

/*router.get('/', (req, res, next) => {
  console.log("Get request");
  Item
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});*/


