import * as React from 'react';
import '../App.css';
import ProjectList from '../containers/ProjectList';
import Header from './common/Header';

// const logo = require('./logo.svg');

function ProjectsPage() {
  return (
    <div className="App">
      <Header />
      <ProjectList />
    </div>
  );
}

export default ProjectsPage;
