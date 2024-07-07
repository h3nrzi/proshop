import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetProductQuery } from "../api/products-api";
import { addToCart } from "../app/cart-slice";
import Message from "../components/common/Message";
import ProductDetail from "../components/ProductDetail";
import ProductDetailPlaceholder from "../components/ProductDetailSkeleton";
import { RootState } from "../store";
import getErrorMessage from "../utils/getErrorMessage";

const ProductPage = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { orderItems } = useSelector((state: RootState) => state.cart);
  const existingCartItem = orderItems.find((item) => item._id === productId);

  const {
    data: product,
    isLoading: productQueryLoading,
    error: productQueryError,
  } = useGetProductQuery({ productId });

  function addToCartHandler(qty: number) {
    if (existingCartItem && existingCartItem.qty === qty)
      return toast.warn("Product already added!", { position: "top-center" });

    if (existingCartItem && existingCartItem.qty !== qty) {
      dispatch(addToCart({ ...product!, qty }));
      return toast.success("Quantity updated successfully.", {
        onClick: () => navigate("/cart"),
        position: "top-center",
        style: { cursor: "pointer" },
      });
    }

    dispatch(addToCart({ ...product!, qty }));
    return toast.success("Product Added to your cart.", {
      onClick: () => navigate("/cart"),
      position: "top-center",
      style: { cursor: "pointer" },
    });
  }

  return (
    <Fragment>
      {productQueryLoading ? (
        <ProductDetailPlaceholder />
      ) : productQueryError ? (
        <Message variant="danger">{getErrorMessage(productQueryError)}</Message>
      ) : (
        <ProductDetail product={product!} onAddToCart={addToCartHandler} />
      )}
    </Fragment>
  );
};

export default ProductPage;
