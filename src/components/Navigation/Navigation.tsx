import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="/assets/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          My Teams
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar">
          <Nav>
            <Nav.Link as={Link} to="/">
              Teams
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
