import { useSelector, useDispatch } from "react-redux";
import React, { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";

// Opciones de la tabla
import { paginationOptions } from "./TableOptions";

export const Table = () => {
  // Propiedades internas del componente
  const [filterText, setFilterText] = useState("");

  // Obtener el estado de las a desde el store
  const practicas = useSelector((state) => state.practicas);
  const dispatch = useDispatch();

  // Elementos filtrados con el texto de búsqueda
  const filteredItems = practicas.filter(
    (item) =>
      item.nombre_solicitud.toLowerCase().includes(filterText.toLowerCase().trim()) ||
      item.correo_solicitud.toLowerCase().includes(filterText.toLowerCase().trim()) ||
      item.carrera_solicitud.toLowerCase().includes(filterText.toLowerCase().trim()) ||
      item.semestre_solicitud.toLowerCase().includes(filterText.toLowerCase().trim())
  );

  // Columnas de la tabla
  const practicasColumns = useMemo(() => [
    {
      name: "Nombre",
      selector: (row) => row.nombre_solicitud,
      wrap: true,
      reorder: true,
      sortable: true,
    },
    {
      name: "Correo",
      selector: (row) => row.correo_solicitud,
      reorder: true,
      sortable: true,
    },
    {
      name: "Carrera",
      selector: (row) => row.carrera_solicitud,
      wrap: true,
      reorder: true,
      sortable: true,
    },
    {
      name: "Semestre",
      selector: (row) => row.semestre_solicitud,
      wrap: true,
      reorder: true,
      sortable: true,
    },
  ]);

  // Componente para filtrar las a
  const subHeaderComponentMemo = useMemo(() => {
    const handleClearFilters = () => {
      if (filterText) setFilterText("");
    };
    return (
      <div className='input-group'>
        <input
          type='text'
          value={filterText}
          aria-label='Search'
          placeholder='Buscar por nombre, correo, carrera o semestre'
          className='form-control'
          onChange={({ target }) => setFilterText(target.value)}
        />
        <Button className='px-4' variant='outline-secondary' onClick={handleClearFilters}>
          X
        </Button>
      </div>
    );
  }, [filterText]); // [resetPagination]

  return (
    <DataTable
      // theme='solarized'
      striped
      pagination
      highlightOnHover
      data={filteredItems}
      columns={practicasColumns}
      noDataComponent='Sin datos que mostrar'
      paginationComponentOptions={paginationOptions}
      // paginationResetDefaultPage={resetPagination}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
    />
  );
};
