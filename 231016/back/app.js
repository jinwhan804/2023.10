const express = require('express');
const cors = require('cors');
const app = express();

const fsRouter = require('./routers/create');

app.use(express.urlencoded({extended : false}));

app.use(cors({
    origin : "http://localhost:3000",
    credentials : true
}))

app.use(express.json());

app.use('/',fsRouter);

app.listen(8000,()=>{
    console.log('server open');
})