const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/users');

const app = express();

//'mongodb+srv://gautam:95VW3NQPtgDtzmUI@cluster0-xqqza.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect('mongodb://localhost:27017/meanPosts')
    .then(() => {
        console.log('Connected To Database!')
    })
    .catch(() => {
        console.log('Connection Failed');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images',express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/users', userRoutes);

module.exports = app;