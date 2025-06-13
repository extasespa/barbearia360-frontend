import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password: senha });
      localStorage.setItem('token', res.data.session.access_token);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.error?.message || 'Erro no login');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto mt-20 p-4 border rounded">
      <h2 className="text-xl mb-4">Login Barbearia360</h2>
      <input className="mb-2 p-2 border w-full" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" className="mb-2 p-2 border w-full" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      <button className="bg-blue-600 text-white py-2 w-full rounded">Entrar</button>
      <p className="mt-2 text-sm text-center">
        Não tem conta? <a href="/signup" className="text-blue-600">Cadastre-se</a>
      </p>
    </form>
  );
}
