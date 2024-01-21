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
const firebaseConfig = firebase.initializeApp(firebaseConfig)
// Create a root reference
const storage = getStorage()

// POST file API
const uploadFile = async (req, res, next) => {
  // Create a reference
  const storageRef = ref(storage, `files/${req.file.originalname}`)

  uploadBytes(storageRef, req.file.buffer).then((ss) => {
    console.log('file is uploaded.')
  })

  return res.json({ res: 'API for uploading files' })
}

// GET files API
const showFiles = async (req, res, next) => {
  // Find all the prefixes and items.
  const listRef = ref(storage, `files/`)

  const result = await listAll(listRef)

  const all = result.items.map(async (item) => {
    const url = await getDownloadURL(ref(storage, `files/${item.name}`))
    return { name: item.name, url }
  })

  const fileData = await Promise.all(all)

  return res.json({ res: fileData })
}

exports.uploadFile = uploadFile
exports.showFiles = showFiles
