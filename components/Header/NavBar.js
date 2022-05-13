import { Container, Nav, Navbar } from "react-bootstrap";

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark">
        <Container>
        <Nav className="me-auto">
          <Nav.Link href="#home">Development</Nav.Link>
          <Nav.Link href="#features">Business</Nav.Link>
          <Nav.Link href="#pricing">Finance & Accounting</Nav.Link>
          <Nav.Link href="#features">IT & Software</Nav.Link>
          <Nav.Link href="#features">Office Productivity</Nav.Link>
          <Nav.Link href="#features">Personal Development</Nav.Link>
          <Nav.Link href="#features">Design</Nav.Link>
          <Nav.Link href="#features">Marketing</Nav.Link>
          <Nav.Link href="#features">Health & Fitness</Nav.Link>
        </Nav>
        </Container>
      </Navbar>
    )
}

export default NavBar;