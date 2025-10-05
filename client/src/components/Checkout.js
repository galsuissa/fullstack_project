import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/* Checkout component 
*handles the checkout process, including form validation, order submission, and displaying success or error messages
*/
function Checkout({ cart, setCart }) {
  // Scroll to top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State variables for form fields and messages
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [shipping, setShipping] = useState('רגיל');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Validate form inputs
  const validate = () => {
    let errors = {};
    if (!name) errors.name = 'שדה שם חובה';
    if (!email) {
      errors.email = 'שדה אימייל חובה';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'כתובת אימייל לא תקינה';
    }
    if (!phone) {
      errors.phone = 'שדה טלפון חובה';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'מספר טלפון לא תקין';
    }
    if (!address) errors.address = 'שדה כתובת חובה';
    return errors;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const errors = validate(); // Validate the form fields and collect any errors
    if (Object.keys(errors).length > 0) { // Check if there are any validation errors
      setErrors(errors); // If there are errors, set the errors state
      return;
    }

    // Create order object
    const order = {
      name,
      email,
      phone,
      address,
      shipping,
      items: cart,
      totalAmount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    };

    // Submit order to server
    fetch('http://localhost:3001/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setCart([]);
        setSuccessMessage(`ההזמנה בוצעה בהצלחה! מספר הזמנה: ${data.orderNumber}`);
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setServerError('הייתה בעיה בהגשת ההזמנה. נסה שוב מאוחר יותר.');
      });
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calculate total amount of items in the cart

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={10}>
          <h2 className="text-center my-4">סיכום ההזמנה</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>תמונה</th>
                <th>שם המוצר</th>
                <th>כמות</th>
                <th>מחיר ליחידה</th>
                <th>מחיר כולל</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td><img src={item.image} alt={item.name} style={{ width: '50px' }} /></td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>₪{item.price}</td>
                  <td>₪{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-end">סה"כ</td>
                <td>₪{totalAmount}</td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={5} className="order-form">
          <h2 className="text-center my-4">ביצוע הזמנה</h2>
          {serverError && <Alert variant="danger">{serverError}</Alert>} {/* Display server error if there is one */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>שם:</Form.Label>
              <Form.Control type="text" placeholder="הכנס את שמך" value={name} onChange={(e) => setName(e.target.value)} isInvalid={!!errors.name} />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>אימייל:</Form.Label>
              <Form.Control type="email" placeholder="הכנס את כתובת האימייל שלך" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>טלפון:</Form.Label>
              <Form.Control type="text" placeholder="הכנס את מספר הטלפון שלך" value={phone} onChange={(e) => setPhone(e.target.value)} isInvalid={!!errors.phone} />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>כתובת:</Form.Label>
              <Form.Control type="text" placeholder="הכנס את כתובתך" value={address} onChange={(e) => setAddress(e.target.value)} isInvalid={!!errors.address} />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="shipping">
              <Form.Label>משלוח:</Form.Label>
              <Form.Control as="select" className="form-select" value={shipping} onChange={(e) => setShipping(e.target.value)}>
                <option>רגיל - עד 14 ימי עסקים(חינם)</option>
                <option>מהיר - עד 3 ימי עסקים(50₪)</option>
              </Form.Control>
            </Form.Group>

            <div className="text-center">
              {/* Display success message if there is one */}
              {successMessage && (
                <Row className="justify-content-md-center">
                  <Col md={10}>
                    <Alert variant="success" className="text-center">
                      {successMessage}
                    </Alert>
                  </Col>
                </Row>
              )}
              <Button variant="primary" type="submit">{/* Submit button for placing the order */}
                בצע הזמנה
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
