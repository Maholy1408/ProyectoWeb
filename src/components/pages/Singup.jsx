import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import { NavHome } from "../ui/NavHome";

export const Singup = () => {
  const formRef = useRef(null);
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = Object.fromEntries(new FormData(form));
      console.log(formData);
      handleAddUsuario(formData);
    }
    setValidated(true);
  };

  // Funcion para añadir un usuario a la base de datos
  const handleAddUsuario = (data) => {
    const URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/usuarios`;
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => handleProcessTheRequest(res))
      .catch((err) => console.error(err));
  };

  // Funcion para procesar las peticiones a la base de datos de un usuario
  const handleProcessTheRequest = (res) => {
    if (res.estado === true) {
      // Mostrar mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        html: `
            <p class='mb-0'>El usuario con el nombre:
              <b class='text-primary'>${res.usuario.nombre_usuario}</b>
              fue <br> añadido correctamente
            </p>`,
      });
      // Borra el contenido del formulario
      formRef.current.reset();
    } else {
      // Mostrar mensaje de error
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: res.error,
      });
    }
  };

  return (
    <div className='h-100'>
      <NavHome />
      <div className='uleamBG py-5'>
        <Container className='d-flex justify-content-center'>
          <div className='text-white p-5 rounded' id='signup_form_container'>
            <h1 className='fs-1 fw-bold text-dark'>Registro</h1>
            <Form
              ref={formRef}
              validated={validated}
              onSubmit={handleSubmit}
              id='signup_form'
              noValidate
            >
              <Row>
                {[
                  {
                    nCols: 6,
                    type: "text",
                    controlId: "nombre",
                    label: "Nombre",
                    pattern: "^[a-zA-Zá-źÁ-Ź]{3,30}$",
                    invalid_feedback: "El nombre debe tener al menos 3 caracteres",
                  },
                  {
                    nCols: 6,
                    type: "text",
                    controlId: "apellido",
                    label: "Apellido",
                    pattern: "^[a-zA-Zá-źÁ-Ź]{3,30}$",
                    invalid_feedback: "El apellido debe tener al menos 3 caracteres",
                  },
                  {
                    nCols: 12,
                    type: "text",
                    controlId: "nick_usuario",
                    label: "Nombre de usuario",
                    pattern: "^[a-zA-Z0-9]{3,30}$",
                    invalid_feedback: "El nombre de usuario debe tener al menos 3 caracteres",
                  },
                  {
                    nCols: 12,
                    type: "email",
                    controlId: "correo",
                    label: "Correo electrónico",
                    pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$",
                    invalid_feedback: "Ingresa una dirección de correo electrónico válida",
                  },
                  {
                    nCols: 12,
                    type: "password",
                    controlId: "contrasena",
                    label: "Contraseña",
                    pattern: "^[a-zA-Z0-9]{6,30}$",
                    invalid_feedback: "La contraseña debe tener al menos 6 caracteres",
                  },
                  {
                    nCols: 12,
                    type: "password",
                    controlId: "confirmar_contrasena",
                    label: "Confirmar Contraseña",
                    pattern: "^[a-zA-Z0-9]{6,30}$",
                    invalid_feedback: "La contraseña debe tener al menos 6 caracteres",
                  },
                ].map((field) => (
                  <Col xs={field.nCols} key={field.controlId}>
                    <Form.Group className='form-label mb-3' controlId={field.controlId}>
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
                <Col xs='12'>
                  <Button
                    variant='success'
                    id='signup_btn'
                    className='px-5'
                    type='submit'
                    size='sm'
                  >
                    Registrarse
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};
