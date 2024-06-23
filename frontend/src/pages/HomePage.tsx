import { Fragment } from "react/jsx-runtime";
import products from "../products";
import { Col, Row } from "react-bootstrap";
import ProductCard from "../components/common/ProductCard";

const HomePage = () => {
  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default HomePage;
