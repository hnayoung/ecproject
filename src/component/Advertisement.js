import React from 'react';
import { Card } from 'react-bootstrap';

const Advertisement = () => {
  return (
    <Card className="mb-4" style={{ width: '100%' }}>
      <Card.Img variant="top" src="https://via.placeholder.com/600x50" alt="Advertisement" />
    </Card>
  );
};

export default Advertisement;
