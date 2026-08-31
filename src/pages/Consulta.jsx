import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

function Consulta() {
  const [busqueda, setBusqueda] = useState('');
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const buscarPedido = async () => {
    setError('');
    setPedido(null);

    if (!busqueda.trim()) {
      setError('Escribe un folio o teléfono');
      return;
    }

    setCargando(true);
    try {
      const respuesta = await api.get(`/consulta?busqueda=${encodeURIComponent(busqueda)}`);
      setPedido(respuesta.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('No se encontró ningún pedido con ese folio o teléfono');
      } else {
        setError('Ocurrió un error al buscar tu pedido');
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <div>
      <header style={styles.header}>
        <span style={styles.headerTitle}>Lavandería Emmanuel</span>
        <Link to="/" style={styles.buttonOutline}>Volver al inicio</Link>
      </header>

      <div style={styles.container}>
        <h1 style={styles.title}>Consulta tu pedido</h1>
        <p style={styles.subtitle}>Ingresa tu folio o teléfono para ver el estado</p>

        <input
          type="text"
          placeholder="Ej. #0001 o tu teléfono"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={styles.input}
        />
        <button onClick={buscarPedido} style={styles.button} disabled={cargando}>
          {cargando ? 'Buscando...' : 'Buscar pedido'}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        {pedido && (
          <div style={styles.resultCard}>
            <div style={styles.resultHeader}>
              <span style={styles.folio}>Folio {pedido.folio}</span>
              <span style={styles.estadoPill}>{pedido.estado}</span>
            </div>
            <p style={styles.resultText}>Servicio: {pedido.servicio}</p>
            <p style={styles.resultText}>
              Fecha estimada: {new Date(pedido.fecha_estimada).toLocaleDateString('es-MX')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    backgroundColor: '#5c8aa8',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 500,
    fontSize: '16px',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.5)',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: 500,
    textDecoration: 'none',
  },
  container: {
    maxWidth: '420px',
    margin: '0 auto',
    padding: '48px 24px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#666',
    textAlign: 'center',
    marginBottom: '28px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '14px',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    backgroundColor: '#3b6ee0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  },
  error: {
    color: '#c0392b',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '16px',
  },
  resultCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    padding: '20px',
    marginTop: '24px',
    border: '1px solid #ddd',
  },
  resultHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  folio: {
    fontSize: '13px',
    color: '#666',
  },
  estadoPill: {
    backgroundColor: '#fdf3d9',
    color: '#a67c00',
    fontSize: '12px',
    padding: '4px 12px',
    borderRadius: '8px',
    fontWeight: 500,
  },
  resultText: {
    fontSize: '14px',
    margin: '4px 0',
  },
};

export default Consulta;