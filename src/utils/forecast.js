/* const dotenv = require(`dotenv`);
const weatherKey = process.env.WEATHER_API_KEY || dotenv.config().parsed.WEATHER_API_KEY; */
const request = require(`request`);

const forecast = (latitude, longitude, callback) => {

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&&appid=7473466402f6884ced59c4ff638e937d`;

    request({ url, json: true}, (error, { body }) => {
       if(error) {
            callback(`unable to connect to weather services`, undefined);
       } else if(body.error) {
            callback(`unable to connect to location services`, undefined);
        } else {
            callback(undefined,`${body.current.weather[0].description}, it is currently ${body.current.temp} degrees out. there is ${body.current.humidity} deg of humidity`);
        }
   });
}

module.exports = forecast;

