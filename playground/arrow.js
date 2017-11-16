let obj = {
  name:"Mirko",
  sayHi:() => console.log(`hi ${obj.name}`),
  sayHih: function (...arg) {
    console.log(`hih ${this.name}`)
    console.log(arg)
  }
}
obj.sayHi()
obj.sayHih(1,2,3)
