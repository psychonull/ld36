
import testActs from '../actions/test';

export default {
  help: 'use inc [number] to increase the count on the store',
  run: function(number) {
    // this is the terminal
    this.echo(`running INC with ${number}`);
    testActs.increment(parseInt(number, 10) || 0);
  }
}
