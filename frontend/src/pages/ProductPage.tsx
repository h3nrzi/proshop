import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../api/products-api";
import Message from "../components/Message";
import ProductDetail from "../components/ProductDetail";
import ProductDetailPlaceholder from "../components/ProductDetailSkeleton";
import getErrorMessage from "../utils/getErrorMessage";

const ProductPage = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading: productQueryLoading,
    error: productQueryError,
  } = useGetProductQuery({ productId: productId! });

  return (
    <Fragment>
      <Link to="/" className="btn btn-primary my-3 text-decoration-none">
        Go Back
      </Link>
      {productQueryLoading ? (
        <ProductDetailPlaceholder />
      ) : productQueryError ? (
        <Message variant="danger">{getErrorMessage(productQueryError)}</Message>
      ) : (
        <ProductDetail product={product!} />
      )}
    </Fragment>
  );
};

export default ProductPage;
