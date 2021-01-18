const express = require('express');
const router = express.Router();
const News = require('../models/News');
const Calendar = require('../models/Calendar');

// endpoint for FaceWorld
router.get('/news', async (req, res) => {

    try {
        const redirectNews = await News.findOne({ selected: true });
        if (!redirectNews.url) {
            res.status(404).send('no news selected 😲');
            return;
        }
        res.status(200).redirect(redirectNews.url);
    } catch (error) {
        res.status(500).send('no selected news found 😢');
    }
});

router.get('/calendar', async (req, res) => {
    const allCalendar = await Calendar.find({ date: {"$gte": Date.now()}}).sort('date');

    try {
        res.status(200).send(allCalendar);
    } catch (error) {
        res.status(500).send('failed to fetch all calendar 😬');
    }
});



module.exports = router;