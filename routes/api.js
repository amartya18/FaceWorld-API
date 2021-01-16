const express = require('express');
const router = express.Router();
const News = require('../models/News');

// endpoint for FaceWorld
router.get('/', async (req, res) => {

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


module.exports = router;