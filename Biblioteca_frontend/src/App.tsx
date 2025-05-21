import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbars from "./Navbar";
import FormularioLibros from "./FormularioLibros";
import ListarEditorial from "./ListarEditorial";
import FormularioEditorial from "./FormularioEditorial";



const App: React.FC = () => {
  return (
    <Router>
      <Navbars></Navbars>
      <Routes>
         <Route path="/" element={<FormularioEditorial></FormularioEditorial>}></Route>
         <Route path="/Listar" element={<ListarEditorial></ListarEditorial>}></Route>
         <Route path="/CrearLibros" element={<FormularioLibros></FormularioLibros>}></Route>

      </Routes>
    </Router>
  )
}
export default App
