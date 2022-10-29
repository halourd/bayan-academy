const express = require('express')

const app = express();
const path = require('path')
const act_data = require('./data.json');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));

//home
app.get('/', (req, res) => {
    res.render('home')
})
//about
app.get('/about', (req, res) => {
    res.render('about')
})

//contact
app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/:about', (req, res) => {
    const {about} = req.params;
    const data = act_data[about]

    if(!data) {
        res.render('notfound')
    }
})

app.listen(3030, ()=>{
    console.log("Listening on port 3030.");
})