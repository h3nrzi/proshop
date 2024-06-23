import { Card } from "react-bootstrap";
import Product from "../../types/Product";
import { FC } from "react";

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`product/${product._id}`} className=" text-decoration-none">
        <Card.Img src={product.image} variant="top" />
        <Card.Body>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </a>
    </Card>
  );
};

export default ProductCard;
