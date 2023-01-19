const mongoose = require('mongoose');
const config = require('../config/dbconfig')
// mongoose.connect('mongodb://localhost:27017/ecomm');
const DB = 'mongodb://vikramp:9224265644v@ac-mnajaxr-shard-00-00.kfqpl32.mongodb.net:27017,ac-mnajaxr-shard-00-01.kfqpl32.mongodb.net:27017,ac-mnajaxr-shard-00-02.kfqpl32.mongodb.net:27017/?ssl=true&replicaSet=atlas-x87sfa-shard-0&authSource=admin&retryWrites=true&w=majority'


mongoose.set('strictQuery', true);
try {
   // console.log('hi')

   mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false, // Don't build indexes
      family: 4 // Use IPv4, skip trying IPv6
   }).then(() => {
      console.log('connection successfully')
      console.log('hi')

   })
      .catch((err) => {
         console.log('no connection', err)
      })

}
catch (err) {
   console.log(err)
}



