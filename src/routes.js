import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BarraNavegacao from './componentes/BarraNavegacao';
import Clientes from './paginas/Clientes';
import Empresas from './paginas/Empresas';
import Login from './paginas/Login';
import { AuthProvider } from "./componentes/AuthContext";
import ProtectedRoute from './componentes/ProtectedRoute';  // Importando o ProtectedRoute

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

         <Route
            path="/"
            element={<Navigate to="/login" />}
          /> 

          <Route path="/" element={<BarraNavegacao />}>
            <Route
              path="clientes"
              element={
                <ProtectedRoute>
                  <Clientes />
                </ProtectedRoute>
              }
            />

            <Route
              path="empresas"
              element={
                <ProtectedRoute>
                  <Empresas />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRoutes;
