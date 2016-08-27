
import slaveActions from '../actions/slaves';

export default {
  help: 'use kill [amount] of slaves',
  run: function(amount) {
    slaveActions.die(parseInt(amount, 10) || 0);
  }
}
