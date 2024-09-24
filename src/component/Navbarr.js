import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navbarr = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">사이트 이름</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">이전기록  </Nav.Link>
          <Nav.Link href="#features">오류신고하기</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navbarr;
