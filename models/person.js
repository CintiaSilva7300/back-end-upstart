const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
   name: String,
   email:String,
   password:String,
   age:Number,
})

module.exports = Person;