'use babel';

import { CompositeDisposable } from 'atom';
import { togglePanel, unmount } from '../components/Render';

const subscriptions = new CompositeDisposable;

export function onActivate() {
  subscriptions.add(
    atom.commands.add('atom-workspace', {
      'atom-nba:toggle': () => togglePanel()
    }),
  );
  return subscriptions;
}

export function onDeactivate() {
  window.onresize = null;
  unmount();
  subscriptions.dispose();
}
