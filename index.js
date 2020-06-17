const express = require('express')
const app = express();
const port = 3000;

// make API calls
const fetch = require('node-fetch');

// Serve up static files
app.use(express.static('public'));

// Serve up dotenv files
require('dotenv').config()

// for reading objectId's saved as a string
const { ObjectId } = require('mongodb')

// bring in the db and initialise it
const database = require('./mongoObj')
database.init();

// read forms sent from the client to the server
const bodyParser = require("body-parser")

// let our app use body parser
app.use(bodyParser.json())

// This is how you add data to MongoDBInstance
app.post('/addPriceInfo', async (req, res) => {
  // unpack the body of the request
  const { fromOSMId, fromPolygon, toOSMId, toPolygon, price } = req.body
  // const { fromOSMId, fromPolygon, toOSMId, toPolygon, price } = req.body
  // Send data to mongodb, then to the db collection called 'locationNotes'
  database.priceInfo.insertOne({ fromOSMId, fromPolygon, toOSMId, toPolygon, price })
  console.log("Pricing information has been successfully added to mongodb, well done");
})

// This lets us know that we are active and which port we are accessing
app.listen(process.env.PORT || 4000)
