var express = require('express');
var app = express();
app.listen(3000);

app.use(express.static('./public'))

// app.get("/",function(req,res){
//     res.sendFile(__dirname +"/public/index.html")
// })
