import React, { useState, useCallback, useMemo } from 'react';

interface Transaction {
  id: number;
  amount: number;
}

const PaymentDashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, amount: 50 },
    { id: 2, amount: 150 },
    { id: 3, amount: 200 },
  ]);
  const [target, setTarget] = useState<number | null>(null);
  const [result, setResult] = useState<string>('');

  const [newTransaction, setNewTransaction] = useState<number | null>(null)
  const [newTransactionFeedback, setNewTransactionFeedback] = useState('')

  const handleCheckTransactions = useCallback(() => {
    if (target === null) return;

    for (let i = 0; i < transactions.length; i++) {
      for (let j = i + 1; j < transactions.length; j++) {
        if (transactions[i].amount + transactions[j].amount === target) {
          setResult(`Transactions ${transactions[i].id} and ${transactions[j].id} add up to ${target}`);
          return;
        }
      }
    }

    setResult('No matching transactions found.');
  }, [target, transactions]);

  const handleAddTransaction = () => {
    if(!newTransaction) return

    console.log('newTransaction', newTransaction, newTransaction < 0)

    if(newTransaction < 0) {
      return setNewTransactionFeedback('Negative numbers is not allowed')
    }

    const id = Number(Math.random().toFixed(1))

    setTransactions([...transactions, { id, amount: newTransaction }]);
    setNewTransactionFeedback('')
  };

  const sumOfAllTransactions = useMemo(() => {
    return transactions.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.amount
    }, 0)
  }, [transactions])

  return (
    <div>
      <h1>Payment Transaction Dashboard</h1>
      <input
        type="number"
        placeholder="Enter transaction amount"
        onChange={(e) => setNewTransaction(Number(e.target.value))}
      />
      <button onClick={handleAddTransaction}>Add transaction</button>

      <p>{newTransactionFeedback}</p>

      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            ID: {transaction.id}, Amount: ${transaction.amount}
          </li>
        ))}
      </ul>
      <input
        type="number"
        placeholder="Enter target amount"
        onChange={(e) => setTarget(Number(e.target.value))}
      />
      <button onClick={handleCheckTransactions}>Check Transactions</button>
      <p>{result}</p>

      <p>Sum of all transactions: <b>{sumOfAllTransactions}</b></p>
    </div>
  );
};

export default PaymentDashboard;