import { Container } from "react-bootstrap";
import { Fragment } from "react/jsx-runtime";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="my-3">
        <Container>
          <h1>Hello!</h1>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
};

export default App;
