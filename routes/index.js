const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('landing')
})

router.get('/cloze', (req, res) => {
    res.render('cloze')
})

router.get('/scramble', (req, res) => {
    res.render('scramble')
})

router.get('/letterBingo', (req, res) => {
    res.render('letterBingo')
})

module.exports = router