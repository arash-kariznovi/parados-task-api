const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} = require('firebase/storage')
const firebase = require('firebase/app')
const firebaseConfig = require('../firestorage-creds.json')

// web app's Firebase configuration
firebase.initializeApp(firebaseConfig)
// Create a root reference
const storage = getStorage()

// POST file API
const uploadFile = async (req, res, next) => {
  try {
    // Create a reference
    const storageRef = ref(storage, `files/${req.file.originalname}`)

    uploadBytes(storageRef, req.file.buffer).then((ss) => {
      console.log('file is uploaded.')
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

  return res.json({ res: 'API for uploading files' })
}

// GET files API
const showFiles = async (req, res, next) => {
  const fileData = []

  try {
    // Find all the prefixes and items.
    const listRef = ref(storage, `files/`)

    const result = await listAll(listRef)

    const all = result.items.map(async (item) => {
      const url = await getDownloadURL(ref(storage, `files/${item.name}`))
      return { name: item.name, url }
    })

    fileData = await Promise.all(all)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

  return res.json({ res: fileData })
}

exports.uploadFile = uploadFile
exports.showFiles = showFiles
