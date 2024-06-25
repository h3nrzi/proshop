import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductQuery } from "../api/products-api";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductDetail from "../components/ProductDetail";
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
        <div className="text-center mt-5">
          <Loader />
        </div>
      ) : productQueryError ? (
        <Message variant="danger">{getErrorMessage(productQueryError)}</Message>
      ) : (
        <ProductDetail product={product!} />
      )}
    </Fragment>
  );
};

export default ProductPage;
