const express = require('express')
const pug = require('pug')
const app = express()

const indexRouter = require('./routes/index')

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(express.static('public'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)