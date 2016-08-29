
import explorationsActions from '../../actions/explorations.js';

export default function(store){
  var state = store.getState();
  state.explorations.current.forEach((e) => {
    //TODO: how to know required time to complete?
    if(e.slavesAlive <= 0){
      explorationsActions.fail(e);
    }
    if(state.time.year >= e.finishedAt){
      explorationsActions.finish(e);
    }
  });
}
