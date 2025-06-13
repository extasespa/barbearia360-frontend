import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', { email, password: senha });
      alert('Verifique seu e-mail para confirmação.');
      nav('/login');
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Erro no cadastro');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl mb-4">Cadastro Barbearia360</h2>
      <input className="mb-2 p-2 border w-full" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" className="mb-2 p-2 border w-full" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      <button className="bg-green-600 text-white py-2 w-full rounded">Cadastrar</button>
      <p className="mt-2 text-sm text-center">
        Já tem conta? <a href="/login" className="text-blue-600">Entre</a>
      </p>
    </form>
  );
}
