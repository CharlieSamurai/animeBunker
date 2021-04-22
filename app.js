const port = 3000;
const apiAdress = 'https://kitsu.io/api/edge';
const localAdress = `http://localhost:${port}/`;
const secretKey = 'SuPeRgolieanimebabi';
const express = require('express');
const app = express();
const sessions = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const User = require('./models/userModel');
const Anime = require('./models/animeModel');
const userRouter = require('./routers/userRouter');

app.set('view engine', 'hbs');
app.set('cookieName', 'animeBunker');

app.use(sessions({
  name: app.get('cookieName'),
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/anime',
  }),
  cookie: {
    httpOnly: true,
    maxAge: 86400 * 1e3,
  },
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use((req, res, next) => {
    res.locals.localAdress = localAdress;
    res.locals.user = req.session?.user;
    return next();
});

app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.render('index');
});

//=============================================================

app.post('/test', async (req, res) => {
  const response = await fetch(`${apiAdress}/anime?filter%5Btext%5D=${req.body.input}`, {
    headers: {
      "Accept": "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json"
    }
  });
  const aRespone = await response.json();
  if (req.session?.user) {
    const currentUser = await User.findById(req.session.user.id).populate('favorite');
    const inFav = currentUser.favorite.map((a) => {
      return a.title;
    });
    console.log(inFav);
  };
  res.send(aRespone);
});

//=============================================================


app.listen(port, () => {
    console.log(`Server here! Port: ${port}.`);
    mongoose.connect('mongodb://localhost:27017/anime', {
        useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true,
    }, () => {
        console.log('Database here!');
    });
});