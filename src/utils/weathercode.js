const request = require('request');

const weathercode = (latitude, longitude, callback) => {
  const url =
    ' https://api.darksky.net/forecast/73af0d78f4107ebc2fa7cb18e75212fd/' +
    encodeURIComponent(latitude) +
    ',' +
    encodeURIComponent(longitude);

  request({ url, json: true }, (error, response) => {
    const result = response.body.currently;
    console.log('This is the response', response);
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (response.body.daily.length === 0) {
      callback(
        'Unable find the forecast data for the given location.',
        undefined
      );
    } else {
      console.log(response, 'Response');
      callback(
        undefined,
        response.body.daily.data[0].summary +
          `it is current ${result.temperature} degree out. there is ${result.precipProbability}% rain chance.`
      );
    }
  });
};

module.exports = weathercode;
