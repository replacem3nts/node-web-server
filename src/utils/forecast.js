const postman = require('postman-request');

const WSkey = 'key';

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${WSkey}&query=${latitude},${longitude}&units=f`;

  postman({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback(`Unable to find location`, undefined);
    } else {
      const { temperature, feelslike, weather_descriptions } = body.current;
      const message = `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`;
      callback(undefined, message);
    }
  });
};

module.exports = forecast;
