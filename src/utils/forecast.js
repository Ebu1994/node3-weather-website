const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherbit.io/v2.0/current?lat=' +
        encodeURIComponent(latitude) + '&lon=' + encodeURIComponent(longitude) +
        '&key=f30dde1e6a644dc3ac418de277b9a740' //&include=minutely'
    request({
        url,
        json: true
    }, (error, { body, statusCode }={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (statusCode !== 200) {
            callback('Unable to find location', undefined)
        } else {
            const summery = body.data[0].weather.description
            callback(undefined, summery + ' It is currently ' + body.data[0].temp + ' degress out. There is ' + body.data[0].clouds + ' chance of rain')
        }
    })
}

module.exports = forecast