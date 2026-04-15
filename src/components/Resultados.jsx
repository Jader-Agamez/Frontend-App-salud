const NIVEL_LABEL = { 1: 'Básico', 2: 'Intermedio', 3: 'Alta complejidad', 4: 'Máxima complejidad' }

export default function Resultados({ hospitales, buscando }) {
  if (buscando) return <p className="mensaje">Buscando hospitales...</p>
  if (!hospitales) return null
  if (hospitales.length === 0)
    return <p className="mensaje error">No encontramos hospitales disponibles con esos criterios.</p>

  return (
    <div className="resultados">
      <h2>{hospitales.length} hospital(es) encontrado(s)</h2>
      {hospitales.map(h => (
        <div key={h.id} className="tarjeta">
          <div className="tarjeta-header">
            <span className="nombre">{h.nombre}</span>
            <span className={`nivel nivel-${h.nivel}`}>Nivel {h.nivel} — {NIVEL_LABEL[h.nivel]}</span>
          </div>
          <p>📍 {h.direccion}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.direccion)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-maps"
          >
            🗺️ Cómo llegar
          </a>

        </div>
      ))}
    </div>
  )
}
