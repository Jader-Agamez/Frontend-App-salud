import { useState } from 'react'
import Formulario from './components/Formulario'
import Resultados from './components/Resultados'
import './App.css'

export default function App() {
  const [hospitales, setHospitales] = useState(null)
  const [buscando, setBuscando] = useState(false)

  const buscar = async ({ eps_id, especialista_id, nivel }) => {
    setBuscando(true)
    const res = await fetch(
      `http://localhost:3000/api/hospitales?eps_id=${eps_id}&especialista_id=${especialista_id}&nivel=${nivel}`
    )
    const data = await res.json()
    setHospitales(data)
    setBuscando(false)
  }

  return (
    <div className="page">
      <nav className="navbar">
        <div className="nav-brand">
          <div className="nav-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
          </div>
          <span className="nav-title">The Clinical Sanctuary</span>
        </div>
        <div className="nav-links">
          <a href="#" className="nav-link active">Find Care</a>
          <a href="#" className="nav-link">Appointments</a>
          <a href="#" className="nav-link">Records</a>
        </div>
        <div className="nav-icons">
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
          <button className="icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
        </div>
      </nav>

      <main className="main">
        <div className="hero">
          <span className="badge">LOCALIZADOR DE SALUD</span>
          <h1>Encuentra tu hospital</h1>
          <p className="hero-sub">Localiza centros médicos de alta complejidad adaptados a tus necesidades específicas y nivel de urgencia.</p>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a6b3c" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
            </div>
            <div>
              <h2>Configura tu búsqueda</h2>
              <p className="card-sub">Completa los campos para filtrar los mejores centros</p>
            </div>
          </div>
          <Formulario onBuscar={buscar} />
        </div>

        <Resultados hospitales={hospitales} buscando={buscando} />

        <div className="features">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a6b3c" strokeWidth="2"><rect x="3" y="3" width="7" height="18"/><rect x="14" y="3" width="7" height="18"/></svg>
            </div>
            <h3>Cercanía real</h3>
            <p>Calculamos el tiempo de llegada considerando el tráfico en tiempo real de tu ciudad.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a6b3c" strokeWidth="2"><path d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z"/><path d="M12 8v4l3 3"/></svg>
            </div>
            <h3>Espera estimada</h3>
            <p>Consulta los tiempos de espera actuales en salas de urgencias antes de salir de casa.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1a6b3c" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h3>Calidad médica</h3>
            <p>Filtramos hospitales con las mejores certificaciones y puntuaciones de pacientes.</p>
          </div>
        </div>
      </main>

      <button className="fab">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><circle cx="12" cy="20" r="1" fill="white"/></svg>
      </button>
    </div>
  )
}
