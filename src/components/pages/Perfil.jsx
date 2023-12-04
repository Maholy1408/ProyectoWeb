import React, { useRef, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import uleamLOGO from "../../img/logo-v1.png";
import { NavAskFor } from "../ui/NavAskFor";

export const Perfil = () => {
  const formRef = useRef(null);
  const [editData, setEditData] = useState(false);
  const [validated, setValidated] = useState(false);

  // Leer el almacenamiento local para obtener la información del usuario
  let localUserData = JSON.parse(window.localStorage.getItem("userData"));
  // Si no hay datos en el almacenamiento local, se asigna un valor por defecto
  if (localUserData === null) {
    localUserData = {
      nombre_usuario: "Nombre de usuario",
      correo_usuario: "Correo electrónico",
    };
  }

  const handleToggleFieldsState = () => {
    setEditData(!editData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = Object.fromEntries(new FormData(form));
      console.log(formData);
      handleUpdateUsuario(formData, localUserData.id_usuario);
    }
    setValidated(true);
  };

  // Función para actualizar la información del usuario en el almacenamiento local
  const handleUpdateLocalUserInfo = (data) => {
    // Actualizar la información del usuario en el almacenamiento local
    window.localStorage.setItem("userData", JSON.stringify(data));
  };

  // Función para editar un usuario de la base de datos
  const handleUpdateUsuario = (data, id) => {
    const URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/usuarios/${id}`;
    fetch(URL, {
      method: "PUT",
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
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        html: `
            <p class='mb-0'>Usuario
              <b class='text-primary'>${res.usuario.nombre_usuario}</b>
              <br> actualizado correctamente
            </p>`,
      });
      if (res.usuario.id_usuario === localUserData.id_usuario) {
        // Editar la información del en el almacenamiento local
        handleUpdateLocalUserInfo(res.usuario);
        // Deshabilitar los campos del formulario
        handleToggleFieldsState();
        // Quitar la validación del formulario
        setValidated(false);
      }
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
    <>
      <div className='h-100'>
        <NavAskFor />
        <div className='uleamBG py-5'>
          <Container className='d-flex justify-content-center'>
            <div className='text-white p-5 rounded' id='signup_form_container'>
              <img src={uleamLOGO} alt='logo' className='mb-3' id='login_form_logo' />
              <h1 className='fs-1 fw-bold text-dark'>Mi perfil</h1>
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
                      state: editData,
                      controlId: "nombre",
                      label: "Nombre",
                      value: localUserData.nombre_usuario,
                      pattern: "^[a-zA-Zá-źÁ-Ź]{3,30}$",
                      invalid_feedback: "El nombre debe tener al menos 3 caracteres",
                    },
                    {
                      nCols: 12,
                      type: "email",
                      state: editData,
                      controlId: "correo",
                      label: "Correo electrónico",
                      value: localUserData.correo_usuario,
                      pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$",
                      invalid_feedback: "Ingresa una dirección de correo electrónico válida",
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
                          disabled={!field.state}
                          defaultValue={field.value}
                        />
                        <div className='invalid-feedback fst-italic'>{field.invalid_feedback}</div>
                      </Form.Group>
                    </Col>
                  ))}
                  <Col>
                    <Button
                      variant='success'
                      type='button'
                      size='sm'
                      style={{ display: editData ? "none" : "inline-block" }}
                      onClick={handleToggleFieldsState}
                    >
                      Editar perfil
                    </Button>
                    <Button
                      variant='success'
                      type='submit'
                      size='sm'
                      style={{ display: editData ? "inline-block" : "none" }}
                    >
                      Guardar cambios
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
