const config = require('./config/aws-config');

var AWS = require('aws-sdk');
AWS.config.region = config.region;

var uuid = require('node-uuid');
var fs = require('fs-extra');
var path = require('path');

var rekognition = new AWS.Rekognition({ endpoint: "https://rekognition.us-east-1.amazonaws.com", region: config.region, accessKeyId: 'AKIAJIB325FR52LOQCEQ', secretAccessKey: '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' });

module.exports.search_face = function (obj, callback) {
	var objReturn = {
		found: false,
		resultAWS: '',
		data: ''
	}
	var keyname = obj.keyname
	rekognition.searchFacesByImage({
	 	"CollectionId": config.collectionName,
		"FaceMatchThreshold": 90,
		"Image": {
			'S3Object': {
				"Bucket": "smartdoorapp",
				"Name": keyname,
				"Version": "null"
			}
		},
	 	"MaxFaces": 1
	}, function(err, data) {
	 	if (err) {
			console.log(err)
			callback(err);
	 	} else { 
			if(data.FaceMatches && data.FaceMatches.length > 0 && data.FaceMatches[0].Face)
			{
				objReturn.found = true;
				objReturn.data = data.FaceMatches[0].Face.ExternalImageId
				callback(objReturn);	
			} else {
				objReturn.found = false
				callback (objReturn);	
			}
		}
	});
}

module.exports.indexFaces = function (obj, callback) {
	var objReturn = {
		found: false,
		resultAWS: ''
	}
	rekognition.indexFaces({
		"CollectionId": config.collectionName,
		"DetectionAttributes": [ "ALL" ],
		"ExternalImageId": obj.username, 
		"Image": {
			"S3Object": {
				"Bucket": "smartdoorapp",
				"Name": obj.keyname
			}
		}
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack);	
			objReturn.found = false
			objReturn.resultAWS = err, err.stack
			callback(objReturn)
		} else {
			console.log(data.FaceRecords[0]);
			objReturn.found = true
			objReturn.resultAWS = data.FaceRecords[0]
			callback(objReturn)
		}
	});
}

/*
module.exports.deleteFace = function (obj,callback){
	console.log("Delete image face ...")
	var params_deletion = {CollectionId: config.collectionName, FaceIds: [obj.face_id]};
	rekognition.deleteFaces(params_deletion, function(err, data) {
		if (err) callback(err, err.stack); 
		else     callback(true,data);
	});
}*/