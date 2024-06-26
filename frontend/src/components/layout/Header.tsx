import { Badge, Container, Image, Nav, Navbar } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import ThemeSwitch from "../ThemeSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Header = () => {
  const { orderItems } = useSelector((s: RootState) => s.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Link to="/" className="text-decoration-none me-auto">
            <Navbar.Brand as="span">
              <Image src={logo} fluid />
              ProShop
            </Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <div className="d-block d-md-none ms-3">
            <ThemeSwitch />
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-md-none m-3"></div>

            {/*Search Box */}
            <div className="flex-grow-1"></div>

            <Nav className="d-md-flex gap-2">
              <Link to="/cart" className="text-decoration-none">
                <Nav.Link as="span">
                  {orderItems.length > 0 && (
                    <Badge pill className="me-1">
                      {orderItems.reduce((acc, item) => acc + item.qty, 0)}
                    </Badge>
                  )}
                  <FaShoppingCart /> Cart{" "}
                </Nav.Link>
              </Link>

              <Link to="/login" className="text-decoration-none">
                <Nav.Link as="span">
                  <FaUser /> Sign In
                </Nav.Link>
              </Link>

              <div className="d-none d-md-block ms-3">
                <ThemeSwitch />
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
