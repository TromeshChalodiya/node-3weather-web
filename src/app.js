const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('request');

const app = express();
const port = process.env.PORT || 3000;

// Getting the geocode/weathercodefile
const geocode = require('./utils/geocode');
const weathercode = require('./utils/weathercode');

// Define path for the Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup Handlebar engine and Views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static diractory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  debugger;
  res.render('index', {
    title: 'Web-Server App',
    name: 'Tromesh',
    lastName: 'Mr.Chalodiya'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'The about page',
    name: 'Tromesh',
    lastName: 'Mr.Chalodiya'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'The help page',
    name: 'Tromesh',
    lastName: 'Mr.Chalodiya'
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Tromesh',
    lastName: 'Mr.Chalodiya',
    errorMessage: 'The help page data is not found'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide the valid address'
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          res.send({
            error
          });
        }

        weathercode(latitude, longitude, (error, forecaseData) => {
          if (error) {
            res.send({
              error
            });
          }

          res.send({
            forecast: forecaseData,
            location,
            address: req.query.address
          });
        });
      }
    );
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must have to provide search term'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Just the Error',
    name: 'Tromesh',
    lastName: 'Mr.Chalodiya',
    errorMessage: 'The page is not found unfortunately'
  });
});

app.listen(port, () => {
  console.log('server is up on port ' + port);
});
