const request = require('request');

const getWeather = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/3b0ceba96c5814011205a9b93e2c6636/${lat},${lng}`
  request({
    url,
    json: true
  }, (error,response,body) => {
    if (error){
      callback(`Can't connect to server`)
    } else if (body.code === 400){
      callback("The given location (or time) is invalid.")
    } else {
      const temp = Math.floor((body.currently.temperature - 32)/1.8)
      const apparentTemperature = Math.floor((body.currently.apparentTemperature - 32)/1.8)
      callback(undefined,{
        Temperature: temp+'\u{2103}C',
        apparentTemperature: apparentTemperature+'\u{2103}C',
        Wind: body.currently.windSpeed+'m/s',
        Pressure: body.currently.pressure+'mbar'
      })
    }
  })
}

module.exports.getWeather = getWeather;
