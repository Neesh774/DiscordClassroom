/* eslint-disable no-unexpected-multiline */
require('dotenv').config()
require('./strategies/discord')


const express = require('express');
const passport = require('passport')
const app = express();
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3002;
const session = require('express-session')
const cors = require('cors')
const Store = require('connect-mongo');

const routes = require('./routes/index.js')

mongoose
  .connect('mongodb+srv://Neesh:fljnyI5WBOyvnyvH@cluster0.99zcx.mongodb.net/DisClassroom?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => {
    console.log('Connection failed!');
    console.log(error);
  });

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))

app.use(
    session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24,
    },
    resave: false,
    saveUninitialized: false,
    store: Store.create({ mongoUrl: 'mongodb+srv://Neesh:fljnyI5WBOyvnyvH@cluster0.99zcx.mongodb.net/DisClassroom?retryWrites=true&w=majority' }),
    }),
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', routes);


app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`)
});
