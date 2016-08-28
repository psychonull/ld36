import store from '../../store';

export default {
  help: 'list exploration campaigns in course',
  run: function(test) {
    let state = store.getState();

    if(state.explorations.current.length === 0){
      this.echo('No exploration campaigns in course');
    }
    else {
      this.echo(state.explorations.current.map((e,i) => 'campaign ' + i).join('\n'));
    }
  }
}
