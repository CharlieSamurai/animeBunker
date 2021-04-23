const { Router } = require('express');
const router = Router();
const Anime = require('../models/animeModel');
const User = require('../models/userModel');


router.route('/:id')
.delete( async (req, res) => {
    const user = await User.findById(req.session.user.id).populate('favorite');
    const index = user.favorite.findIndex(a => String(a._id) === String(req.params.id));
    user.favorite.splice(index, 1);
    console.log(user);
    await user.save();
    res.sendStatus(200);
})

module.exports = router;