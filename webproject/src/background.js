import React, { useRef, useEffect, useState } from 'react';

function Bc({position, setPosition, velocity, setVelocity}) {
  const boxRef = useRef(null);


  useEffect(() => {
    let animationFrameId;

    const updatePosition = () => {
      const box = boxRef.current;
      if (!box) return;

      const container = box.parentNode.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();

      let newX = position.x + velocity.x;
      let newY = position.y + velocity.y;

      
      if (newX + boxRect.width >= container.width || newX <= 0) {
        setVelocity(v => ({ ...v, x: -v.x }));
      }

      
      if (newY + boxRect.height >= container.height || newY <= 0) {
        setVelocity(v => ({ ...v, y: -v.y }));
      }

      setPosition(pos => ({
        x: pos.x + velocity.x,
        y: pos.y + velocity.y,
      }));

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, [position, velocity,setPosition, setVelocity]);

  return (
    <div style={styles.container}>
      <div
        ref={boxRef}
        style={{...styles.box,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
    </div>
  );
}

const styles = {
  container: {
    opacity: 1.5,
    backgroundColor: '#111',
    width: '100vw',
    height: '85vh', 
    position: 'fixed',
    top: '140px',
    left: 0,
    zIndex: -1,
    overflow: 'hidden',
  },
  box: {
    width: '50px',
    height: '50px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    position: 'absolute',
  },
};

export default Bc;
