const express=  require('express');
const bodyParse = require('body-parser')


const userRoute = require('./routes/userRoute');

const app =  express();
const porta = 3000;


app.use(bodyParse.urlencoded({extended:false}))

userRoute(app);

app.get('/',(req,res)=> res.send('Ola Mundo'));


app.listen(porta,() =>console.log('Api rodando na porta 300'));