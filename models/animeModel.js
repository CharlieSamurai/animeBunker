const { Schema, model } = require('mongoose');

const animeSchema = new Schema ({
  title: String,
  episodes: Number,
  startDate: String,
  img: String,
});

const animeModel = model('Anime', animeSchema);

module.exports = animeModel;