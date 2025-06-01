import { Container, Row, Col  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function Homepage() {
    const navigate = useNavigate();
    return (
        <>
           
            <div style={{ backgroundColor: 'white', width: '100%',height:'100%' }}>
                
                <Container>
                    
                    <Row className="p-3 mb-2 ">
                        <Col>
                            <h1 style={{ fontWeight: 'bold' }}>Welcome to Classic Pong!</h1>
                        </Col>
                    </Row>
                </Container>
            </div>

           
            <Container >
                
                <Row className="p-5 align-items-center"  style={{ marginTop: '50px', color:'white',borderColor:'white' }}>
                    <Col sm={4} className='me-auto'style={{borderColor:'white'}}>
                        <h2>How to Play</h2>
                        
                        <p style={{marginTop: '15px'}}>Use <strong>arrowkeys</strong> or <strong>W</strong> and <strong>S</strong> to move your paddle up and down!</p>
                        
                    </Col>
                    
                    <Col sm={4} className='ms-auto'>
                        <video width="400" height="300" autoPlay loop muted>
                            <source src="/bread.mp4" type="video/mp4" />
                            Video Not found! Imagine there is a gameplay video here.!
                        </video>
                    </Col>
                    
                </Row>
                <Row>
                <Col className="text-center">
                    <Button
                    onClick={() => navigate('/game')}
                    size="lg"
                    className="mx-auto"
                    style={{ backgroundColor: 'white', color: 'black', border: '1px solid black' }}
                        >
                    Play Now
                     </Button>
                </Col>
                
                </Row>
            </Container>
        </>
    );
}

export default Homepage;
