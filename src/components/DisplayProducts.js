import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const DisplayProduct = () => {
  const [products, setProducts] = useState([]); // Fixed state variable name
  const [error, setError] = useState(null); // Added error state
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array to run only once on mount

  if (loading) {
    return (
      <div>
        <h2>Product List</h2>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <h2>Product List</h2>

      {error && <p>{error}</p>}

      <Row>
        {products.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card style={{ margin: '10px' }}>
              <Card.Body>
                <Card.Title>{product.productname}</Card.Title> {/* Ensure this matches the backend */}
                <Card.Text>
                  Quantity: {product.quantity}, Price: ${product.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DisplayProduct;
