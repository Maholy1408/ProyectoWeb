import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

export const NavHome = () => {
  const navigate = useNavigate();

  // Recuperar el usuario del local storage
  const localUserData = JSON.parse(localStorage.getItem("userData"));

  const handleLogout = () => {
    window.localStorage.removeItem("userData");
    navigate("/");
  };

  const userOptionsClassNames = localUserData ? "nav-link" : "nav-link disabled";

  return (
    <Navbar collapseOnSelect expand='lg' bg='success' data-bs-theme='dark'>
      <Container>
        <Navbar.Brand>
          <Link to='/' id='logo' className='nav-link'>
            Sistema PPP
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Link to='/' id='home' className='nav-link'>
              Inicio
            </Link>
            {/* Si el usuario existe las opciones de revisar el perfil y solicitar prácticas
             * se muestran habilitadas, de lo contrario se muestran deshabilitadas */}
            <Link to='/perfil' id='perfil' className={userOptionsClassNames}>
              Revisar tu perfil
            </Link>
            <Link to='/askfor' id='solicitar' className={userOptionsClassNames}>
              Solicitar
            </Link>
          </Nav>
          {/* si el usuario no existe se muestran los datos de registro */}
          {localUserData ? (
            <Nav>
              <Button variant='outline-light' onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </Nav>
          ) : (
            <Nav className='gap-2'>
              {/* <Link to='/login' id='login' className='nav-link'>
                Iniciar sesión
              </Link> */}
              <Link to='/login' id='login' className='btn link'>
                Iniciar sesión
              </Link>
              <Link to='/signup' id='signup' className='btn btn-outline-light'>
                Regístrate
              </Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
