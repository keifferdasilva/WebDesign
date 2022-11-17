import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] =useState(0.00);
  const [cart, setCart] = useState([]);
  
  const fetchProducts = async() => {
    try{
      const response = await axios.get("/api/products");
      setProducts(response.data);
    }
    catch(error){
      setError("error retrieving products: " + error);
    }
  };
  
  const fetchCart = async() => {
    try{
      const response = await axios.get("/api/cart");
      setCart(response.data);
    }
    catch(error){
      setError("error retrieving cart: " + error);
    }
  };
  
  const createProduct = async() => {
    try{
      await axios.post("/api/products", {name: name, price: price});
    }
    catch(error){
      setError("Error adding a product: " + error);
    }
  };
  
  const deleteOneProduct = async(product) => {
    try{
      await axios.delete("/api/products/" + product.id);
    }
    catch(error){
      setError("Error deleting a product: " + error);
    }
  };
  
  const updateItem = async(id, quantity) => {
    try{
      await axios.put("/api/cart/" + id + "/" + quantity);
    }
    catch(error){
      setError("Error decrementing # of item in cart: " + error);
    }
  };
  
  useEffect(() => {
    fetchProducts();
    fetchCart();
  },[]);
  
  const addProduct = async(e) => {
    e.preventDefault();
    await createProduct();
    fetchProducts();
    setName("");
    setPrice(0.00);
  };
  
  const addOneToCart = async(product) => {
    try{
      await axios.post("/api/cart/" + product.id);
    }
    catch(error){
      setError("Error adding to cart: " + error);
    }
  };
  
  const removeFromCart = async(id) => {
    try{
      await axios.delete("/api/cart/" + id);
    }
    catch(error){
      setError("Error deleting from cart: " + error);
    }
  };
  
  const deleteProduct = async(product) => {
    await deleteOneProduct(product);
    fetchProducts();
  };
  
  const addToCart = async(product) => {
    await addOneToCart(product);
    fetchCart();
  };
  
  const decrementQuantity = async(item) => {
    let quantity = item.quantity - 1;
    let id = item.id;
    await updateItem(id, quantity);
    fetchCart();
  };
  
  const incrementQuantity = async(item) => {
    let quantity = item.quantity + 1;
    let id = item.id;
    await updateItem(id, quantity);
    fetchCart();
  };
  
  const removeItem = async(item) => {
    let id = item.id;
    await removeFromCart(id);
    fetchCart();
  };
  
  
  return (
    <div className="App">
    {error}
      
      <h1>Products</h1>
      
      {products.map(product => (
        <div key={product.id} className="Product">
            <p>{product.name}, {product.price} <button onClick={e => addToCart(product)}>Add to Cart</button></p>
        </div>
      ))}
      
      <h1>Cart</h1>
      {cart.map(item => (
        <div className="Item">
            <p>{products.find(product => product.id === item.id).name}, {item.quantity} <button onClick={e => decrementQuantity(item)}>-</button><button onClick={e => incrementQuantity(item)}>+</button><button onClick={e => removeItem(item)}>Remove from cart</button></p>
        </div>
      ))}
    </div>
  );
}

export default App;
