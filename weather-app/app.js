const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      alias: 'address',
      demandOption:true,
      describe: "Address to fetch for",
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv

geocode.geocodeAddress(argv.a, (error,result) => {
  if (error) {
    console.log(error)
  } else {
    weather.getWeather(result.latitude,result.longitude, (error, weatherResult) => {
      if (error) {
        console.log(error)
      } else {
        console.log(`
        Address: ${result.address}
        Temperature: ${weatherResult.Temperature}
        Real feel: ${weatherResult.apparentTemperature}
        Wind: ${weatherResult.Wind}
        Pressure: ${weatherResult.Pressure}
        `)
      }
    });
  }
})





