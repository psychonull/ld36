import store from '../../store';

export default {
  help: 'list available terrains to explore',
  run: function(test) {
    let state = store.getState();

    if(state.explorations.terrains.length === 0){
      this.error('NO MORE TERRAINS TO EXPLORE. THE KNOWN WORLD IS FULL OF YOUR CRAZY STUFF');
    }
    else {
      this.echo(state.explorations.terrains.map((e,i) => 'campaign ' + i).join('\n'));
    }
  }
}
