import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import paisaje from '../assets/paisaje.avif';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      const respuesta = await api.post('/login', { usuario, password });
      localStorage.setItem('token', respuesta.data.token);
      navigate('/admin');
    } catch (err) {
      setError('Usuario o contraseña incorrectos');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <form onSubmit={iniciarSesion} style={styles.card}>
        <div style={styles.iconBox}>🧺</div>
        <h1 style={styles.title}>Lavandería Emmanuel</h1>
        <p style={styles.subtitle}>Acceso administrador</p>

        <label style={styles.label}>Usuario</label>
        <input
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          style={styles.input}
          placeholder="admin"
        />

        <label style={styles.label}>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          placeholder="••••••••"
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button} disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${paisaje})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderRadius: '14px',
    padding: '36px 32px',
    width: '100%',
    maxWidth: '360px',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
  },
  iconBox: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    backgroundColor: 'rgba(92, 138, 168, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    margin: '0 auto 14px',
  },
  title: {
    fontSize: '19px',
    fontWeight: 500,
    textAlign: 'center',
    margin: '0 0 4px',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: '13px',
    color: '#333',
    textAlign: 'center',
    margin: '0 0 24px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 500,
    marginBottom: '6px',
    color: '#1a1a1a',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.6)',
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom: '14px',
    boxSizing: 'border-box',
  },
  error: {
    color: '#c0392b',
    fontSize: '13px',
    textAlign: 'center',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#3b6ee0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '13px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    marginTop: '6px',
  },
};

export default Login;