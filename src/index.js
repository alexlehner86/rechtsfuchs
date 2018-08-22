// ---------------------------------------------------------------------------
//  The index-File renders the whole react app, wrapped in the redux provider
// ---------------------------------------------------------------------------

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
