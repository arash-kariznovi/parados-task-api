const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const uuid = require('uuid').v4
const serviceAccountKey = require('../firestore-creds.json')
const HttpError = require('../models/http-error')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
})
const db = getFirestore()

// POST a text API
const createText = async (req, res, next) => {
  const { text } = req.body

  const response = await db.collection('records').doc(uuid()).set({
    text: text,
    id: uuid(),
    createdAt: new Date(),
  })

  res.send({ result: 'successful', response })
}

// GET records API
const readText = async (req, res, next) => {
  try {
    throw new Error()
    const texts = db.collection('records')
    const docs = await texts.get()
    const responses = []
    docs.forEach((doc) => {
      responses.push(doc.data())
    })
  } catch (err) {
    const error = new HttpError('Unable to retreive records', 400)
    return next(error)
  }

  res.status(200).json({ responses })
}

exports.createText = createText
exports.readText = readText
