
const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = "https://api.darksky.net/forecast/3d201a9af19edebef85d421875ffa1b6/" + longitude + "," + latitude
    request({ url: url, json: true }, (error, Response) => {
        if (error) {
            callback('Cound not connect to forecast service', undefined)
        } else if (Response.body.error) {
            callback('Could not get forecast for this location', undefined)
        } else {
            callback(undefined, Response.body.daily.data[0].summary+'It is currently '+Response.body.currently.temperature+'. There is a '+Response.body.currently.precipProbability+'% chance of rain.')
        }
    })
}


module.exports = forecast