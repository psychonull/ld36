
import timeActions from '../actions/time';

export default {
  help: 'use vel [SECONDS] to change velocity of time or vel RESET',
  run: function(seconds) {
    if (seconds.toLowerCase() === 'reset'){
      window.Time.resetVel();
      return;
    }

    let secs = parseInt(seconds,10);
    if (isNaN(secs)){
      this.echo('Expected a Number in Seconds from 0.1 to 20 - type help vel');
      return;
    }

    window.Time.setVel(secs);
  }
}
