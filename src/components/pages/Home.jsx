import React from "react";
import { Container } from "react-bootstrap";

import { NavHome } from "../ui/NavHome";

export const Home = () => {
  return (
    <div className='h-100'>
      <NavHome />
      <div className='uleamBG pt-5'>
        <Container className='d-flex justify-content-center'>
          <div className='text-center text-white bg-secondary p-5 rounded d-inline-block'>
            <p className='fs-1 fw-bold'>Bienvenido a la página principal</p>
            <p className='fs-4'>Pácticas Pre-Profesionales de la ULEAM</p>
          </div>
        </Container>
      </div>
    </div>
  );
};
