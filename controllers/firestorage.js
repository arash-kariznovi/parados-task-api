const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} = require('firebase/storage')
const firebase = require('firebase/app')
const firebaseConfig = require('../firestorage-creds.json')

const HttpError = require('../models/http-error')

try {
  // web app's Firebase configuration
  firebase.initializeApp(firebaseConfig)
} catch (error) {
  const err = new HttpError(
    error.message ? error.message : 'Please try again later',
    500
  )
}

// POST file API
const uploadFile = async (req, res, next) => {
  // Create a root reference
  const storage = getStorage()
  // Create a reference
  const storageRef = ref(storage, `files/${req.file.originalname}`)

  try {
    uploadBytes(storageRef, req.file.buffer).then((ss) => {
      console.log('file is uploaded.')
    })
  } catch (err) {
    const error = new HttpError(
      err.message
        ? err.message
        : 'Sorry! Unable to upload the files at the moment',
      500
    )
    return next(error)
  }

  return res.json({ res: 'API for uploading files' })
}

// GET files API
const showFiles = async (req, res, next) => {
  // Create a root reference
  const storage = getStorage()
  // Find all the prefixes and items.
  const listRef = ref(storage, `files/`)
  let fileData = []
  try {
    const result = await listAll(listRef)
    const all = result.items.map(async (item) => {
      const url = await getDownloadURL(ref(storage, `files/${item.name}`))
      return { name: item.name, url }
    })

    fileData = await Promise.all(all)
  } catch (err) {
    const error = new HttpError(
      err.message
        ? err.message
        : 'Sorry! Unable to retreive the files at the moment',
      500
    )
    return next(error)
  }

  return res.json({ res: fileData })
}

exports.uploadFile = uploadFile
exports.showFiles = showFiles
