import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Transaction {
  id: number,
  date: string,
  description: string,
  amount: number
}

function TransactionsView() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, date: '2023-07-01', description: 'Grocery Store', amount: -75.50 },
    { id: 2, date: '2023-07-02', description: 'Salary Deposit', amount: 3000 },
    { id: 3, date: '2023-07-03', description: 'Electric Bill', amount: -120 },
    { id: 4, date: '2023-07-04', description: 'Online Purchase', amount: -50.25 },
    { id: 5, date: '2023-07-05', description: 'Restaurant', amount: -45 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6 px-6 sm:px-0">
      <div className="flex items-center bg-white dark:bg-slate-800 shadow rounded-lg p-2">
        <Search className="text-gray-400 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search transactions..."
          className="flex-grow outline-none dark:bg-slate-800"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="bg-white dark:bg-slate-800 shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
          <thead className="bg-gray-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">Amount</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-zinc-300">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{transaction.description}</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${transaction.amount >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                  ${Math.abs(transaction.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionsView;