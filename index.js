require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose')

const cors = require(cors)
app.use(cors())

const app = express();

app.use (
    express.urlencoded({
        extended: true
    })
)

app.use (express.json())

//rotas
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)
app.get('/', (req, res) =>{
    res.send('Hello World!')
})

const DB_USER = process.env.DB_USER;
const PORT = process.env.PORT;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD) 

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.dfienfv.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Conectou com sucesso no mongoDb!')
        app.listen(`${PORT}`)
    })
    .catch((error) => console.log(error))    



