import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register';
import Transactions from './components/Transactions';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/transactions" component={Transactions} />
      </Switch>
    </Router>
  );
}

export default App;
