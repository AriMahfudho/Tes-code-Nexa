import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/Transactions.css';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [nomorTransaksi, setNomorTransaksi] = useState('');
  const [tanggalTransaksi, setTanggalTransaksi] = useState(new Date());
  const [customerId, setCustomerId] = useState('');
  const [customers, setCustomers] = useState([]);
  const [barangId, setBarangId] = useState('');
  const [barangOptions, setBarangOptions] = useState([]);
  const [qty, setQty] = useState(0);
  const [totalTransaksi, setTotalTransaksi] = useState(0);
  const history = useHistory();

  useEffect(() => {
    fetchData();
    fetchCustomers();
    fetchBarangOptions();
    generateNomorTransaksi();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/transactions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchBarangOptions = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/barang');
      setBarangOptions(response.data);
    } catch (error) {
      console.error('Error fetching barang options:', error);
    }
  };


  const generateNomorTransaksi = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const counter = Math.floor(Math.random() * 900) + 100;
    const nomor = `SO/${year}-${month}/${counter}`;
    setNomorTransaksi(nomor);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = {
        nomor_transaksi: nomorTransaksi,
        tanggal_transaksi: tanggalTransaksi,
        id_customer: customerId,
        id_barang: barangId,
        qty: qty,
        total_transaksi: totalTransaksi,
      };
      await axios.post('http://localhost:3100/api/transactions', transactionData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchData(); 
      setShowForm(false); 
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

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
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="transactions-container">
      <h1 className="title">Transaksi Penjualan</h1>

      <button onClick={toggleForm} className="add-button">
        Tambah Transaksi
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-form">
          <div className="form-group">
            <label>Nomor Transaksi:</label>
            <input type="text" value={nomorTransaksi} readOnly />
          </div>
          <div className="form-group">
            <label>Tanggal Transaksi:</label>
            <DatePicker selected={tanggalTransaksi} onChange={(date) => setTanggalTransaksi(date)} />
          </div>
          <div className="form-group">
            <label>Pilih Customer:</label>
            <select value={customerId} onChange={(e) => setCustomerId(e.target.value)} required>
              <option value="">Pilih Customer</option>
              {customers.map(customer => (
                <option key={customer.id} value={customer.id}>{customer.nama}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Pilih Barang:</label>
            <select value={barangId} onChange={(e) => setBarangId(e.target.value)} required>
              <option value="">Pilih Barang</option>
              {barangOptions.map(barang => (
                <option key={barang.id} value={barang.id}>{barang.nama_barang}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Qty:</label>
            <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Total Transaksi:</label>
            <input type="number" value={totalTransaksi} onChange={(e) => setTotalTransaksi(e.target.value)} required />
          </div>
          <button type="submit">Simpan Transaksi</button>
        </form>
      )}

      <table className="transactions-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nomor Transaksi</th>
            <th>Customer</th>
            <th>Total Transaksi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.nomor_transaksi}</td>
              <td>{transaction.customer ? transaction.customer.nama : 'Customer Name'}</td>
              <td>{transaction.total_transaksi}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(transaction.id)}>
                  Edit
                </button>
                <button className="delete-button" onClick={() => handleDelete(transaction.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsPage;
