import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProductQuery } from "../api/products-api";
import { addToCart } from "../app/cart-slice";
import Message from "../components/Message";
import ProductDetail from "../components/ProductDetail";
import ProductDetailPlaceholder from "../components/ProductDetailSkeleton";
import getErrorMessage from "../utils/getErrorMessage";

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading: productQueryLoading,
    error: productQueryError,
  } = useGetProductQuery({ productId: productId! });

  function addToCartHandler(qty: number) {
    dispatch(addToCart({ ...product!, qty }));
    toast.success("Added to your cart", {
      onClick: () => navigate("/cart"),
      position: "top-center",
      style: { cursor: "pointer" },
    });
  }

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
        <ProductDetail product={product!} addToCartHandler={addToCartHandler} />
      )}
    </Fragment>
  );
};

export default ProductPage;
