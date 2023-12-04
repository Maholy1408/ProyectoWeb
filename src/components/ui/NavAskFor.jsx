import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

export const NavAskFor = () => {
  const navigate = useNavigate();

  // Obtener el pathname de la url
  const pathname = window.location.pathname;

  const handleLogout = () => {
    window.localStorage.removeItem("userData");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <Navbar collapseOnSelect expand='lg' bg='success' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand>
          <Link to='/' id='logo' className='nav-link'>
            Prácticas pre-profesionales
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {/* <Link to='/' id='home' className='nav-link'> */}
            <Link to='/' id='home' className='nav-link'>
              Inicio
            </Link>
            <Link
              to='/perfil'
              id='perfil'
              className={pathname === "/perfil" ? "nav-link active" : "nav-link"}
            >
              Revisar tu perfil
            </Link>
            <Link
              to='/askfor'
              id='solicitar'
              className={pathname === "/askfor" ? "nav-link active" : "nav-link"}
            >
              Solicitar
            </Link>
          </Nav>
          <Nav>
            <Button variant='outline-light' onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
