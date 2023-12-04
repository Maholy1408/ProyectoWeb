import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes
import { Home } from "./pages/Home";
import { Perfil } from "./pages/Perfil";
import { AskFor } from "./pages/AskFor";
import { Login } from "./pages/Login";
import { Singup } from "./pages/Singup";
import { RecoverPass } from "./pages/RecoverPass";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/askfor' element={<AskFor />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/recoverpass' element={<RecoverPass />} />
      </Routes>
    </Router>
  );
};
