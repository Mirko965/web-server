/*let fn = (id, callback) => {
  let user = {
    id,
    name:"Mirko"
  }
  setTimeout(() => {
    callback(user)
  },3000)

}

fn(34, (userName) => {
  console.log(userName)
})*/

let address = 'kovinska 18 d beograd'
let encode = encodeURIComponent(address)
console.log(encode)

let decode = decodeURIComponent('1301%20lombard%20street%20philadelphia')
console.log(decode)
//https://maps.googleapis.com/maps/api/geocode/json?address=kovinska%2018%20d%20beograd

