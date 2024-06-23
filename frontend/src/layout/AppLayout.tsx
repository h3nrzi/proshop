import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="my-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
