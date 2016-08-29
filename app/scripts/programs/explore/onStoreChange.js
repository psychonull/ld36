
import explorationsActions from '../../actions/explorations.js';

//const kill = (exploration, timeElapsed, year) => {
//  var amount = 1;
//  //HACK: run even with amount 0, see hack below
//  explorationsActions.death(exploration, amount, year);
//};

export default function(store){
  var state = store.getState();
  state.explorations.current.forEach((e) => {
    //HACK: WARNING: ALERT:
    //this check to avoid infinite looping
    // if(e.lastDeath !== state.time.year){
    //   kill(e, Math.abs(state.time.year - state.time.previousYear), state.time.year);
    // }
    if(e.slavesAlive <= 0){
      explorationsActions.fail(e);
    }
    if(state.time.year >= e.finishedAt){
      explorationsActions.finish(e);
    }
  });
}
