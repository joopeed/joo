var express = require('express')
var app = express()
var admin = require("firebase-admin");
var ip = require("ip");

var serviceAccount = require("/home/ubuntu/joo/joop-5bd39-firebase-adminsdk-f4vro-9f323f770e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://joop-5bd39.firebaseio.com"
});

var db = admin.database();

app.get('/', function (req, res) {
  res.send('App rodando na maquina: ' + ip.address())
})


app.post('/url', function(req, res) {
    var urlkey = req.param('url');
    var ref = db.ref("bd"); 
    var urlsRef = ref.child("url");
    var obj = { shortened: "" + urlkey }
    posted = urlsRef.push(obj); 
    res.send('/url/' + JSON.stringify(posted.key));
});
 
app.get('/url', function(req, res) {
	var ref = db.ref("bd/url");

	ref.once("value", function(snapshot) {
		  res.send(JSON.stringify(snapshot));
	});
    	//res.send("OK");
});
 
app.get('/url/:key', function(req, res) {
    var id = req.params.key;
    var ref = db.ref("bd/url/"+id);
    ref.once("value", function(snapshot) {
	res.send("" + snapshot.val().shortened);
    }, function (errorObject) {
 	res.send("URL NAO ENCONTRADA");
    });
});
 

app.listen(3000, function () {
  console.log('App rodando!')
})
