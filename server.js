const express = require('express')
const hbs = require('hbs');
const fs = require('fs');
const favicon = require('serve-favicon');
const path = require('path');

const port = process.env.PORT || 3000

let app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname + '/public')))

hbs.registerPartials(path.join(__dirname + '/views/partials'))
hbs.registerHelper('date',new Date().getFullYear())
hbs.registerHelper('upperCase', (text) => { return text.toUpperCase()})

app.use((req,res,next) => {
  let now  = new Date().toISOString();
  let log = `date:${now} method:${req.method} url:${req.url}`
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to catch log file')
      throw err
    }
  })
 next()
})

app.get('/', (req, res) => {
  res.render('home',{
    title: 'Home Page',
    message: 'Hello from web site',
  })
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    text: 'Welcome'
  })
})

app.get('/maintenance', (req,res) => {
  res.render('maintenance', {
    title: 'Maintenance',
    message: 'Welcome again'
  })
})

app.listen(port, () => {
  console.log(`Server listen on port ${port}`)
})

