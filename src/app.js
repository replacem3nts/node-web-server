const path = require('path');
const express = require('express');
const hbs = require('hbs');
const baseModule = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const pubDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(pubDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Meads Udemy Node Course',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Andrew Meads Udemy Node Course',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Andrew Meads Udemy Node Course',
    helpText: 'Help! I need somebody... Help! Not just anybody...',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    errorMessage: 'Help article not found.',
    name: 'Andrew Meads Udemy Node Course',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    errorMessage: 'Page note found',
    name: 'Andrew Meads Udemy Node Course',
  });
});

app.listen(port, () => {
  console.log('Server started on port' + port);
});
