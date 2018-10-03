const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const profile = require('./profile');
const dotenv = require('dotenv').config();
const sgMail = require('@sendgrid/mail');

const app = express();

// then define the route that will use your custom router
app.use('/profile', profile);
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});
app.get('/ticTacToe', (req, res) => {
    res.render('ticTacToe');
});

app.get('/mortgage', (req, res) => {
    res.render('mortgage');
});

app.get('/discordChatApp', (req, res) => {
    res.render('discordChatApp');
});

app.get('/topSpots', (req, res) => {
    res.render('topSpots');
});

app.get('/vstda', (req, res) => {
    res.render('vstda');
});

app.get('/hangman', (req, res) => {
    res.render('hangman');
});

app.get('/change', (req, res) => {
    res.render('change');
});
app.get('/myResume', (req, res) => {
    res.render('myResume');
});


app.post('/thanks', (req, res) => {
    const msg = {
        to: 'seahorse8789@gmail.com',
        from: req.body.email,
        subject: req.body.topic,
        text: req.body.emailContent,
    };
    sgMail.send(msg);
    res.render('thanks', { contact: req.body });
});

app.listen(process.env.PORT || 8080, () => {
    console.log('listening on at http://localhost:8080');
});

module.exports = app;
