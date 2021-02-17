const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT

const multer = require('./modules/multer')
const session = require('express-session')

//routes
const scanImage = require('./routes/scanner')
const search = require('./routes/search')
const home = require('./routes/home')
const medicine = require('./routes/medicine')
const upload = require('./routes/upload')

app
    .use(express.urlencoded({
        extended: true
    }))
    .use(express.static('public'))
    .use(session({
        secret: process.env.KEY,
        resave: false,
        saveUninitialized: true,
    }))
    .use('/image', express.static('tmp'))
    .set('view engine', 'ejs')
    .set('views', 'views')
    .get('/', home)
    .get('/image-upload', upload.page)
    .get('/search', search)
    .get('/medicine/:id', medicine.page)
    .get('/:id', medicine.partial)
    .post('/image/scan', multer, scanImage)
app.listen(port, () => console.log('listening to ' + port))