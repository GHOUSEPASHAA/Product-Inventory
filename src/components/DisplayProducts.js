import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DisplayProducts = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching products');
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
    } catch (error) {
      console.error(error);
      alert('Error deleting product');
    }
  };

  // Increment quantity
  const incrementQuantity = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/products/${productId}/increment`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, quantity: response.data.quantity } : product
        )
      );
    } catch (error) {
      console.error(error);
      alert('Error incrementing quantity');
    }
  };

  // Decrement quantity
  const decrementQuantity = async (productId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/products/${productId}/decrement`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, quantity: response.data.quantity } : product
        )
      );
    } catch (error) {
      console.error(error);
      alert('Error decrementing quantity');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Products</h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by product name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '20px',
              width: '250px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}
          >
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <button onClick={() => incrementQuantity(product.id)}>+</button>
              <button onClick={() => decrementQuantity(product.id)}>-</button>
              <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayProducts;
