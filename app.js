const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const verifyToken = require('./routes/validate-token');

app.use(bodyParser.json());

// APIs: news, and calendar

// connect to mongodb atlas
mongoose.connect(process.env.ATLAS_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to mongodb atlas');
})

app.get('/', (req, res) => {
    res.send('Hello Express! 🚀');
});

// import routes
const newsRoute = require('./routes/news');
const userRoute = require('./routes/user');
const apiRoute = require('./routes/api');

app.use('/user', userRoute);
app.use('/api', apiRoute);

// protected routes
app.use('/news', verifyToken, newsRoute);


app.listen(process.env.PORT, () => {
    console.log(`express listening`);
});