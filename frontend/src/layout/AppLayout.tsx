import { Container } from "react-bootstrap";
import { Fragment } from "react/jsx-runtime";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HomePage from "../pages/HomePage";

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="my-3">
        <Container>
          <HomePage />
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
