const express = require('express');
const dot = require('dotenv').config();
const {sequelize} = require('./models');
const storeRouter = require('./routers/store');

const app = express();


sequelize.sync({force : false}).then(()=>{
    console.log('connect OK');
}).catch((err)=>{
    console.log(err);
})

app.use(express.urlencoded({extended : false}));

app.use(express.json());

app.use(cors({
    origin : "http://127.0.0.1:3000",
    credentials : true
}))

app.use('/', storeRouter);

app.listen(5000,()=>{
    console.log('backend server open');
})