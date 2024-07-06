import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register';
import TransactionsList from './components/TransactionsList';
import AddTransaction from './components/AddTransaction';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/transactions" element={<TransactionsList />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
      </Switch>
    </Router>
  );
}

export default App;
