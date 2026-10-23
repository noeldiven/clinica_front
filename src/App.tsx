
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './componentes/Layout'
import PaginaDashboard from './pages/PaginaDashboard'
import PaginaPacientes from './pages/PaginaPacientes'
import PaginaDetallePaciente from './pages/PaginaDetallePaciente'
import PaginaNuevaCita from './pages/PaginaNuevaCita'
import PaginaNotFound from './pages/PaginaNotFound'
import PaginaLogin from './pages/PaginaLogin'

export default function App() {
  const token = localStorage.getItem('token')

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/" replace /> : <PaginaLogin />}
      />

      <Route
        path="/"
        element={token ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<PaginaDashboard />} />
        <Route path="pacientes" element={<PaginaPacientes />} />
        <Route path="pacientes/:id" element={<PaginaDetallePaciente />} />
        <Route path="citas/nueva" element={<PaginaNuevaCita />} />
        <Route path="*" element={<PaginaNotFound />} />
      </Route>
    </Routes>
  )
}
