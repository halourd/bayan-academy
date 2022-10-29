const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const {v4: uuidv4} = require('uuid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let tweets = [
    {
        id: uuidv4(),
        username: 'user01',
        tweet: 'How is your weekend?'
    },
    {
        id: uuidv4(),
        username: 'user02',
        tweet: 'Bored!'
    },
    {
        id: uuidv4(),
        username: 'user03',
        tweet: 'OMG!'
    },
    {
        id: uuidv4(),
        username: 'user04',
        tweet: 'I am feeling okay.'
    },
];

// Form to create new tweet
app.get('/tweets/new', (req, res) => {
    res.render('tweets/new');
})

// Create tweet
app.post('/tweets', (req, res) => {
    const {username, tweet} = req.body;
    tweets.push({username, tweet, id: uuidv4()});
    res.redirect('/tweets');
})

// View specific tweet
app.get('/tweets/:id', (req, res) => {
    const {id} = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render('tweets/show', {tweet});
})

// Form to edit a specific tweet
app.get('/tweets/:id/edit', (req, res) => {
    const {id} = req.params;
    const tweet = tweets.find(t => t.id === id);
    res.render('tweets/edit', {tweet});
})

// Update existing tweet
app.patch('/tweets/:id', (req, res) => {
    const {id} = req.params;
    const newTweetText = req.body.tweet;
    const foundTweet = tweets.find(t => t.id === id);
    foundTweet.tweet = newTweetText;
    res.redirect('/tweets');
})

// Delete a tweet
app.delete('/tweets/:id', (req, res) => {
    const {id} = req.params;
    tweets = tweets.filter(t => t.id !== id);
    res.redirect('/tweets');
})

// View all tweets
app.get('/tweets', (req, res) => {
    res.render('tweets/index', {tweets})
})


app.listen(3000, () => {
    console.log("On port 3000!!!");
})