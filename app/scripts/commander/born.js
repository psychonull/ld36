
import slaveActions from '../actions/slaves';

export default {
  help: 'use born [number] of slaves',
  run: function(number) {
    slaveActions.receive(parseInt(number, 10) || 0);
  }
}
