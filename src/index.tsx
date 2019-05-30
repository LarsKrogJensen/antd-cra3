import React from 'react';
import ReactDOM from 'react-dom';
import 'index.less';
import App from './app/App';

const rootEl = document.getElementById('root')

ReactDOM.render(<App/>, rootEl);

if ((module as any).hot) {
    (module as any).hot.accept('./app/App', () => {
    const NextApp = require('./app/App').default
    ReactDOM.render(
      <NextApp />,
      rootEl
    )
  })
}