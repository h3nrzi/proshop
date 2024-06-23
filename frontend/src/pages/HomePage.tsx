import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Fragment } from "react/jsx-runtime";
import ProductCard from "../components/ProductCard";
import Product from "../types/Product";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get<Product[]>("/api/products").then((res) => setProducts(res.data));
  }, []);

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
