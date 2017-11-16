const asyncAdd = (a,b) => {
  return new Promise((resolve, reject) => {
    if (typeof a === 'number' && typeof b === 'number') {
      resolve( a + b );
    } else if (typeof a === 'string' && typeof b === 'string'){
      resolve(a.concat(b))
    } else {
      reject("Argument must be number or string")
    }
  })
}

asyncAdd(5,7)
  .then((res) => {
  console.log(`Result of resolve 1: ${res}`)
    return asyncAdd(res, 83)
  })
  .then((res) => {
  console.log(`Result of resolve 2: ${res}`)
  })
  .catch((rej) => {
    console.log(`Result of rejected is : ${rej}`)
  })

/*let somePromises = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('It is resolve')
  },4000)
  setTimeout(() => {
    reject('It is reject')
  },4500)
});

somePromises.then((message) => {
  console.log(message,'from promises')
},(message) => {
  console.log(message, 'from promises')
})*/
