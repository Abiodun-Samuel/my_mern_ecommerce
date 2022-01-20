import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Lorem ipsum dolor sit amet.</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
