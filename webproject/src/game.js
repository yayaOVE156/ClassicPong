
import { Container, Row, Col } from 'react-bootstrap';
import { Unity, useUnityContext } from 'react-unity-webgl';  
import  { useEffect,useState } from 'react';
import { AccessUser } from './UserCtxt';





function Game() {

  const [scoreJS, setScoreJS] = useState(0);
  const { user, setUser } = AccessUser();


  const sendScoreToBackend = async (score) => {
    try {
      const response = await fetch('/updateScore', {
         method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: user, score: scoreJS })
      });
      if (!response.ok) {
        throw new Error('Failed to send score');
      }
      
    } catch (error) {
      console.error('Error sending score:', error);
    }
  };
  
 window.SendResultToJS = function (score) {
  console.log("Received from Unity:", score);
  setScoreJS(score);
  sendScoreToBackend(score);
};

  const { unityProvider,unload } = useUnityContext({
    loaderUrl: `/Build/build1.loader.js`,
    dataUrl: `/Build/build1.data`,
    frameworkUrl: `/Build/build1.framework.js`,
    codeUrl: `/Build/build1.wasm`,
  });

  useEffect(() => {
    return () => {
      if (unload) {
        


        unload().catch(() => {});
        
      }
    };
  }, [unload]);



  console.log("the score is: ", scoreJS);
  return (
    <>
      
      <div style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
        <Container>
          <Row className="p-3 mb-2">
            <Col>
              <h1 style={{ fontWeight: 'bold' }}>Classic Pong</h1>
            </Col>
          </Row>
        </Container>
      </div>

      <div>
        
        
          <Unity unityProvider={unityProvider} style={{backgroundColor:'#111', width: '100%', height: '100vh' }} />
        
        
      </div>
    </>
  );
}

export default Game;
