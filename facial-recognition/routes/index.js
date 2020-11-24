var express = require("express");
var router = express.Router();
var facialAWS = require("../awsrekognition/facial-detection");
 
router.post('/detect-face', function(req, res){
    const obj = {
        keyname: req.body.keyname
    }
    facialAWS.search_face(obj, function(data){    
        res.send(data);
        // write here to firebase 
    });
});

router.post('/index-new-face', function(req, res){
    const obj = {
        keyname: req.body.keyname,
        username: req.body.username
    }
    facialAWS.indexFaces(obj, function(data){
        res.send(data);
         // write here to firebase 
    });    
});

/*
router.post('/delete-face', function(req, res){
    const obj = {
        face_id: req.body.face_id
    }
    facialAWS.deleteFace(obj, function(data){
        res.send(data);
    });
});*/

module.exports = router;