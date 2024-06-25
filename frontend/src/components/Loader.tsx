import { Spinner } from "react-bootstrap";

const Loader = ({ size }: { size?: "sm" }) => {
  return <Spinner animation="border" role="status" size={size} />;
};

export default Loader;
