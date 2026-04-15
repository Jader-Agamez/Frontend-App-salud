import { useEffect, useState } from 'react'

export default function Formulario({ onBuscar }) {
  const [epsList, setEpsList] = useState([])
  const [especialistas, setEspecialistas] = useState([])
  const [form, setForm] = useState({ regimen: '', eps_id: '', especialista_id: '', nivel_max: 4 })

  useEffect(() => {
    fetch('http://localhost:3000/api/eps').then(r => r.json()).then(setEpsList)
    fetch('http://localhost:3000/api/especialistas').then(r => r.json()).then(setEspecialistas)
  }, [])

  const epsFiltradas = epsList.filter(e => e.regimen === form.regimen)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.eps_id || !form.especialista_id) return
    onBuscar({ ...form, nivel: form.nivel_max })
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="campo">
          <label className="campo-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Régimen de salud
          </label>
          <div className="select-wrapper">
            <select value={form.regimen} onChange={e => setForm({ ...form, regimen: e.target.value, eps_id: '' })} required>
              <option value="">Selecciona un régimen</option>
              <option value="Contributivo">Régimen Contributivo</option>
              <option value="Subsidiado">Régimen Subsidiado</option>
            </select>
          </div>
        </div>

        <div className="campo">
          <label className="campo-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Entidad (EPS)
          </label>
          <div className="select-wrapper">
            <select value={form.eps_id} onChange={e => setForm({ ...form, eps_id: e.target.value })} required disabled={!form.regimen}>
              <option value="">Selecciona tu EPS</option>
              {epsFiltradas.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
            </select>
          </div>
        </div>

        <div className="campo">
          <label className="campo-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            Especialidad requerida
          </label>
          <div className="select-wrapper">
            <select value={form.especialista_id} onChange={e => setForm({ ...form, especialista_id: e.target.value })} required>
              <option value="">Busca una especialidad</option>
              {especialistas.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
            </select>
          </div>
        </div>

        <div className="campo">
          <label className="campo-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Nivel de atención
          </label>
          <div className="select-wrapper">
            <select value={form.nivel_max} onChange={e => setForm({ ...form, nivel_max: e.target.value })}>
              <option value={1}>Nivel 1 — Básico</option>
              <option value={2}>Nivel 2 — Intermedio</option>
              <option value={3}>Nivel 3 — Alta complejidad</option>
              <option value={4}>Nivel 4 — Máxima complejidad</option>
            </select>
          </div>
        </div>
      </div>

      <button type="submit" className="btn-buscar">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        Buscar hospitales
      </button>
    </form>
  )
}
