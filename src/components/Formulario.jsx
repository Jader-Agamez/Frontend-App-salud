import { useEffect, useState } from 'react'

const NIVELES = [
  { value: 1, label: 'Nivel 1 - Básico (gripa, vómito, etc.)' },
  { value: 2, label: 'Nivel 2 - Intermedio' },
  { value: 3, label: 'Nivel 3 - Alta complejidad' },
  { value: 4, label: 'Nivel 4 - Máxima complejidad' },
]

export default function Formulario({ onBuscar }) {
  const [epsList, setEpsList] = useState([])
  const [especialistas, setEspecialistas] = useState([])
  const [form, setForm] = useState({ regimen: '', eps_id: '', especialista_id: '', nivel_max: 4 })

  useEffect(() => {
    fetch('http://localhost:3000/api/eps').then(r => r.json()).then(setEpsList)
    fetch('http://localhost:3000/api/especialistas').then(r => r.json()).then(setEspecialistas)
  }, [])

  const handleRegimen = (e) => setForm({ ...form, regimen: e.target.value, eps_id: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.eps_id || !form.especialista_id) return
    onBuscar(form)
  }

  const epsFiltradas = epsList.filter(e => e.regimen === form.regimen)

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <div className="campo">
        <label>¿A qué régimen perteneces?</label>
        <select value={form.regimen} onChange={handleRegimen} required>
          <option value="">Selecciona el régimen</option>
          <option value="Contributivo">Régimen Contributivo</option>
          <option value="Subsidiado">Régimen Subsidiado</option>
        </select>
      </div>

      <div className="campo">
        <label>¿Cuál es tu EPS?</label>
        <select value={form.eps_id} onChange={e => setForm({ ...form, eps_id: e.target.value })} required disabled={!form.regimen}>
          <option value="">Selecciona tu EPS</option>
          {epsFiltradas.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
        </select>
      </div>

      <div className="campo">
        <label>¿Qué especialista necesitas?</label>
        <select value={form.especialista_id} onChange={e => setForm({ ...form, especialista_id: e.target.value })} required>
          <option value="">Selecciona el especialista</option>
          {especialistas.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
        </select>
      </div>

      <div className="campo">
        <label>¿Qué tan grave es la situación?</label>
        <select value={form.nivel_max} onChange={e => setForm({ ...form, nivel_max: e.target.value })}>
          {NIVELES.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
        </select>
      </div>

      <button type="submit">Buscar hospitales</button>
    </form>
  )
}
