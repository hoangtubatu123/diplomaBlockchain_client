import React from 'react';
import './App.css';
import NavBar from './screens/Nav';
import Container from './screens/Container';
export default class App extends React.Component {
  render() {
    return (
      <div style={{ paddingRight: 20 }}>
        <p className="App-intro">
          <NavBar />
          <Container />
        </p>
      </div>
    );
  }
}
