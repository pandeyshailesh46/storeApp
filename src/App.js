import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./component/products/ProductList";
import {Container, Row, Col} from "react-bootstrap";
function App() {
  return (
    <>
     <div className="App">
        <Container fluid>
          <Row>
            <Col>
                <h1 className="text-center pt-3 pb-3">Store App</h1>
            </Col>
          </Row>
          <Row>
            <ProductList />
          </Row>
        </Container>
      </div>
    </>
  );
}

export default App;
