import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../App.css';

/*ProductCard Component
 * This component displays an individual product with its image, name, description, and price.
 * It also includes a button to add the product to the cart.
 */
function ProductCard({ product, addToCart }) {
  return (
    <Card className="m-3">
       <Card.Img variant="top" src={product.image} style={{ width: '80%', height: 'auto' }} />
      <Card.Body>
        <Card.Title className="text-primary fs-5">{product.name}</Card.Title>
        <Card.Text className="fs-6">{product.description}</Card.Text>
        <Card.Text className="fs-6">₪{product.price}</Card.Text>
        <Button variant="primary" onClick={() => addToCart(product)} size="sm" className="fs-6">הוסף לעגלה</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
