import store from '../../store';

export default {
  help: 'list recent exploration campaigns',
  run: function(test) {
    let state = store.getState();

    if(state.explorations.recent.length === 0){
      this.echo('No recent exploration campaigns');
    }
    else {
      this.echo(state.explorations.recent.map((e,i) => 'terrain ' + i).join('\n'));
    }
  }
}
