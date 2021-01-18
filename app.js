const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');
const cors = require("cors");


const verifyToken = require('./routes/validate-token');

app.use(bodyParser.json());
app.use(cors());

// APIs: news, and calendar

// connect to mongodb atlas
mongoose.connect(process.env.ATLAS_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
    console.log('connected to mongodb atlas');
})

app.get('/', (req, res) => {
    res.send('Hello Express! 🚀');
});

// import routes
const newsRoute = require('./routes/news');
const calendarRoute = require('./routes/calendar');
const userRoute = require('./routes/user');
const apiRoute = require('./routes/api');

app.use('/user', userRoute);
app.use('/api', apiRoute);

// protected routes
app.use('/news', verifyToken, newsRoute);
app.use('/calendar', verifyToken, calendarRoute);


app.listen(process.env.PORT, () => {
    console.log(`express listening`);
});
