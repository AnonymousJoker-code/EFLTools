const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('landing')
})

router.get('/cloze', (req, res) => {
	res.render('cloze')
})

router.get('/sentenceShuffle', (req, res) => {
	res.render('sentenceShuffle')
})

router.get('/letterBingo', (req, res) => {
	res.render('letterBingo')
})

router.get('/matching', (req, res) => {
	res.render('matching')
})

router.get('/multipleChoice', (req, res) => {
	res.render('multipleChoice')
})

module.exports = router
