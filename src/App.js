import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './screens/Nav';
import Container from './screens/Container';
export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          <NavBar />
          <Container />
        </p>
      </div>
    );
  }
}
