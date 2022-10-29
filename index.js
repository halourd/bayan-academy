const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp').then(()=> {
    console.log("Connection Open.")
})
.catch(err => {
    console.log("Error");
    console.log(err)
})

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})

const Movie = mongoose.model('Movie', movieSchema);

const testMovie = new Movie({title: "Test Movie", year: 2022, score: 10.0, rating: "6"})

Movie.insertMany([
    {title: "Back to the Future 1", year: 1992, score: 10.00, rating: "G"},
    {title: "Star Wars 2", year: 1993, score: 10.00, rating: "PG"},
    {title: "Terminator", year: 1991, score: 9.00, rating: "G"},
    {title: "Back to the Future 4", year: 1994, score: 10.00, rating: "G"},
    {title: "Back to the Future 5", year: 1996, score: 10.00, rating: "G"}
])