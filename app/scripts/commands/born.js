
import slaveActions from '../actions/slaves';

export default {
  help: 'use born [amount] of slaves',
  run: function(amount) {
    slaveActions.receive(parseInt(amount, 10) || 0);
  }
}
