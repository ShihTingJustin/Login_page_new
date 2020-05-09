const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const helpers = require('handlebars-helpers')()
const userVerify = require('./user_verify')
const passwordVerify = require('./password_verify')
const checkUserName = require('./checkUserName')
const app = express()
const port = 3000

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

let userName = ''
let userEmail = ''
let result = ''

app.post('/', (req, res) => {
  const input = req.body
  if (userVerify(input.email)) {
    userName = checkUserName(input.email)
    userEmail = input.email
    res.render('password', { userEmail })
  } else {
    result = false
    userEmail = input.email
    res.render('index', { result, userEmail })
  }
})

app.post('/pd', (req, res) => {
  const input = req.body
  if (passwordVerify(userEmail, input.password)) {
    res.render('welcome', { userName })
  } else {
    result = false
    res.render('password', { result, userEmail })
  }
})

app.listen(port, () => {
  console.log(`Express is listening on localhost ${port}`)
})