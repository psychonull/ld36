
import timeActions from '../actions/time';

export default {
  help: 'set the amount of seconds that makes 1 year pass (the greater the slower - default 10). Usage: vel [SECONDS | RESET]',
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
