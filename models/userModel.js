const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorite: [{
        type: Schema.Types.ObjectId,
        ref: 'Anime',
    }],
})

const userModel = model('User', userSchema);

module.exports = userModel;