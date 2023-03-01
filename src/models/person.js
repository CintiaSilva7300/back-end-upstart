const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
   name: String,
   email:String,
   password:String,
   age:Number,

   dataHoraRegistro:{
      type: Date,
      default: Date(),
  }

})

module.exports = Person;

