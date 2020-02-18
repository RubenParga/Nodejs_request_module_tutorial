const express = require('express')
const rp = require('request-promise')
const exphbs = require('express-handlebars')

const app = express()
var path = require('path');

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/:city', (req, res) => {
  rp({
    uri: 'http://apidev.accuweather.com/locations/v1/search?q=63157&apikey=hoArfRosT1215',
    qs: {
      q: req.params.city,
      apiKey: 'api-key'
         // Use your accuweather API key here
    },
    json: true
  })
    .then((data) => {
      res.render('index', data)
    })
    .catch((err) => {
      console.log(err)
      res.render('error')
    })
})

app.listen(3000)