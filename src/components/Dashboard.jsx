import React, { useState } from 'react';
import Navbar from './Navbar';
import Movimentacoes from './Movimentacoes';
import Agenda from './Agenda';

export default function Dashboard() {
  const [token] = useState(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      <Navbar onLogout={logout} />
      <div className="p-4 space-y-8">
        <Movimentacoes token={token} />
        <Agenda token={token} />
      </div>
    </>
  );
}
