const firebase = require('firebase/app')
const admin = require('firebase-admin')
// const serviceAccount = require('../serviceAccountKey.json')

const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} = require('firebase/storage')

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAL6yd_ic7hCp40vyzx_uAZG2woU8tlIYU',
  authDomain: 'auth-project-7e126.firebaseapp.com',
  projectId: 'auth-project-7e126',
  storageBucket: 'auth-project-7e126.appspot.com',
  messagingSenderId: '27537082539',
  appId: '1:27537082539:web:21b6135c309cda035f4fee',
}

// initialize firebase app
firebase.initializeApp(firebaseConfig)

// Create a root reference
const storage = getStorage()

// upload file api
const uploadFile = async (req, res, next) => {
  console.log(req.body)
  // Create a reference to 'fleis/filename.format'
  const storageRef = ref(storage, `files/${req.file.originalname}`)
  console.log(req.file)

  uploadBytes(storageRef, req.file.buffer).then((ss) => {
    console.log('file is uploaded.')
  })

  console.log('API for uploading files')
  return res.json({ res: 'API for uploading files' })
}

const showFiles = async (req, res, next) => {
  // Find all the prefixes and items.
  const listRef = ref(storage, `files/`)

  let files = []

  const result = await listAll(listRef)

  const all = result.items.map(async (item) => {
    const url = await getDownloadURL(ref(storage, `files/${item.name}`))
    return { name: item.name, url }
  })

  const fileData = await Promise.all(all)

  return res.json({ res: fileData })
}

const downloadFile = async (req, res, next) => {}

exports.uploadFile = uploadFile
exports.showFiles = showFiles
