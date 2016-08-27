
import slaveActions from '../actions/slaves';

export default {
  help: 'use kill [number] of slaves',
  run: function(number) {
    slaveActions.die(parseInt(number, 10) || 0);
  }
}
