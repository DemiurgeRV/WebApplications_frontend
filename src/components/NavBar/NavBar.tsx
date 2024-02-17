import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logoutUser } from "../../store/slice/LoginSlice"
import Cookies from 'js-cookie';


function Header() {
  const login = localStorage.getItem('login')
  const session = Cookies.get('session_id')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const logout = async () => {
    await axios.post('/api/logout/',  {'Cookie': `session_id=${session}`})
    dispatch(logoutUser())
    localStorage.clear()
    navigate('/')
  }

  return (
    <Navbar expand="lg" className="mynavbar" data-bs-theme="light">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="./filters" className='link'>Фильтры</Link>
            <Link to="/orders" className='link'>Заявки</Link>
            <Link to="/profile" className='link'>Личный кабинет</Link>
            { session ? (
                <div style={{position: 'absolute', right: 20}}>
                  <h4>{login} |<button onClick={logout} className="exit">Выйти</button></h4> 
                </div>
              ) : (              
                <Link to="/login" className='link' style={{position: 'absolute', right: 20}}>Войти</Link>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;