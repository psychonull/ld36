
import { fail, finish } from '../../actions/campaigns.js';
import store from '../../store';
import { CATEGORY } from '../../constants';

//const kill = (exploration, timeElapsed, year) => {
//  var amount = 1;
//  //HACK: run even with amount 0, see hack below
//  explorationsActions.death(exploration, CATEGORY.EXPLORATION, amount, year);
//};

export default function (){
  var state = store.getState();

  state.campaigns
    .filter( c => !c.finished && c.category === CATEGORY.EXPLORATION)
    .forEach( e => {
      //HACK: WARNING: ALERT:
      //this check to avoid infinite looping
      // if(e.lastDeath !== state.time.year){
      //   kill(e, Math.abs(state.time.year - state.time.previousYear), state.time.year);
      // }
      if(e.slavesAlive <= 0){
        fail(e.id, CATEGORY.EXPLORATION);
      }
      if(state.time.year >= e.finishAt){
        finish(e.id, CATEGORY.EXPLORATION);
      }
    });
}
