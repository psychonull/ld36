
// TODO: Apply Actors concept here
// http://jamesknelson.com/join-the-dark-side-of-the-flux-responding-to-actions-with-actors/


import { fail, finish } from '../../actions/explorations.js';
import store from '../../store';

//const kill = (exploration, timeElapsed, year) => {
//  var amount = 1;
//  //HACK: run even with amount 0, see hack below
//  explorationsActions.death(exploration, amount, year);
//};

export default function (){
  var state = store.getState();

  state.explorations.filter( exp => !exp.finished).forEach( e => {
    //HACK: WARNING: ALERT:
    //this check to avoid infinite looping
    // if(e.lastDeath !== state.time.year){
    //   kill(e, Math.abs(state.time.year - state.time.previousYear), state.time.year);
    // }
    if(e.slavesAlive <= 0){
      fail(e.id);
    }
    if(state.time.year >= e.finishAt){
      finish(e.id);
    }
  });
}
