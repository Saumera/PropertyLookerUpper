//import * as React from 'react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

// So we can hot reload
declare var require: any;
declare var module: any;

// Cordova device
declare var window: any;


import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import app from './reducers/CombinedReducers'
import theme from './theme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import MainContainer from './components/MainContainer'

var store: any = null;

export function installStore(createdStore: any) {
  store = createdStore;
}

let devtools: any = window['devToolsExtension']
  ? window['devToolsExtension']()
  : (f:any)=>f;
let middleware = applyMiddleware(thunk);

installStore(middleware(devtools(createStore))(app, {}));

let render = () => {
  var base = document.getElementById('react-app');
  console.log(getMuiTheme(theme));
  ReactDOM.unmountComponentAtNode(base);
  ReactDOM.render(
    <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <MainContainer />
    </MuiThemeProvider>
    </Provider>,
    base
  );
}
render();
