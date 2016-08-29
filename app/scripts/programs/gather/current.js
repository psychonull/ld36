import store from '../../store';

export default {
  help: 'list gather processes in course',
  run: function() {
    let state = store.getState().gathers;

    if(state.current.length === 0){
      this.echo('No gather campaigns in course');
    }
    else {
      this.echo(state.current.map((e,i) => 'campaign ' + i).join('\n'));
    }
  }
}
