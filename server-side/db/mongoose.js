const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb+srv://nadavsh:itunesSearch@ituenssearch-iyljy.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('conncect!')
});


module.exports = {mongoose}