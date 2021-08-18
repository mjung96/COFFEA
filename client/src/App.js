import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <AuthProvider>
      <Router> 
      <Container>
        <MenuBar />
        <Route exact path="/" component={Home}/>
        <AuthRoute exact path="/login" component={Login}/>
        <AuthRoute exact path="/register" component={Register}/>
      </Container>
    </Router>
    </AuthProvider>

    // <Router> 
    //   <Container>
    //     <MenuBar />
    //     <Route exact path="/" component={Home}/>
    //     <Route exact path="/login" component={Login}/>
    //     <Route exact path="/register" component={Register}/>
    //   </Container>
    // </Router>
    //<div><h1>COFFEEEEEE</h1></div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
