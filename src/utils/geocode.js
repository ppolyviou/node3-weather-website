const request = require('request')



const geocode = (address, callback) => {
    const urlMapbox = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicHBvbHl2aW91ODkiLCJhIjoiY2s4MGRzNmp6MGRwdDNnbXdhejA1cnczMiJ9.SlURt6nFFYQxzzbfc0oQSw&limit=1"

    request({ url: urlMapbox, json: true }, (error, Response) => {
        if (error) {
            callback('Cannot connect to location services.', undefined)
        } else if (Response.body.features.length === 0) {
            callback('Location cannot be found', undefined)
        } else {
            callback(undefined, {
                latitude : Response.body.features[0].center[1],
                longitude : Response.body.features[0].center[0],
                location: Response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode