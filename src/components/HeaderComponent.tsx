import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function HeaderComponent() {
  const { isLoggedIn, logout } = useContext(AuthContext) as AuthContextProps; // AuthContext에서 isLoggedIn, logout 추출 및 타입 단언

  const handleLogout = () => {
    logout();
    // TODO: 로그아웃 후 페이지 이동 (예: 홈페이지로 리디렉션) 또는 UI 업데이트
    alert('로그아웃 되었습니다.');
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" fixed="top" expand="lg" className="w-100 d-flex justify-content-between px-3">
      <Navbar.Brand href="#home"></Navbar.Brand>
      <Nav className="d-flex flex-row">
        <Nav.Link as={Link} to="/" className="mx-2">Home</Nav.Link>
        <Nav.Link as={Link} to="/features" className="mx-2">Features</Nav.Link>
        <Nav.Link as={Link} to="/pricing" className="mx-2">Pricing</Nav.Link>

        {isLoggedIn ? (
          <Nav.Link onClick={handleLogout} className="mx-2">Logout</Nav.Link>
        ) : (
          <Nav.Link as={Link} to="/login" className="mx-2">Login</Nav.Link>
        )}

      </Nav>
    </Navbar>
  );
}

export default HeaderComponent;