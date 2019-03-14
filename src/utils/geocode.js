const request = require("request")

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieWFzczI3IiwiYSI6ImNqdDFpaXprMDBzcW00NG52djdreDUwZ2UifQ.JKfHEFpiaBKpMmJQ7TJaFw&limit=1`;

    request({ url, json: true }, (err, res) => {
        if(err) {
            callback("Unable to Access the Weather App", undefined)
        } if(res.body.features.length === 0) {
            callback("Unable to Find Location!, undefined", undefined)
        } else {
            const { center, place_name } = res.body.features[0];
            callback(undefined, { 
                latitude: center[0],
                longitude: center[1],
                location: place_name
            });
        };
    });
};

module.exports = geocode;