const express = require('express');
const app = express();
require('./db_connection/connect');
const User = require('./schema/userSchema');
const ProductSchema = require('./schema/productsSchema');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const JWTSECRETKEY = "secret"



app.use(express.json())
app.use(cors())

// const data = User.find();
// console.log(data)



// app.get('/getData', async (req, resp) => {
//    let data = await User.find()
//    console.log(data);
// })

app.post("/signup", async (req, resp) => {

   console.log('======>', req.body)
   let email = {
      email: req.body.email
   }

   let user = await User.findOne(email);
   console.log(user)
   if (user) {
      resp.send({ result: "User already exist", success: false });
   }
   else {
      let data = new User(req.body);
      data = await data.save()
      console.log('==>>>>>>>>', data)

      resp.send({ result: "success", success: true });
   }
})


app.post("/login", async (req, resp) => {
   console.log(req.body)

   if (req.body.email && req.body.password) {
      let user = await User.findOne(req.body).select("-password");
      console.log(user, '<<<<<')
      if (user !== null) {
         const token = jwt.sign({ user }, JWTSECRETKEY)
         resp.send({ success: true, result: "user found", body: user, token: token })

      }
      else {
         resp.send({ success: false, result: "user not found" })

      }
   }
   else {
      resp.send({ result: "user not found" })
   }


})

app.post('/add-product', async (req, resp) => {

   const responseResult = {};
   console.log(req.body);


   let data = await ProductSchema.findOne(req.body);
   console.log(data);
   if (data) {
      responseResult.success = false;
      responseResult.message = 'record already exist';
   }

   else {
      let product = new ProductSchema(req.body)
      let result = await product.save();
      responseResult.sucess = true;
      responseResult.message = 'record successfully created';
   }
   return resp.status(201).send(responseResult)
})


app.get('/get-data', verifyToken, async (req, resp) => {
   const responseResult = {};

   let data = await ProductSchema.find();
   console.log(data)

   if (data.length > 0) {
      responseResult.success = true;
      responseResult.data = { data }
      // resp.setHeader("Content-Type", "application/json");
   }
   else {
      responseResult.success = false;
      responseResult.data = {};
   }
   return resp.status(201).send({ data });

})

function verifyToken(req, resp, next) {
   let token = req.headers['authorization'];
   if (token) {
      token = token.split(' ')[1];
      console.log(token);
      jwt.verify(token, JWTSECRETKEY, (err, valid) => {
         if (err) {
            console.log(err, '>>>')
            resp.status(401).send({ result: "Please provide valid token" })
         }
         else {
            console.log(valid);
            next();
         }

      })
   }
   else {
      resp.status(401).send({ result: "Access Denied" })
   }

}


app.delete('/delete/:id', async (req, resp) => {
   let data = await ProductSchema.deleteOne({ _id: req.params.id })
   console.log(data)
   resp.send(data)
})



app.get('/one-product/:id', async (req, resp) => {
   const responseResult = {};
   let id = req.params.id


   try {
      let data = await ProductSchema.findOne({ _id: id })
      console.log(data)
      if (data) {
         responseResult.success = true;
         responseResult.data = { data }
      }
      else {
         resp.send('no data found')

      }
      return resp.status(201).send({ data });
   }
   catch (err) {
      console.log('error', err);
   }

})


app.put('/update/:id', async (req, resp) => {

   let id = req.params.id;

   let data = await ProductSchema.updateOne({
      _id: id
   }, {
      $set: req.body
   })

   resp.send(data)


})




app.listen(4000)