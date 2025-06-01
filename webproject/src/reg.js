import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { AccessUser } from './UserCtxt';


function Regpage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { setUser, user } = AccessUser(); 
  

  const validatePassword = password => {
    const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return regex.test(password);
  };

  const validateUsername = username => {
    const regex = /^[a-zA-Z0-9]{3,}$/; 
    return regex.test(username);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    
    if (!username || !password || !rpassword) {
      setError('All fields are required!');
      return;
    }


    if (!validateUsername(username)) {
      setError('Username must be at least 3 characters long and can only contain letters and numbers.');
      return;
    }
    
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, contain at least one digit, one lowercase letter, and one uppercase letter.');
      return;
    }

    
    if (password !== rpassword) {
      setError('Passwords do not match!');
      return;
    }

    
    

    try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, pwd: password })
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess(true);
      setUser(username);

      setUsername('');
      setPassword('');
      setRPassword('');
      setError('');
      
    } else {
      let data ={};
      try{
        data = await response.json();
        setError(data.error || 'Registration failed');
      }catch (e) {
        setError('Registration failed: no response from server please try again later');
      }
      
    }
  } catch (err) {
    setError('idk! random error: ' + err.message);
  }
  
  
  };

  return (
    <>
    
      <div style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
        <Container>
          <Row className="p-3 mb-2">
            <Col>
              <h1 style={{ fontWeight: 'bold' }}>Sign Up</h1>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="d-flex justify-content-center align-items-top" style={{ marginTop: "10vh", minHeight: '50vh' }}>
        <Row>
          <Col>
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
              {success && <Alert variant="success">Registration successful!</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label style={{ fontWeight: "bold" }}>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label style={{ paddingTop: "10px", fontWeight: "bold" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    
                  />
                  
                </Form.Group>

                <Form.Group controlId="formRPassword" style={{ marginTop: "10px" }}>
                  <Form.Control
                    type="password"
                    placeholder="Re-enter Your Password"
                    value={rpassword}
                    onChange={(e) => setRPassword(e.target.value)}
                    required
                    isInvalid={rpassword !== password && rpassword.length > 0}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  size="lg"
                  className="mx-auto"
                  style={{ backgroundColor: 'white', marginTop: "15px", color: 'black', border: '1px solid black' }}
                >
                  Sign Up
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Regpage;
