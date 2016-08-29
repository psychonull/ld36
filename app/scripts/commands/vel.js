
import timeActions from '../actions/time';

export default {
  help: 'use vel [SECONDS] to change velocity of time or vel RESET',
  run: function(seconds) {
    if (seconds === 'RESET'){
      window.Time.resetVel();
      return;
    }

    window.Time.setVel(parseInt(seconds,10));
  }
}
