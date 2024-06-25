import { Col, Row } from "react-bootstrap";
import { Fragment } from "react/jsx-runtime";
import { useGetAllProductsQuery } from "../api/products-api";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import getErrorMessage from "../utils/getErrorMessage";

const HomePage = () => {
  const { data: products, isLoading: productsQueryLoading, error: productsQueryError } = useGetAllProductsQuery();

  return (
    <Fragment>
      <h1>Latest Products</h1>
      <Row>
        {productsQueryLoading ? (
          <Fragment>
            {Array.from({ length: 8 }).map((_, i) => (
              <Col sm={12} md={6} lg={4} xl={3} key={i}>
                <ProductCardSkeleton />
              </Col>
            ))}
          </Fragment>
        ) : productsQueryError ? (
          <p className="text-danger">{getErrorMessage(productsQueryError)}</p>
        ) : (
          products?.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <ProductCard product={product} />
            </Col>
          ))
        )}
      </Row>
    </Fragment>
  );
};

export default HomePage;
