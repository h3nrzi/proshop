import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Product from "../types/Product";

const ProductPage = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState<Product>({} as Product);

  useEffect(() => {
    axios.get<Product>(`/api/products/${productId}`).then((res) => setProduct(res.data));
  }, [productId]);

  return (
    <Fragment>
      <Link to="/" className="btn btn-primary my-3 text-decoration-none">
        Go Back
      </Link>
      <Row className="gap-5 gap-md-0">
        <Col md={5}>
          <Image src={product.image} alt={product.image} fluid />
        </Col>

        {/* Product Details */}
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="text-center">
                <Button disabled={product.countInStock === 0} className="px-3">
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProductPage;
