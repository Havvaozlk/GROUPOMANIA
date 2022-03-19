const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const helmet = require('helmet');
const userModel = require('./models/user')
const app = express();
require('dotenv').config();
require('./config/db')
const path = require('path');
const db = require('./models');

//Nous avons des erreurs de CORS, on va donc des headers
//Le middleware permet à toutes les demandes de toutes les origines d'accéder à votre API
app.use((req, res, next) => {
    // on dit que l'origine qui a le droit d'accéder à notre API c'est '*'= tout le monde
    res.setHeader('Access-Control-Allow-Origin', '*');
    //on donne l'autorisation d'utiliser certains en-tête
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    //on donne l'autorisation d'utiliser certaines méthodes: GET, POST..
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;