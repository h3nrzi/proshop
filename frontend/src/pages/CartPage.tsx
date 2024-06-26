import { Card, Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../app/cart-slice";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import Message from "../components/Message";
import { RootState } from "../store";
import Product from "../types/Product";

const CartPage = () => {
  const dispatch = useDispatch();
  const orderItems = useSelector((s: RootState) => s.cart.orderItems);

  const addToCartHandler = (item: Product, qty: number) => {
    dispatch(addToCart({ ...item, qty }));
    toast.success("Quantity updated successfully.", { position: "top-center" });
  };

  return (
    <Row>
      <Col md={8}>
        <h1 className="mb-5">Shopping Cart</h1>
        {orderItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {orderItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <CartItem item={item} onAddToCart={addToCartHandler} onRemoveFromCart={() => {}} />
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <CartSummary orderItems={orderItems} onCheckout={() => {}} />
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
