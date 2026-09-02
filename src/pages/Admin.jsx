import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import paisaje from '../assets/paisaje.avif';

function Admin() {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const navigate = useNavigate();

  const [nombreCliente, setNombreCliente] = useState('');
  const [telefono, setTelefono] = useState('');
  const [servicio, setServicio] = useState('Lavado por kilo');
  const [cantidadKg, setCantidadKg] = useState('');
  const [precio, setPrecio] = useState('');
  const [fechaEstimada, setFechaEstimada] = useState('');
  const [errorForm, setErrorForm] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    setCargando(true);
    try {
      const respuesta = await api.get('/pedidos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPedidos(respuesta.data);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } finally {
      setCargando(false);
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const registrarPedido = async (e) => {
    e.preventDefault();
    setErrorForm('');

    if (!nombreCliente || !telefono || !cantidadKg || !precio || !fechaEstimada) {
      setErrorForm('Completa todos los campos');
      return;
    }

    try {
      await api.post(
        '/pedidos',
        {
          nombre_cliente: nombreCliente,
          telefono,
          servicio,
          cantidad_kg: cantidadKg,
          precio,
          fecha_estimada: fechaEstimada,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNombreCliente('');
      setTelefono('');
      setServicio('Lavado por kilo');
      setCantidadKg('');
      setPrecio('');
      setFechaEstimada('');
      setMostrarForm(false);
      cargarPedidos();
    } catch (err) {
      setErrorForm('Error al registrar el pedido');
    }
  };

  const actualizarEstado = async (id, nuevoEstado) => {
    try {
      await api.put(
        `/pedidos/${id}`,
        { estado: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      cargarPedidos();
    } catch (err) {
      alert('Error al actualizar el estado');
    }
  };

  const siguienteEstado = (estadoActual) => {
    const flujo = { Recibido: 'En proceso', 'En proceso': 'Listo', Listo: 'Entregado' };
    return flujo[estadoActual] || null;
  };

  const contarPorEstado = (estado) => pedidos.filter((p) => p.estado === estado).length;

  if (cargando) return <div style={styles.page}><p style={{ padding: '32px', color: '#fff' }}>Cargando...</p></div>;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.headerTitle}>LAVANDERIA Y TINTORERIA EMMANUEL · Admin</span>
        <button onClick={cerrarSesion} style={styles.buttonOutline}>Cerrar sesión</button>
      </header>

      <div style={styles.container}>
        <div style={styles.titleRow}>
          <div>
            <h1 style={styles.title}>Pedidos</h1>
            <p style={styles.subtitle}>Gestiona el estado de cada solicitud</p>
          </div>
          <button onClick={() => setMostrarForm(!mostrarForm)} style={styles.buttonPrimary}>
            {mostrarForm ? 'Cancelar' : '+ Nuevo pedido'}
          </button>
        </div>

        {mostrarForm && (
          <form onSubmit={registrarPedido} style={styles.form}>
            <input placeholder="Nombre completo" value={nombreCliente} onChange={(e) => setNombreCliente(e.target.value)} style={styles.input} />
            <input placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={styles.input} />
            <select value={servicio} onChange={(e) => setServicio(e.target.value)} style={styles.input}>
              <option>Lavado por kilo</option>
              <option>Planchado</option>
              <option>Edredones y cobijas</option>
              <option>Ropa delicada</option>
            </select>
            <input type="number" placeholder="Cantidad (kg)" value={cantidadKg} onChange={(e) => setCantidadKg(e.target.value)} style={styles.input} />
            <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} style={styles.input} />
            <input type="date" value={fechaEstimada} onChange={(e) => setFechaEstimada(e.target.value)} style={styles.input} />
            {errorForm && <p style={styles.error}>{errorForm}</p>}
            <button type="submit" style={styles.buttonPrimary}>Registrar pedido</button>
          </form>
        )}

        <div style={styles.summaryGrid}>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Recibidos</p>
            <p style={styles.summaryNumber}>{contarPorEstado('Recibido')}</p>
          </div>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>En proceso</p>
            <p style={styles.summaryNumber}>{contarPorEstado('En proceso')}</p>
          </div>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Listos</p>
            <p style={styles.summaryNumber}>{contarPorEstado('Listo')}</p>
          </div>
          <div style={styles.summaryCard}>
            <p style={styles.summaryLabel}>Entregados</p>
            <p style={styles.summaryNumber}>{contarPorEstado('Entregado')}</p>
          </div>
        </div>

        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Folio</th>
                <th style={styles.th}>Cliente</th>
                <th style={styles.th}>Servicio</th>
                <th style={styles.th}>Estado</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td style={styles.td}>{p.folio}</td>
                  <td style={styles.td}>{p.nombre_cliente}</td>
                  <td style={styles.td}>{p.servicio}</td>
                  <td style={styles.td}>
                    <span style={styles.pill}>{p.estado}</span>
                  </td>
                  <td style={styles.td}>
                    {siguienteEstado(p.estado) && (
                      <button
                        onClick={() => actualizarEstado(p.id, siguienteEstado(p.estado))}
                        style={styles.buttonSmall}
                      >
                        Marcar {siguienteEstado(p.estado)}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundImage: `url(${paisaje})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 32px', backgroundColor: 'rgba(92, 138, 168, 0.55)',
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
  },
  headerTitle: { color: '#fff', fontWeight: 500, fontSize: '16px' },
  buttonOutline: {
    backgroundColor: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.5)',
    borderRadius: '8px', padding: '10px 20px', fontSize: '13px', cursor: 'pointer',
  },
  container: { padding: '32px' },
  titleRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' },
  title: { fontSize: '20px', fontWeight: 500, margin: '0 0 4px', color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.4)' },
  subtitle: { fontSize: '13px', color: '#eee', margin: 0, textShadow: '0 1px 4px rgba(0,0,0,0.4)' },
  buttonPrimary: {
    backgroundColor: '#3b6ee0', color: '#fff', border: 'none', borderRadius: '8px',
    padding: '10px 18px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
  },
  form: {
    display: 'flex', flexDirection: 'column', gap: '10px',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    padding: '20px', borderRadius: '12px', marginBottom: '24px', maxWidth: '400px',
  },
  input: { padding: '10px', fontSize: '14px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.6)', backgroundColor: 'rgba(255,255,255,0.6)' },
  error: { color: '#c0392b', fontSize: '13px' },
  summaryGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' },
  summaryCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '8px', padding: '14px',
  },
  summaryLabel: { fontSize: '12px', color: '#333', margin: '0 0 4px' },
  summaryNumber: { fontSize: '22px', fontWeight: 500, margin: 0, color: '#1a1a1a' },
  tableWrap: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.4)', borderRadius: '12px', padding: '8px 16px',
  },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '13px' },
  th: { textAlign: 'left', padding: '8px 6px', color: '#333', borderBottom: '1px solid rgba(0,0,0,0.15)' },
  td: { padding: '10px 6px', borderBottom: '1px solid rgba(0,0,0,0.08)', color: '#1a1a1a' },
  pill: { backgroundColor: '#fdf3d9', color: '#a67c00', fontSize: '12px', padding: '3px 10px', borderRadius: '8px' },
  buttonSmall: { padding: '6px 12px', fontSize: '12px', cursor: 'pointer', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: 'rgba(255,255,255,0.8)' },
};

export default Admin;