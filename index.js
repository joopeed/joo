var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var resources = [
    {
        id: 1,
        name: 'Foo'
    }
];

app.post('/shortned', function(req, res) {
    var url = req.param('url'); 
    resources.push({key: url, url: url});
 
    res.send('/shortned/' + url);
});
 
app.get('/shortned', function(req, res) {
    res.send(resources);
});
 
app.get('/shortned/:key', function(req, res) {
    var id = req.params.key
    var result = resources.filter(r => r.id === id)[0];
 
    if (!result) {
        res.sendStatus(404);
    } else {
        res.send(result);
    }
});
 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
