import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { CircleCheck } from 'lucide-react';

function InitiateKYC() {
  const { initiateKycFetch, createWalletFetch } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Initiate KYC');
    initiateKycFetch();
    createWalletFetch();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6 sm:px-0 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded shadow-md w-96">
        <div className="flex justify-center  dark:text-white mb-4">
          <CircleCheck strokeWidth={0.75} size={40}/>
        </div>
        <h2 className="text-center text-2xl font-bold mb-4 dark:text-white">Get Started</h2>
        <p className="my-6 text-center dark:text-zinc-200">
          You're almost there! to create your wallet, verify your identity.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
            Verify Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default InitiateKYC;