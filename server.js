var express = require('express');
var app = express();
const path = require('path');
const bodyParser = require('body-parser');
const testRouter = require('./routers/testRouter');


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

app.use(testRouter);
app.listen(3000, (err, next) => {
    if(err){
        console.log(err);
    } else {
        console.log("Port 3000");
    }
})