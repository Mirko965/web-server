const request = require('request');

const geocodeAddress = (addr) => {

  return new Promise((resolve, reject) => {
    const encodeAddress = encodeURIComponent(addr);
    const address = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}`

    request({
      url: address ,
      json: true
    }, (error, response, body) => {
      if (body.status === 'OK') {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      } else if (body.status === 'ZERO_RESULTS') {
        resolve(`Unable to find that address`)
      } else if (error) {
        reject(`Unable to connect to Google server`);
      }
    });

  })
}

geocodeAddress('kovinska,beograd')
  .then((res) => {
  console.log(JSON.stringify(res,undefined,2))
  })
  .catch((rej) => {
  console.log(rej)
  })
