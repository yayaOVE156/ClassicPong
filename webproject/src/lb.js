import { use } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import  { useState, useEffect } from 'react';
import { AccessUser } from './UserCtxt';




function Lb(){


    const [players, setPlayers] = useState([]);
  const { setUser, user } = AccessUser(); 

    useEffect(() => {
      fetch('/leaderboard')
        .then(res => res.json())
        .then(data => setPlayers(data))
        .catch(err => console.error('Failed to fetch leaderboard:', err));

    },[]);

    return(
    <>
    
    
         <div style={{ backgroundColor: 'white', width: '100%',height:'100%' }}>
                <Container>
                    <Row className="p-3 mb-2 ">
                        <Col>
                            <h1 style={{ fontWeight: 'bold' }}>Leaderboard</h1>
                        </Col>
                    </Row>
                </Container>
            </div>


            <Container className="mt-5">
      
      <Table className="custom-table"  striped responsive hover >
        <thead>
          <tr>
            <th>Ranking</th>
            <th>Player</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((playa, index) => (

            <tr
              key={index}
              className={
                user && (playa.user === user?.username || playa.user === user)? 'highlight-row': ''}>
                          <td>{index + 1}</td>
                          <td >{playa.user}</td>
                          <td>{playa.score}</td>
                        </tr>
          ))}
        </tbody>
      </Table>
    </Container>
       
    </>
    )
    
}

export default Lb;