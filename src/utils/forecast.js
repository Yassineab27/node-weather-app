const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/b8720ef1f0214ac86b73d8a467f01694/${latitude},${longitude}?units=si`;
    request({ url, json: true }, (err, res) => {
        if(err) {
            callback("Unable to Access the Weather App", undefined)
        } if (!res.body.latitude || !res.body.longitude) {
            callback("Unable to Find Location!", undefined)
        } else {
            const { currently, daily } = res.body
            callback(undefined, `${daily.data[0].summary} It is currently ${currently.temperature} degrees out. There is a ${res.body.currently.precipProbability}% chance of rain!
            Humidity: ${daily.data[0].humidity}. Wind Speed: ${daily.data[0].windSpeed}`
            )
        };
    });
};

module.exports = forecast;