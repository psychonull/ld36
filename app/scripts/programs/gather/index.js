import commander from '../../commander';
import current from './current.js';
import collect from './collect.js';
import store from '../../store';

const commands = {
  current,
  collect
};

store.subscribe(() => {
  var state = store.getState().gathers;
  //state.current.forEach((e) => {
  //  //TODO: how to know required time to complete?
  //  if(state.time.year - e.sentAt > 10){
  //    explorationsActions.finish(e);
  //  }
  //});
});

export default [commander(commands), {
    prompt: 'gather >',
    onStart: (term) => {
      let state = store.getState().gathers;
      term.echo(
`=============================================
Welcome to the gather module.
There are ${state.length} gathers in progress.
=============================================`
      );
    },
    completion: Object.keys(commands)
  }
];
