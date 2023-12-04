import React, { useRef, useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { Table } from "../tables/Table";
import { NavAskFor } from "../ui/NavAskFor";

// Acciones
import { addPracticas, addPractica } from "../../features/practicaSlice";

export const AskFor = () => {
  const formRef = useRef(null);
  const [validated, setValidated] = useState(false);

  // Para ejecutar las acciones del store
  const dispatch = useDispatch();

  // Leer el almacenamiento local para obtener la información del usuario
  const localUserData = JSON.parse(window.localStorage.getItem("userData"));

  useEffect(() => {
    handleSetSolicitudesInfo();
  }, []);

  // Funcion para actualizar la tabla de solicitudes
  const handleSetSolicitudesInfo = () => {
    // Limpiar la lista de solicitudes
    dispatch(addPracticas([]));
    // Obtener la información de las solicitudes
    handleFetchSolicitudesData()
      // Actualizar el estado de las solicitudes en el store
      .then((data) => {
        dispatch(addPracticas(data));
        console.log(data);
      })
      .catch((err) => console.error(err));
  };

  // Obtener las solicitudes de la base de datos
  const handleFetchSolicitudesData = () => {
    const URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/solicitudes`;
    // Obtener la información de las solicitudes
    return new Promise((resolve, reject) => {
      fetch(URL)
        .then((res) => res.json())
        .then((data) => resolve(data.solicitudes))
        .catch((err) => reject(err));
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      const formData = Object.fromEntries(new FormData(form));
      console.log(formData);
      handleAddSolicitud(formData);
    }
    setValidated(true);
  };

  // Función para añadir una solicitud a la base de datos
  const handleAddSolicitud = (data) => {
    const URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/solicitudes`;
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => handleProcessTheRequest(res))
      .catch((err) => console.error(err));
  };

  // Función para procesar las peticiones a la base de datos de una solicitud
  const handleProcessTheRequest = (res) => {
    if (res.estado === true) {
      // Mostrar mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        html: `<p class='mb-0'>Solititud añadida correctamente</p>`,
      });
      // Añadir la solicitud al store
      dispatch(addPractica(res.solicitud));
      console.log(res.solicitud);
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
          <Container className='d-sm-flex'>
            <div className='text-white p-4 m-1 rounded w-100' id='askfor_form_container'>
              <h1 className='fs-1 fw-bold text-dark'>Solicitar práctica</h1>
              <Form
                ref={formRef}
                validated={validated}
                onSubmit={handleSubmit}
                id='aksfor_form'
                noValidate
              >
                <Row>
                  {[
                    {
                      type: "text",
                      controlId: "id_usuario",
                      value: localUserData.id_usuario,
                      hidden: true,
                    },
                    {
                      type: "text",
                      controlId: "nombre",
                      label: "Nombre",
                      pattern: "^[a-zA-Zá-źÁ-Ź]{3,30}( [a-zA-Zá-źÁ-Ź]{1,})*$",
                      invalid_feedback: "El nombre debe tener al menos 3 caracteres",
                    },
                    {
                      type: "email",
                      controlId: "correo",
                      label: "Correo electrónico",
                      pattern: "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$",
                      invalid_feedback: "Ingresa una dirección de correo electrónico válida",
                    },
                    {
                      type: "text",
                      controlId: "carrera",
                      label: "Carrera",
                      pattern: "^[a-zA-Zá-źÁ-Ź]{3,30}( [a-zA-Zá-źÁ-Ź]{1,})*$",
                      invalid_feedback: "El nombre debe tener al menos 3 caracteres",
                    },
                    {
                      type: "text",
                      controlId: "semestre",
                      label: "Semestre",
                      pattern: "^[a-zA-Zá-źÁ-Ź]{3,30}( [a-zA-Zá-źÁ-Ź]{1,})*$",
                      invalid_feedback: "El nombre debe tener al menos 3 caracteres",
                    },
                  ].map((field) => (
                    <Col xs={12} key={field.controlId} hidden={field.hidden}>
                      <Form.Group className='form-label mb-3' controlId={field.controlId}>
                        <Form.Label className='text-dark'>{field.label}</Form.Label>
                        <Form.Control
                          name={field.controlId}
                          required
                          type={field.type}
                          pattern={field.pattern}
                          defaultValue={field.value ? field.value : ""}
                        />
                        <div className='invalid-feedback fst-italic'>{field.invalid_feedback}</div>
                      </Form.Group>
                    </Col>
                  ))}
                  <Col>
                    <Button variant='success' type='submit' size='sm'>
                      Enviar solicitud
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
            {/* ... Table ... */}
            <div className='text-white p-4 m-1 rounded w-100' id='askfor_datatable'>
              <h1 className='fs-1 fw-bold text-dark'>Prácticas solicitadas</h1>
              <div className='table-container'>
                <Table />
              </div>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};
