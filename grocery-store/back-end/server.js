const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const crypto = require('crypto');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let products = [];
let id = "";
let cart = [];

app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/cart', (req, res) => {
    res.send(cart);
});

app.get('/api/products/:id', (req, res) => {
   let id = req.params.id;
   let productsMap = products.map(product => {
    return product.id;
  });
  let index = productsMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that product doesn't exist");
    return;
  }
  let product = products[index];
  res.send(product);
});

app.post('/api/products', (req, res) => {
    id = crypto.randomUUID();
    let product = {
        id: id,
        name: req.body.name,
        price: req.body.price
    };
    products.push(product);
    res.send(product);
});

app.delete('/api/products/:id', (req, res) => {
    let id = req.params.id;
    products = products.filter(product => product.id != id);
    res.send(products);
});

app.post('/api/cart/:id', (req, res) =>{
    let id = req.params.id;
    const product = products.find(product => product.id === id);
    if(product === null){
        res.status(404).send("Sorry, that product doesn't exist");
    }
    let cartItem = {id: product.id, quantity: 1};
    let item = cart.find(item => item.id === cartItem.id);
    if(item != null){
        item.quantity = item.quantity + 1;
    }
    else{
        cart.push(cartItem);
    }
    console.log(cart);
    res.send(cart.find(item => item.id === id));
});

app.put('/api/cart/:id/:quantity', (req, res) => {
    let id = req.params.id;
    let quantity = parseInt(req.params.quantity);
    let item = cart.find(item => item.id === id);
    item.quantity = quantity;
    console.log(cart);
    res.send(item);
});

app.delete('/api/cart/:id', (req, res) => {
   let id = req.params.id;
   cart = cart.filter(item => item.id != id);
   console.log(cart);
   res.send(cart);
});

app.listen(3000, () => console.log('Server listening on port 3000!'));