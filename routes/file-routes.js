const express = require('express')

const fileControllers = require('../controllers/firestorage')
const textControllers = require('../controllers/firestore')

const router = express.Router()

const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage() })

// Files ROUTES
router.post('/file', upload.single('file'), fileControllers.uploadFile)
router.get('/file', fileControllers.showFiles)

// Texts ROUTES
router.post('/text', textControllers.createText)
router.get('/text', textControllers.readText)

module.exports = router
