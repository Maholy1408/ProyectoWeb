import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import uleamLOGO from "../../img/logo-v1.png";
import { NavHome } from "../ui/NavHome";

export const Login = () => {
  const [validated, setValidated] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const formRef = useRef(null);
  const error = useRef(null);
  const loginButton = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = formRef.current;
    const isValid = form.checkValidity();

    if (!isValid) {
      setValidated(true);
      return;
    }

    const formData = Object.fromEntries(new FormData(form));
    handleSetLoginButtonStyle("loading");

    handleFetchLoginData(formData)
      .then((data) => handleProcessTheRequest(data))
      .catch((err) => {
        handleSetLoginButtonStyle("loaded");
        console.log(err);
      });
  };

  const handleFetchLoginData = (data) => {
    return new Promise((resolve, reject) => {
      fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/usuarios/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => resolve(data))
        .catch((err) => reject(err));
    });
  };

  const handleSetLoginButtonStyle = (state) => {
    if (state === "loading") {
      loginButton.current.disabled = true;
      loginButton.current.innerHTML = `<span class='spinner-border spinner-border-sm'></span>`;
    } else if (state === "loaded") {
      loginButton.current.disabled = false;
      loginButton.current.innerText = "Iniciar sesión";
    }
  };

  const handleProcessTheRequest = (data) => {
    // Ocultar el spinner en el botón de inicio de sesión
    handleSetLoginButtonStyle("loaded");
    // Si el usuario no existe, se muestra la alerta de error
    if (data.error) {
      setShowError(true);
      // Mostrar el mensaje del error
      error.current.innerText = data.error;
    } else {
      // Si el usuario existe
      setShowError(false); // Se oculta la alerta de error
      // Guardar los datos del usuario en la sesión del navegador
      localStorage.setItem("userData", JSON.stringify(data));
      // Redireccionar a la página principal
      navigate("/askfor");
    }
  };

  return (
    <>
      <div className='h-100'>
        <NavHome />
        <div className='uleamBG py-5'>
          <Container className='d-flex justify-content-center'>
            <div className='text-white p-5 rounded' id='login_form_container'>
              <div className='text-center'>
                <img src={uleamLOGO} alt='logo' className='mb-3' id='login_form_logo' />
                <h1 className='fs-1 fw-bold text-dark'>Iniciar sesión</h1>
              </div>
              <Form
                ref={formRef}
                validated={validated}
                onSubmit={handleSubmit}
                id='login_form'
                noValidate
              >
                <Row>
                  {[
                    {
                      nCols: 12,
                      type: "text",
                      controlId: "nick_usuario",
                      label: "Usuario",
                      pattern: "^[a-zA-Z0-9]{3,30}$",
                      invalid_feedback: "El nombre de usuario debe tener al menos 3 caracteres",
                    },
                    {
                      nCols: 12,
                      type: "password",
                      controlId: "contrasena",
                      label: "Contraseña",
                      pattern: "^[a-zA-Z0-9]{6,30}$",
                      invalid_feedback: "La contraseña debe tener al menos 6 caracteres",
                    },
                  ].map((field) => (
                    <Col xs={field.nCols} key={field.controlId}>
                      <Form.Group className='formRef-label mb-3' controlId={field.controlId}>
                        <Form.Label className='text-dark'>{field.label}</Form.Label>
                        <Form.Control
                          name={field.controlId}
                          required
                          type={field.type}
                          pattern={field.pattern}
                        />
                        <div className='invalid-feedback fst-italic'>{field.invalid_feedback}</div>
                      </Form.Group>
                    </Col>
                  ))}
                  <Col>
                    <Button
                      variant='success'
                      type='submit'
                      size='sm'
                      className='w-100'
                      ref={loginButton}
                    >
                      Iniciar sesión
                    </Button>
                  </Col>
                </Row>
              </Form>
              <Alert
                ref={error}
                variant='danger'
                className={showError ? "mt-3" : "d-none"}
                id='login-error'
              ></Alert>
              <div className='text-center mt-3'>
                <Link to='/recoverpass' className='link-dark me-3'>
                  Recuperar contraseña
                </Link>
                <Link to='/signup' className='link-dark'>
                  Registrarse
                </Link>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
