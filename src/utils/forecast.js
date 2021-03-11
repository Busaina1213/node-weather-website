const request = require("request");
const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=d69a734e06c051b6c8f8e5beb04450c3&query=" +
    address;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("some error occured", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        `The temperature right now is ${body.current.temperature} degrees out and there are ${body.current.precip}% chances of rain! & the weather is ${body.current.weather_descriptions}`,
        `${body.current.weather_icons}`
      );
    }
  });
};

module.exports = forecast;
