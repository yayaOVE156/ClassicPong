import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { AccessUser } from './UserCtxt';


function LoginPage() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { setUser, user } = AccessUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!username || !password) {
      setError('Both fields are required!');
      return;
    }

    
    
        try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, pwd: password })
    });

    if (response.ok) {
      setSuccess(true);
      setUser(username);
      setUsername('');
      setPassword('');
      setError('');
    } else {
      
      let data = {};
      try {
        data = await response.json();
        setError(data.error || 'LogIn failed: Wrong username or password');
      } catch (e) {
        setError('Login failed: no response from server please try again later');
      }
    }
  } catch (err) {
    
    setError('Random error'+ err.message);
  }
      
      
      
      
  };

  return (
    <>  
   
     <div style={{ backgroundColor: 'white', width: '100%',height:'100%' }}>
        <Container>
            <Row className="p-3 mb-2 ">
                <Col>
                    <h1 style={{ fontWeight: 'bold' }}>Log In</h1>
                </Col>
            </Row>
        </Container>
    </div>



    <Container className="d-flex justify-content-center align-items-top" style={{ marginTop:"10vh" ,minHeight: '50vh' }}>
      <Row >

        <Col >
          <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          margin: '0 auto'
        }}
      >

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Login successful!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label style={{fontWeight:"bold"}}>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label
              style={{paddingTop:"10px",fontWeight:"bold"}}>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button  type="submit" 
            size="lg"
            className="mx-auto"
            style={{ backgroundColor: 'white',marginTop:"15px", color: 'black', border: '1px solid black' }}
            
            >Log In
            </Button>
          </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </>);
}

export default LoginPage;
