'use babel';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Games from './Games';

export function render(target: HTMLElement) {
  ReactDOM.render(
    <Games />,
    target
  )
}

let root = null;
const rootName = 'atom-nba';

export function unmount() {
  ReactDOM.unmountComponentAtNode(root);
}

export function initRoot() {
  root = document.createElement('div');
  root.setAttribute('id', rootName);
  root.hidden = false;
  return root;
}

export function togglePanel() {
  root.hidden = !root.hidden;
}
