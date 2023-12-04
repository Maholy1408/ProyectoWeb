import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

import { NavHome } from "../ui/NavHome";

export const RecoverPass = () => {
  // Propiedades internas del componente
  const form = useRef(null);
  const [validated, setValidated] = useState(false);

  // Función para enviar los datos del formulario
  const handleSubmit = (event) => {
    // Evitar que se recargue la página
    event.preventDefault();
    // Verificar si todo el formulario está validado
    if (form.current.checkValidity() === false) {
      // Si no está validado, evitamos que se envíen los datos
      event.stopPropagation();
    } else {
      // Si está validado, enviamos los datos
      // Obtener los datos del formulario
      const formData = Object.fromEntries(new FormData(form.current));
      // Ejecutar la acción
      console.log(formData);
      // Mostrar mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "¡Correo enviado!",
        html: `
          <p class='mb-0'>Se ha enviado un correo electrónico a la dirección:
            <b class='text-primary'>${formData.correo}</b>
            con las instrucciones para recuperar la contraseña
          </p>`,
      });
      // Borrar los datos del formulario
      form.current.reset();
      // Quitar la validación de los campos
      setValidated(false);
    }
    setValidated(true);
  };

  return (
    <div className='h-100'>
      <NavHome />
      <div className='uleamBG py-5'>
        <Container className='d-flex justify-content-center'>
          <div className='text-white px-5 py-4 rounded' id='recoverpass_form_container'>
            <div className='text-center'>
              <p className='fs-1 fw-bold text-dark'>Recuperar contraseña</p>
            </div>
            <Form
              ref={form}
              validated={validated}
              onSubmit={handleSubmit}
              id='recoverpass_form'
              noValidate
            >
              <Form.Group className='form-label mb-3' controlId='correo'>
                <Form.Label className='text-dark'>Correo electrónico</Form.Label>
                <Form.Control
                  name='correo'
                  required
                  type='email'
                  pattern='/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/'
                />
                <div className='invalid-feedback fst-italic'>
                  Ingresa una dirección de correo electrónico válida
                </div>
              </Form.Group>
              <Button
                variant='success'
                id='recoverpass_btn'
                className='px-5'
                type='submit'
                size='sm'
              >
                Enviar enlace
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </div>
  );
};
