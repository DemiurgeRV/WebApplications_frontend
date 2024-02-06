import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
import { Link } from 'react-router-dom';


function Header() {
  return (
    <Navbar expand="lg" className="mynavbar" data-bs-theme="light">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="./filters" className='link'>Фильтры</Link>
            <Link to="/orders" className='link'>Заявка</Link>
            <Link to="/profile" className='link'>Личный кабинет</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;