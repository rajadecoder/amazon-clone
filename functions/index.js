const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response, request } = require("express");
const stripe = require("stripe")

('pk_test_51IqNrgSCHKvhxqmO7hCdhFXSbr0Vc7Mm7uHNhSRkuPm2I5zNl4R2kYwEgW2opSBg1EZgcBL1lNJfWUL8VMS3YYOf00MNBwvVtG'
)

// api

// app config
const app = express();
// middleware
app.use(cors({origin : true}));
app.use(express.json());
// api roots

app.get('/', (request,response) => response.status(200).send('hello world'))
//app.get('/rk', (request,response) => response.status(200).send('hello RK :)'))

app.post('payments/create', async (request,response) =>{
    const total = request.query.total;
    console.log('payment is recieved of amount', total )

    const paymentIntent = await stripe.paymentIntents.Create({
        amount : total,   // subunit of currency 
        currency: "USD",
    });

    // ok
    response.status(201).send({
        clientSecret: paymentIntent.client_secret, 
    })

})

// listen command
exports.api = functions.https.onRequest(app)

// (http://localhost:5001/clone-54d6d/us-central1/api).