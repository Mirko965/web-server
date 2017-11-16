const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      alias: 'address',
      demandOption:true,
      describe: "Address to fetch for",
      string: true
    }
  })
  .default({ address: 'Kovinska, Beograd, Serbia' })
  .help()
  .alias('help','h')
  .argv

const encodeAddress = encodeURIComponent(argv.a);
const address = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`;

axios.get(address)
  .then((response) => {

  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address !!!')
  }

    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/3b0ceba96c5814011205a9b93e2c6636/${lat},${lng}`
    console.log(response.data.results[0].formatted_address);

    return axios.get(weatherUrl)
})
  .then((response) => {
    const temp = Math.floor((response.data.currently.temperature - 32)/1.8)
    const apparentTemperature = Math.floor((response.data.currently.apparentTemperature - 32)/1.8)
    console.log(`
      Temperature: ${temp}\u{2103}C
      Real Feel: ${apparentTemperature}\u{2103}C 
      Wind: ${response.data.currently.windSpeed} m/s 
      Pressure: ${response.data.currently.pressure} mbar
    `)
  })
  .catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect to API servers')
  } else {
    console.log(e.message)
  }
  })



