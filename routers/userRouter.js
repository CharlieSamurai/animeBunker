const { Router } = require('express');
const router = Router();
const User = require('../models/userModel');

router.route('/register')
.get((req, res) => {
    res.render('register');
})
.post( async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save();
    req.session.user = {
        name: newUser.name,
        id: newUser._id,
    };
    res.sendStatus(200);
});

router.route('/login')
.get((req, res) => {
    res.render('login');
})
.post( async (req, res) => {
    const user = await User.findOne({name: req.body.name});
    if(user.name === req.body.name && user.password === req.body.password) {
        req.session.user = {
            name: user.name,
            id: user._id,
        };
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

router.route('/logout')
.delete((req, res) => {
    req.session.destroy();
    res.clearCookie('animeBunker');
    res.sendStatus(200);
});

module.exports = router;