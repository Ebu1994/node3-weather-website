const request = require('request')

// encodeURIComponent(address) - Convert special chracter like ? become %3f
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWJ1MTk5NCIsImEiOiJja3Jhdm5vd3gxbGM2MnhscDh6MHFzeWs5In0.uTV6kdNJdgZgMJApHBfJRA&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode