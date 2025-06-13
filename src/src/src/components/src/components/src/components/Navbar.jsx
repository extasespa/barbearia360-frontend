import React from 'react';

export default function Navbar({ onLogout }) {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold">Barbearia360</h1>
      <button onClick={onLogout} className="bg-red-600 px-3 py-1 rounded">Sair</button>
    </nav>
  );
}
