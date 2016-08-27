
import store from '../store';

export default {
  help: 'use stats to see your stats',
  run: function() {
    this.echo(`Slaves: ${store.getState().slaves.count}`);
  }
}
