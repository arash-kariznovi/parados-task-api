const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const uuid = require('uuid').v4
const serviceAccountKey = require('../firestore-creds.json')
const HttpError = require('../models/http-error')
const { response } = require('express')

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
  })
} catch (err) {
  const error = new HttpError(
    err.message ? err.message : 'Sorry! Please try again later',
    500
  )
  return next(error)
}

// POST a text API
const createText = async (req, res, next) => {
  const { text } = req.body

  try {
    const db = getFirestore()
    const response = await db.collection('records').doc(uuid()).set({
      text: text,
      id: uuid(),
      createdAt: new Date(),
    })
    console.log(response)
  } catch (err) {
    const error = new HttpError(
      err.message ? err.message : 'Sorry! Please try again later',
      500
    )
    return next(error)
  }

  res.json({ result: 'The text record is stored successfully.' })
}

// GET records API
const readText = async (req, res, next) => {
  const responses = []
  try {
    const db = getFirestore()
    const texts = db.collection('records')
    const docs = await texts.get()
    docs.forEach((doc) => {
      responses.push(doc.data())
    })
    console.log(responses)
  } catch (err) {
    const error = new HttpError(
      err.message
        ? err.message
        : 'Sorry! Unable to retreive the records at the moment',
      500
    )
    return next(error)
  }

  res.status(200).json({ responses })
}

exports.createText = createText
exports.readText = readText
