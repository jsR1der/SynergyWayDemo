import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const APP_ELEMENT = document.getElementById('app')!;
// const render = (Component: React.ComponentClass<any>) => {
//   ReactDOM.render(<Component />, APP_ELEMENT);
// };

const root = createRoot(APP_ELEMENT);

// render(App);
root.render(<App />);
