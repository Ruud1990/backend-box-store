// sk_test_51OQEbZEYWs5KjxdwUq428u3BncbG1ODzGgNgq07BhUD26tQOVXbVdMNgpo5dA4Om1BlLJVK3WC7mFwWdMZUsy0fh00xF4k4aPE

// price_1OQEoiEYWs5Kjxdw2T5vUKKw    ----   box 1

// price_1OQEpyEYWs5KjxdwBqvhxvJQ    ----   box 2

// price_1OQEqmEYWs5KjxdwXZObROum    ----   box 3


// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const API_KEY = process.env.STRIPE_SECRET_KEY_PROD;

// Tu dalszy kod serwera


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_PROD);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: "https://wypakujmnie.pl",
    allowedHeaders: ['Content-Type']
}));
app.use(express.static('dist'));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        });
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "https://wypakujmnie.pl/success",
        cancel_url: "https://wypakujmnie.pl/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});
