import * as React from 'react';
import './App.css';
// import TimeLogList from './containers/TimeLogList';
import Header from './components/common/Header';

// const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        Click the play icon to start logging activities
      </div>
    );
  }
}

export default App;
