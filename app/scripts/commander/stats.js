
import store from '../store';

export default {
  help: 'use stats to see your stats',
  run: function() {
    let state = store.getState();
    this.echo(`- ${state.slaves.count} Slaves`);
    this.echo('- Resources:');
    this.echo(`  - ${state.resources.water} lts of water`);
    this.echo(`  - ${state.resources.stone} kg of stone`);
    this.echo(`  - ${state.resources.sand} kg of sand`);
  }
}
