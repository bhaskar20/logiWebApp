var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'../../client/','index.html'));
});
router.get('/about',function(req,res,next){
	res.sendFile(path.join(__dirname,'../../client/','about.html'));
});
router.get('/contact',function(req,res,next){
	res.sendFile(path.join(__dirname,'../../client/','contact.html'));
});
router.get('/services',function(req,res,next){
	res.sendFile(path.join(__dirname,'../../client/','services.html'));
});
// router.get('/login',function(req,res,next){
// 	var options = {
//     root: __dirname + '../../client/',
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
//   };
// 	res.sendFile(path.join(__dirname,'../../client/','login.html'));
// });
router.get('/*',function(req,res,next){
    res.redirect('/');
});
module.exports = router;
