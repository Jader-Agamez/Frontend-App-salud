import { useState } from 'react'
import Formulario from './components/Formulario'
import Resultados from './components/Resultados'
import './App.css'

export default function App() {
  const [hospitales, setHospitales] = useState(null)
  const [buscando, setBuscando] = useState(false)

  const buscar = async ({ eps_id, especialista_id, nivel_max }) => {
    setBuscando(true)
    const res = await fetch(
      `http://localhost:3000/api/hospitales?eps_id=${eps_id}&especialista_id=${especialista_id}&nivel_max=${nivel_max}`
    )
    const data = await res.json()
    setHospitales(data)
    setBuscando(false)
  }

  return (
    <div className="app">
      <header>
        <h1>🏥 Encuentra tu hospital</h1>
        <p>Te ayudamos a ir al lugar correcto según tu EPS y lo que necesitas</p>
      </header>
      <main>
        <Formulario onBuscar={buscar} />
        <Resultados hospitales={hospitales} buscando={buscando} />
      </main>
    </div>
  )
}
