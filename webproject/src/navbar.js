import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { AccessUser } from './UserCtxt';

function NavbarComponent() {
    const { user, setUser } = AccessUser();
    return (
        <>  
        <Navbar style={{ backgroundColor: 'white',  borderBottom: '2px solid black' }} sticky="top" variant="light">
            <Container>
                <Navbar.Brand><img src="/pongLogo.png"
                alt="Pong"
                height="40"
                className="d-inline-block align-top"
                /></Navbar.Brand>
                <Nav className="me-auto" style={{fontSize: "1.25rem", fontWeight: "bold", }}>
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                    <Nav.Link as={Link} to="/game">Game</Nav.Link>
                    {user ? (
                        <Dropdown as={Nav.Item} align="end">
                            <Dropdown.Toggle as={Nav.Link} id="user-dropdown" style={{ cursor: 'pointer' }}>
                                {user}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => setUser(null)}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/Reg">Sign Up</Nav.Link>
                        </>
                    )}
                    <Nav.Link as={Link} to="/lb">Leaderboards</Nav.Link>
                    <Nav.Link as={Link} to="/ab">About</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
        </>
    );
}

export default NavbarComponent;
