import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddTransaction = () => {
  const [transactionNumber, setTransactionNumber] = useState('');
  const [customer, setCustomer] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [date, setDate] = useState('');
  const [customers, setCustomers] = useState([]);
  const history = useHistory();
  // const navigateTo = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      const result = await axios.get('http://localhost:3100/api/customers', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCustomers(result.data);
    };

    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3100/api/transactions',
        {
          nomor_transaksi: transactionNumber,
          tanggal_transaksi: date,
          total_transaksi: totalAmount,
          id_customer: customer,
          items: [],
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      history.push('/transactions');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={transactionNumber}
        onChange={(e) => setTransactionNumber(e.target.value)}
        placeholder="Transaction Number"
      />
      <select value={customer} onChange={(e) => setCustomer(e.target.value)}>
        <option value="">Select Customer</option>
        {customers.map((cust) => (
          <option key={cust.id} value={cust.id}>
            {cust.nama}
          </option>
        ))}
      </select>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="number"
        value={totalAmount}
        onChange={(e) => setTotalAmount(e.target.value)}
        placeholder="Total Amount"
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransaction;
