var express = require('express')
var app = express()
var admin = require("firebase-admin");

var serviceAccount = require("/home/joaopedro/joo/joop-5bd39-firebase-adminsdk-f4vro-9f323f770e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://joop-5bd39.firebaseio.com"
});

var db = admin.database();

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var resources = [
    {
        id: 1,
        name: 'Foo'
    }
];

app.post('/url', function(req, res) {
    var url = req.param('url');
    var ref = db.ref("url"); 
    var urlsRef = ref.child("url");
    urlsRef.push({
      url: "genera"
    }); 
    res.send('/shortned/' + "teste");
});
 
app.get('/url', function(req, res) {
	var ref = db.ref("url/url");

	ref.once("value", function(snapshot) {
		  res.send(snapshot);
	});
    	//res.send("OK");
});
 
app.get('/url/:key', function(req, res) {
    var id = req.params.key
    var ref = db.ref("url/url/"+id);
    ref.once("value", function(snapshot) {
        if(snapshot != "null"){ 
		res.send(snapshot);
	} else {
		res.send("URL NAO ENCONTRAD");
	}
    }, function (errorObject) {
 	 res.send("URL NAO ENCONTRADA");
    });
});
 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
