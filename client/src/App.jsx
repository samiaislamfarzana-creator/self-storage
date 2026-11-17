import { useEffect, useState } from 'react';

export default function App() {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/units')
      .then((r) => r.json())
      .then(setUnits)
      .catch(() => setUnits([]));
  }, []);

  return (
    <main style={{ fontFamily: 'system-ui', maxWidth: 720, margin: '2rem auto' }}>
      <h1>Self Storage Manager</h1>
      <h2>Units</h2>
      <ul>
        {units.map((u) => (
          <li key={u.id}>
            {u.id} — {u.size} — ${u.price}/mo — {u.status}
          </li>
        ))}
      </ul>
    </main>
  );
}
