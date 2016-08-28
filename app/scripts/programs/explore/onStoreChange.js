
import explorationsActions from '../../actions/explorations.js';

export default function(store){
  var state = store.getState();
  state.explorations.current.forEach((e) => {
    //TODO: how to know required time to complete?
    if(state.time.year - e.sentAt > 10){
      explorationsActions.finish(e);
    }
  });
}
