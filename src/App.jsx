import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Consulta from './pages/Consulta';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/consulta" element={<Consulta />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;