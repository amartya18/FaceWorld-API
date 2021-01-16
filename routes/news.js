const express = require('express');
const router = express.Router();
const News = require('../models/News');

router.get('/', async (req, res) => {
    const allNews = await News.find({});

    try {
        res.status(200).send(allNews);
    } catch (error) {
        res.status(500).send('failed to fetch all news 🤯');
    }
});

router.post('/insert', async (req, res) => {
    const news = new News({
        title: req.body.title,
        url: req.body.url,
        selected: req.body.selected
    });

    try {
        await news.save();
        res.status(200).send('insert successful 🍾');
    } catch (error) {
        res.status(500).send('failed to insert news 😭');
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) res.status(404).send('no item found 😨');
        res.status(200).send('successfully deleted 🎉');
    } catch (error) {
        res.status(500).send('delete error 😧');
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body);
        const newsUpdated = await news.save();
        res.status(200).send('update sucessful 🤘🏻');
    } catch (error) {
        res.status(500).send('update error 😔');
    }
});

module.exports = router;