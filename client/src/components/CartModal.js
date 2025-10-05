import React, { useState } from 'react';
import { Modal, Button, Table, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';

/**
 * CartModal Component
 * This component represents the modal window for the shopping cart.
 * It displays the list of items in the cart, allows updating quantities, removing items, and proceeding to checkout.
 */
function CartModal({ show, handleClose, cart, updateCart, removeFromCart }) {
  const [showAlert, setShowAlert] = useState(false); // State for showing alert if cart is empty on checkout attempt
  const navigate = useNavigate();
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0); // Calculate total amount in cart

  const quantityChange = (event, productId) => { // Updates the quantity of a specific product in the cart.
    const quantity = parseInt(event.target.value, 10); // Convert the string input to an integer (base 10)
    if (quantity > 0) {
      updateCart(productId, quantity); // Update cart with the new quantity
    }
  };

  const handleCheckout = () => { // Handles the checkout process.
    if (cart.length === 0) { // If the cart is empty, shows an alert.
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Hide the alert after 3 seconds
    } else { // If the cart has items, closes the modal and navigates to the checkout page.
      handleClose();
      navigate('/checkout');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Button variant="close" onClick={handleClose} />
        <Modal.Title className="ms-auto">עגלת קניות</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showAlert && <Alert variant="danger">העגלה ריקה, אנא הוסף מוצרים לעגלה לפני ביצוע הזמנה.</Alert>} {/* Alert if cart is empty (showAlert is true) */}
        {cart.length === 0 ? (
          <p>העגלה ריקה</p>
        ) : (
          <Table responsive striped bordered hover> 
            <thead>
              <tr>
                <th>תמונה</th>
                <th>שם המוצר</th>
                <th>כמות</th>
                <th>מחיר ליחידה</th>
                <th>מחיר כולל</th>
                <th>פעולה</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item._id}>
                  <td><img src={item.image} alt={item.name} style={{ width: '50px' }} /></td>
                  <td>{item.name}</td>
                  <td>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(event) => quantityChange(event, item._id)}
                      min="1"
                    />
                  </td>
                  <td>₪{item.price}</td>
                  <td>₪{item.price * item.quantity}</td>
                  <td>
                    <Button variant="danger" onClick={() => removeFromCart(item._id)}>הסר</Button> {/* Remove item button, calls removeFromCart function on click */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        <div className="text-end">
          <h4>סך הכל: ₪{totalAmount}</h4>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          סגור
        </Button>
        <Button variant="primary" onClick={handleCheckout}> {/* Proceed to checkout button, calls handleCheckout function on click */}
          בצע הזמנה
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
