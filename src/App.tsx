import * as React from 'react';
import './App.css';
import { Button } from 'antd';
import { Project } from './types/index';
// import Project from './components/Project';
import Projects from './components/Projects';

const logo = require('./logo.svg');

class App extends React.Component {
  projects: Project[];
  render() {
    this.projects = [];
    for (let i = 0; i < 10; i++) {
      this.projects.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        hourlyRate: i,
        currency: 'USD'        
      });
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Projects projects={this.projects} />
        <Button type="primary">Button</Button>
      </div>
    );
  }
}

export default App;
