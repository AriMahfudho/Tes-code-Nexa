import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory} from 'react-router-dom';

const TransactionsList = () => {
  const [transactions, setTransactions] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:3100/api/transactions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTransactions(result.data);
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    history.push(`/edit-transaction/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3100/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTransactions(transactions.filter((transaction) => transaction.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nomor Transaksi</th>
          <th>Customer</th>
          <th>Total Transaksi</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={transaction.id}>
            <td>{index + 1}</td>
            <td>{transaction.nomor_transaksi}</td>
            <td>{transaction.customer.nama}</td>
            <td>{transaction.total_transaksi}</td>
            <td>
              <button onClick={() => handleEdit(transaction.id)}>Edit</button>
              <button onClick={() => handleDelete(transaction.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionsList;
