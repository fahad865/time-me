import * as React from 'react';
import './App.css';
import ProjectList from './containers/ProjectList';
import Header from './components/common/Header';

// const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">           
        <Header />   
        <ProjectList />        
      </div>
    );
  }
}

export default App;
