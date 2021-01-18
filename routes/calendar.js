const express = require('express');
const router = express.Router();
const Calendar = require('../models/Calendar');

router.get('/', async (req, res) => {
    const allCalendar = await Calendar.find({}).sort('date');

    try {
        res.status(200).send(allCalendar);
    } catch (error) {
        res.status(500).send('failed to fetch all calendar 😬');
    }
});

router.post('/insert', async (req, res) => {
    const calendar = new Calendar({
        title: req.body.title,
        date: req.body.date
    });

    try {
        await calendar.save();
        res.status(200).send({ 'message': 'insert successful 🤩', 'data': calendar });
    } catch (error) {
        res.status(500).send('failed to insert calendar 🙁');
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const calendar = await Calendar.findByIdAndDelete(req.params.id);
        if (!calendar) res.status(404).send('no item found 😨');
        res.status(200).send('successfully deleted 🎉');
    } catch (error) {
        res.status(500).send('delete error 😧');
    }
});

router.patch('/update/:id', async (req, res) => {
    try {
        const calendar = await Calendar.findByIdAndUpdate(req.params.id, req.body);
        const calendarUpdated = await calendar.save();
        res.status(200).send('update sucessful 🤘🏻');
    } catch (error) {
        res.status(500).send('update error 😔');
    }
});


module.exports = router;