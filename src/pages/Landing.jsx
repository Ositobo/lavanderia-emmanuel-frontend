import { Link } from 'react-router-dom';
import paisaje from '../assets/paisaje.avif';

function Landing() {
  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <span style={styles.headerTitle}>Lavandería Emmanuel</span>
        <Link to="/consulta" style={styles.buttonSmall}>Consultar mi pedido</Link>
      </header>

      <section style={styles.hero}>
        <div style={styles.heroGlass}>
          <h1 style={styles.heroTitle}>Trae tu ropa,<br />nosotros la cuidamos</h1>
          <p style={styles.heroSubtitle}>Lavamos y planchamos tu ropa — consulta en línea cuándo está lista</p>
          <Link to="/consulta" style={styles.buttonLarge}>Consultar mi pedido</Link>
        </div>
      </section>

      <section style={styles.services}>
        <h2 style={styles.servicesTitle}>Nuestros servicios</h2>
        <div style={styles.cardsGrid}>
          <div style={styles.card}>
            <p style={styles.cardTitle}>Lavado por kilo</p>
            <p style={styles.cardPrice}>Desde $25/kg</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardTitle}>Planchado</p>
            <p style={styles.cardPrice}>Desde $15/kg</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardTitle}>Edredones y cobijas</p>
            <p style={styles.cardPrice}>Desde $80</p>
          </div>
          <div style={styles.card}>
            <p style={styles.cardTitle}>Ropa delicada</p>
            <p style={styles.cardPrice}>Desde $40/kg</p>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <p style={styles.footerText}>777-450-65-33</p>
        <p style={styles.footerSubtext}>Lunes a viernes 7:00am - 6:00pm · Miércoles descanso</p>
      </footer>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    backgroundColor: 'rgba(92, 138, 168, 0.55)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  },
  headerTitle: {
    color: '#fff',
    fontWeight: 500,
    fontSize: '16px',
  },
  buttonSmall: {
    backgroundColor: '#3b6ee0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: 500,
    textDecoration: 'none',
  },
  hero: {
    textAlign: 'center',
    padding: '56px 32px 40px',
  },
  heroGlass: {
    maxWidth: '520px',
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.35)',
    borderRadius: '20px',
    padding: '36px 28px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  heroTitle: {
    fontSize: '34px',
    fontWeight: 500,
    marginBottom: '8px',
    lineHeight: 1.3,
    color: '#1a1a1a',
  },
  heroSubtitle: {
    fontSize: '15px',
    color: '#333',
    marginBottom: '24px',
  },
  buttonLarge: {
    backgroundColor: '#3b6ee0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    padding: '14px 28px',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
  },
  services: {
    padding: '40px 32px',
  },
  servicesTitle: {
    fontSize: '18px',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: '24px',
    color: '#fff',
    textShadow: '0 1px 4px rgba(0,0,0,0.4)',
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '16px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '12px',
    padding: '20px 16px',
    textAlign: 'center',
  },
  cardTitle: {
    fontWeight: 500,
    fontSize: '14px',
    margin: '10px 0 4px',
    color: '#1a1a1a',
  },
  cardPrice: {
    fontSize: '13px',
    color: '#333',
    margin: 0,
  },
  footer: {
    padding: '24px 32px',
    backgroundColor: 'rgba(92, 138, 168, 0.55)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    textAlign: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: '13px',
    margin: '0 0 4px',
  },
  footerSubtext: {
    color: '#dbe8f0',
    fontSize: '12px',
    margin: 0,
  },
};

export default Landing;