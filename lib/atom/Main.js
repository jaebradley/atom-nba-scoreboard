'use babel';

import React from 'react';;

import { initRoot, render, togglePanel } from '../components/Render';
import { onActivate, onDeactivate } from './Subscriptions';

class Main {
  constructor() {
    this.root = initRoot();
  }

  consumeStatusBar(statusBar) {
    statusBar.addLeftTile({
      item: this.root,
      priority: -1000
    });

    onActivate();

    render(this.root);
  }

  deactivate() {
    onDeactivate();
  }

  toggle() {
    togglePanel();
  }
};

export default new Main();
