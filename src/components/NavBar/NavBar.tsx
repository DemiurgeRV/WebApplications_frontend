import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'


function Header() {
  return (
    <Navbar expand="lg" className="mynavbar" data-bs-theme="light">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/filters">Фильтры</Nav.Link>
            <Nav.Link href="/orders">Заявка</Nav.Link>
            <Nav.Link href="/profile">Личный кабинет</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;