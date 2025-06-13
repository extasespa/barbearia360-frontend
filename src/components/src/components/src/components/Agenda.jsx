import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Agenda({ token }) {
  const [lista, setLista] = useState([]);
  const [cliente, setCliente] = useState('');
  const [dataHora, setDataHora] = useState('');

  useEffect(() => {
    async function fetch() {
      const res = await API.get('/agendamentos/1', { headers: { Authorization: `Bearer ${token}` }});
      setLista(res.data);
    }
    fetch();
  }, []);

  const submit = async e => {
    e.preventDefault();
    await API.post('/agendamentos', {
      barbeiro_id: 1,
      cliente,
      servico: 'Corte',
      data_hora: dataHora,
    }, { headers: { Authorization: `Bearer ${token}` }});
    setCliente(''); setDataHora('');
  };

  return (
    <section>
      <h2 className="text-lg mb-2">Agenda</h2>
      <form onSubmit={submit} className="mb-4 space-x-2 flex">
        <input className="p-2 border" placeholder="Cliente" value={cliente} onChange={e => setCliente(e.target.value)} />
        <input type="datetime-local" className="p-2 border" value={dataHora} onChange={e => setDataHora(e.target.value)} />
        <button type="submit" className="bg-green-600 text-white px-4 rounded">Agendar</button>
      </form>
      <ul>
        {lista.map(item => (
          <li key={item.id} className="p-2 border-b">{item.cliente} – {new Date(item.data_hora).toLocaleString()}</li>
        ))}
      </ul>
    </section>
  );
}
