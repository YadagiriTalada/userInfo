const mongoose = require('mongoose');
const { DB_URL } = require('./config/constants.json');

mongoose.connect(DB_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const connect = mongoose.connection;

connect.on(`open`, () => {
    console.log(`DB connected Successfully !!`)
});