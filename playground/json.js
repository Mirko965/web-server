let jsObj = {
  'name':'Mirko',
  'lastName':'Jelic'
}
console.log(jsObj)

let jsonObj= JSON.stringify(jsObj)
console.log(jsonObj)



function replacer (key,value) {
  if (typeof value === 'string'){
    return undefined
  }
  return value
}
let foo = {foundation: 'Mozilla', model: 'box', week: 45, transport: 'car', month: 7}
let jsonOb = JSON.stringify(foo,replacer)
console.log(jsonOb)
