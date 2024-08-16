import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Register() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically make an API call to register the user
    login(email, password);
    console.log('Registration attempt:', name, email, password);
    navigate('/dashboard'); // Navigate to dashboard after successful registration
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 sm:px-0 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Register for DigiWallet</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-zinc-400">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 border-gray-300 dark:border-slate-500 dark:bg-slate-600 rounded-md shadow-sm p-2 dark:text-gray-200"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-zinc-400">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 border-gray-300 dark:border-slate-500 dark:bg-slate-600 rounded-md shadow-sm p-2 dark:text-gray-200"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-zinc-400">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 border-gray-300 dark:border-slate-500 dark:bg-slate-600 rounded-md shadow-sm p-2 dark:text-gray-200"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
            Register
          </button>
        </form>
        <p className="mt-4 text-center dark:text-zinc-200">
          Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;