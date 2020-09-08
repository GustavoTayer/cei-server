const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')
const queryParser = require('express-query-int')
const path = require('path');

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../dist/')))

server.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist/index.html'))
})
server.get('/pages/*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist/index.html'))
})
server.get('/auth/*', (req, res) => {
  return res.sendFile(path.join(__dirname, '../dist/index.html'))
})

server.use('/images/',  express.static(path.join(__dirname, '../../uploads/avatar')))

server.use(allowCors)
server.use(queryParser())
// server.use('/', express.static(path.join(__dirname, 'public')));
// server.use( (req,res, next) => {
//   res.sendFile(this.path.join(__dirname, 'public', 'index.html'))
// })

server.listen(process.env.PORT || port, function() {
    console.log(`BACKEND is running on port ${port}.`)
})


module.exports = server
