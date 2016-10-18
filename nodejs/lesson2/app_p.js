var express = require('express');

var app = express();

var utility = require('utility');

app.get('/',function(req,res){
	var q = req.query.q;
	
	var q_sha = utility.md5(q);
	
	res.send(q_sha);
	
});

app.listen(3000,function(){
	console.log('listen 3000 port!');
});