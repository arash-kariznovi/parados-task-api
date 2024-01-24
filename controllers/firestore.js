const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const uuid = require('uuid').v4
const serviceAccountKey = require('../firestore-creds.json')

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
  const responses = []
  try {
    const texts = db.collection('records')
    const docs = await texts.get()

    docs.forEach((doc) => {
      responses.push(doc.data())
    })
  } catch (error) {
    res.status(440)
  }

  res.status(200).json({ responses })
}

exports.createText = createText
exports.readText = readText
