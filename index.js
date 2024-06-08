const express = require('express');
const routes = require('./routes')
const handlebars = require('express-handlebars')
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { auth } = require('./middleware/authMiddleware');
const functions = require('firebase-functions');
const { app, analytics } = require('./config/firebaseconfig')

const app = express();
//ToDo change name of db
mongoose.connect('mongodb+srv://viktoriya:gogolova5@cluster0.ukzvrpt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('DB conected')
})
.catch(err => console.log('DB ERROR', err.message));




app.engine('.hbs', handlebars.engine({
    extname: '.hbs'

}));
app.set('view engine', '.hbs');
app.set('views', 'src/views');


app.use(express.static(path.join(__dirname, '/src/views/layouts/main.hbs')))
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended:false }))
app.use(cookieParser());

app.use(auth)

app.use(routes)

exports.app = functions.https.onRequest(app);
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})