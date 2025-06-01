import { Container, Row, Col  } from 'react-bootstrap';

function ab(){
   
       
    return (
        <>
           
            <div style={{ backgroundColor: 'white', width: '100%',height:'100%' }}>
                
                <Container>
                    
                    <Row className="p-3 mb-2 ">
                        <Col>
                            <h1 style={{ fontWeight: 'bold' }}>About</h1>
                        </Col>
                    </Row>
                </Container>
            </div>

           
            <Container className='' >
                
                <Row className="p-5  justify-content-center"  style={{ marginTop: '50px', color:'white',borderColor:'white' }}>
                    <Col sm={4} className='text-center'style={{borderColor:'white'}}>
                        
                        
                        <h2>Classic Pong</h2>
                        
                        <p style={{marginTop: '15px'}}>A simple pong game made with Unity and React.
                            <br /> Made for AAST Web Course by <strong>Yahya Khamis</strong>
                        </p>
                        
                    </Col>
                    
                    
                    
                </Row>
                
            </Container>
        </>
    );
}

export default ab;