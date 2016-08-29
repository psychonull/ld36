
import slaveActions from '../actions/slaves';

export default {
  help: 'use kill [children] [adults] [ageds] of slaves',
  run: function(childs, adults, ageds) {
    slaveActions.die(
      parseInt(childs, 10) || 0,
      parseInt(adults, 10) || 0,
      parseInt(ageds, 10) || 0
    );
  }
}
