const express = require('express');
const app = express();


app.listen(3000, () => {console.log('Listening on 3000')});


app.use((req,res,next) =>{
    console.log("request:", req.method, req.url);
    next();
})

app.get('/', (req,res) => {
    res.send('semdnig bacsk');
})

app.get('/news', (req,res) => {
    res.send('semdnig bacsk news');
})

app.use('/special/:id', (req,res,next) => {
    console.log('special zone');
})