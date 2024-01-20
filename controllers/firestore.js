const admin = require('firebase-admin')
const { getFirestore } = require('firebase-admin/firestore')
const uuid = require('uuid').v4
const serviceAccount2 = {
  type: 'service_account',
  project_id: 'parados-7afaf',
  private_key_id: 'e5019213b62ef4590a69bb97a273cd03a6202da8',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDPHMQQ9oJwc90w\nkSYVMFF6vUOgny7enW7zhr83vJ8NN6w+pBlsoOfS5MJ+QB+5+kIlLG7CbCQduz+B\ndu5IjHLhwXZK2mgJSVLJQpWBT+AADf9NAcR1QhjbKd5XzRMHNp+MlWWYlf6XLS5H\nCv6n4/r+nr2pcN3G6fwpb5jOJTZthiNAF8VQDhmXfXOdgaVjEkyfLCw/FbLsj4/h\nEIujZ5lH1RiJinAmAj0MI6CEGvvGXlwGyyDOJFmjzLXgQhrxdR3aNMq0JQ/F9F/M\ntmRim9sedCTcUY2SuFMFRobBxW5h1RrWclV1/ZT9ciqwlihan/8ApWVSPXs3Jcrj\nwMr+6f5ZAgMBAAECggEAHuuW/pym1aiz7YkbS+TbopI4qKALQcie5LQ0aQWmeIqG\nvbqxtwIrX1SwEA7SYxQQevdFY+Om3VoeqDKRbtBVDbeHHwljUyZDZJulsVleQkkq\nA8ekml2Z/gz5Tldl+gOMJ1Nd3b1gSxaU3EixGG8/V3MV3Vg7K/QJJZstD3MGdgGL\nPhM+dx7SSc4+1n99kmxd+MNtqVDdTP3xAv7R4H1jya3ovrDPkKNVLxC4Lnn5NW3U\nzp+Y2/wyFWffpmMIwB/+QzlnVfGif83INSewmUXurj1U2T6S9LfRELBZUo/5OQIt\nLYAuXLbpmKf8mBPDdKPL7Vcc421hmQjugrYPk6g+pwKBgQD2hU+dX0wKQtCZMgEl\ndX/qqvg8/tzpyaKl4gE4Pong2lZKc6TrWJwy5DPjubZQPvB6xjQEtTqDnefLbIyZ\no9X1gNnwkne4a71+nEetdkrE2Y3A0xY2Ch6vr02IZAhTuComMgD4cc48JUyVtYlj\nLqk8iHjG2HrXjKioCTOJzNW36wKBgQDXE4dRm2I/P4UoViJckHUf3xqH1TCi/fUD\nDhiNWpXJTVnm03Z+wnbj2oAJxVOJOIzdpsdzFGy7YnqsKhb5S3lkS6LIHMa/p8Je\nKqg46i76ZjLYnGotB7OEKRFHTpg7CIoTJVIjq51Sg9ikdJa37ji9r7muHv8eULeF\ng0Xq8Ti1ywKBgFRl3ZTuPFVC/LGGChht+sY3lFclljJAAvwxvOMpngCqH2LL5slg\nA9H0iMNNIFqmwaP22XZHKWpIFERzvEsZaTXs0DBppK0xzaVcEboURpLQPJSob/E+\nU7UoGi44uRUYdu2uruBf7hBvYKHcjdWz8uKzgk3pbV0AXflxdQCXbQ/TAoGBANCJ\nJtOBjak1ta5+laKajnXwpJC/rQDcrAviRvwHsOQWE+0za9lMRGp5GVxf77dFFZB0\nfT6fty2ZNshnpw7glzsf+x18iVibGGKliaZlqlcvcG2Ge4xdwzmJeC9jjUbv6LDX\npuTfKRMws4YBZYHBgVKqZ6bkdwi1yruxpMFAUnQxAoGAT79r6Nz9QmkLWqeM/b2M\nSzV1XXkFiLopWHtQOq8pqGYa4uDaMKixVFHUYmN9SAft2qEm8IbkSBA4PomfEde0\nXJkSzq+WQ6zSlgQ1m50/4KYlCOZBd5tWiEVBF3TN3CpbNOhivN4mpQvsLeKgX3PM\nh79zSesgpZLjzrv3/6hXsjU=\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-iqns1@parados-7afaf.iam.gserviceaccount.com',
  client_id: '108607678332432472454',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-iqns1%40parados-7afaf.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount2),
})

const db = getFirestore()

// create a record
const createText = async (req, res, next) => {
  console.log(req.body)
  const { text } = req.body

  const response = await db.collection('records').doc(uuid()).set({
    text: text,
    id: uuid(),
  })

  res.send({ result: 'successful', response })
}

// get texts from firestore
const readText = async (req, res, next) => {
  const texts = db.collection('records')
  const docs = await texts.get()

  const responses = []
  docs.forEach((doc) => {
    console.log(doc.data())
    response.push(doc.data())
  })

  res.status(200).json({ responses })
}

exports.createText = createText
exports.readText = readText
