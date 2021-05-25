//setup Node https://www.youtube.com/watch?v=zb3Qk8SG5Ms

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
//How To Get Started with Node.js and Express https://www.digitalocean.com/community/tutorials/nodejs-express-basics


const app = express()
//https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

//funktion som retunerar ett heltal mellan 0 och variabeln number
function random(number){
    return Math.floor(Math.random() * (parseInt(number) + 1))
}

//första root-endpoint
//How To Deliver HTML Files with Express https://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

//andra endpoint!
//json response
//https://flaviocopes.com/express-send-json-response/
//math floor random
//www.w3schools.com/js/js_random.asp
app.get('/api/random', (req, res) => {
  res.json({
    random: random(1023),
  })
})

//tredje endpoint
//dynamisk routes
//https://dev.to/reiallenramos/create-an-express-api-static-and-dynamic-routes-33lb
app.get('/api/custom_random/:num', (req, res) => {
  res.json({
    random: random(req.params.num),
  })
})

//fjärde endpoint
app.post('/api/freddie', (req, res) => {
  res.json({
    data:`hej på dig, ${req.body.name}. Ditt namn innehåller ${req.body.name.length} bokstäver.`,
  })
})


//VG nivå TDD
app.get('/api/reverse-word/:word', (req, res) => {
  res.json({
    word: req.params.word.split('').reverse().join(''),
  })
})


app.listen(3000, () => console.log('Example app is listening on port 3000.'))

module.exports = app