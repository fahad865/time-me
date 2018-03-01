import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import './index.css';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer, { initialState } from './reducers';
import { loadProjects } from './actions/projectActions';
import { StoreState } from './types';

const store = createStore<StoreState>(rootReducer, initialState, applyMiddleware(thunk)); 
store.dispatch(loadProjects());
const Root: React.SFC<{}> = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
/*
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
*/