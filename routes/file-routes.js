const express = require('express')
const fileControllers = require('../controllers/uploadFiles')
const textControllers = require('../controllers/firestore')
const router = express.Router()

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

router.post('/file', upload.single('file'), fileControllers.uploadFile)
router.get('/file', fileControllers.showFiles)

router.post('/text', textControllers.createText)
router.get('/text', textControllers.readText)

module.exports = router
