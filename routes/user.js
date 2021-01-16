const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

router.get('/', (req, res) => {
    res.send('user authentication');
})

router.post('/register', async (req, res) => {
    // validate request
    const { error } = registerValidation(req.body); 
    if (error) return res.status(400).send({ error: error.details[0].message });

    // throw error if email exists already
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) return res.status(400).send({ error: 'email already exists 😥' });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        const savedUser = await user.save();
        res.send({
            message: 'user registered 🥳',
            data: { userId: savedUser._id }
        });
    } catch (error) {
        res.status(400).send({error});
    }
});

router.post('/login', async (req, res) => {
    // validate user request
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });

    // check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ error: 'wrong email! 😮' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) res.status(400).send({ error: 'wrong password 🙁'});

    const token = jwt.sign(
        {
            name: user.name,
            id: user.id,
        },
        process.env.TOKEN_SECRET
    )

    res.header('auth-token', token).send({message: 'login successful 🍾', token: token});
});

module.exports = router;