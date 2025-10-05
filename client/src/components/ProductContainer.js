import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

/* ProductContainer Component
 * This component displays a collection of products in a responsive grid layout.
 * It includes a banner image, a slogan, and a grid of product cards.
 */
function ProductContainer({ products, addToCart }) {
  // Split the products into rows of 3
  const rows = [];
  for (let i = 0; i < products.length; i += 3) {
    rows.push(products.slice(i, i + 3));
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <img src="/images/banner.png" alt="Banner Image" className="img" style={{ width: '350px', height: '350px', marginRight: '10px' }} />
        </Col>
      </Row>

      <Row className="mb-4 text-center">
        <Col>
          <p className="fs-5">ברוכים הבאים ל-"לְך לָך"! החנות שלנו מתמחה במכירת סנדלים, נעלי שטח וכפכפים לשטח. אנו מציעים מגוון רחב של מוצרים איכותיים המיועדים במיוחד לחובבי הטבע והטיולים. כאן תוכלו למצוא את הציוד המתאים ביותר לכל מסלול, ממוצרים קלים ונוחים לטיולים קצרים ועד לציוד עמיד ואמין למסעות ארוכים.</p>
        </Col>
      </Row>

      
      {rows.map((row, rowIndex) => ( 
        <Row key={rowIndex} className="mb-4"> {/* Display products in a 3x3 grid */}
          {row.map((product, colIndex) => (
            <Col xs={12} md={4} key={colIndex}>
              <ProductCard product={product} addToCart={addToCart} /> {/* Render a single product card, passing the product data and addToCart function as props */}
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}

export default ProductContainer;
