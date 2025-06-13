import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Movimentacoes({ token }) {
  const [lista, setLista] = useState([]);
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    async function fetch() {
      const res = await API.get('/movimentacoes/1', { headers: { Authorization: `Bearer ${token}` }});
      setLista(res.data);
    }
    fetch();
  }, []);

  const submit = async e => {
    e.preventDefault();
    await API.post('/movimentacoes', {
      barbeiro_id: 1,
      valor: parseFloat(valor),
      tipo: 'entrada',
      descricao,
      data: new Date().toISOString(),
    }, { headers: { Authorization: `Bearer ${token}` }});
    setValor(''); setDescricao('');
  };

  return (
    <section>
      <h2 className="text-lg mb-2">Movimentações</h2>
      <form onSubmit={submit} className="mb-4 flex space-x-2">
        <input type="number" step="0.01" className="p-2 border" placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
        <input className="p-2 border" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <button type="submit" className="bg-blue-600 text-white px-4 rounded">Adicionar</button>
      </form>
      <ul>
        {lista.map(item => (
          <li key={item.id} className="p-2 border-b">{item.descricao} – R$ {item.valor}</li>
        ))}
      </ul>
    </section>
  );
}
