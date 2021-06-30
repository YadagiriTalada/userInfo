const express = require('express');
const bodyParser= require('body-parser');

const app = express();

const connection = require('./connection');
const { PORT } = require('./config/constants.json');

const { createUser, userLogin } = require('./controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/user/register', createUser);
app.post('/user/login', userLogin);

app.listen(3000, () => {
    console.log(`Server running on PORT ${PORT} !`);
});