import * as React from 'react';
import './App.css';
// import TimeLogList from './containers/TimeLogList';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        Click the play icon to start logging activities
        <Footer handleChatMessage={this.handleChatMessage} />
      </div>
    );
  }

  firstEntityValue = (entities: any, entity: string) => {
    const val = entities && entities[entity] &&
      Array.isArray(entities[entity]) &&
      entities[entity].length > 0 &&
      entities[entity][0].value
    ;
    if (!val) {
      return null;
    }
    return val;
  }

  handleChatMessage = (value: string) => {
    // tslint:disable-next-line:no-console
    console.log(`Message received: ${value}`);
    fetch(`https://api.wit.ai/message?v=20190912&q=${value}`, {
      method: 'get',
      headers: {
        'Authorization': 'Bearer 34UPWTPZSPKOA6RGXKNH3YF3PKXGW5CI'
      }
    })
    .then(response => Promise.resolve(response.json()))
    .then(response => {
      // tslint:disable-next-line:no-console
    console.dir(response);
    });    
  }
}

export default App;
