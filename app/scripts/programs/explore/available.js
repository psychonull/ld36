import store from '../../store';
import { getDistance, getRisk } from './helpers.js';

export default {
  help: 'list available terrains to explore',
  run: function() {
    let state = store.getState();

    let unexplored = state.terrains.filter( t => !t.explored && !t.exploring);
    if(unexplored.length === 0){
      this.error('NO MORE TERRAINS TO EXPLORE. THE KNOWN WORLD IS FULL OF YOUR CRAZY STUFF');
    }
    else {
      this.echo(unexplored.map( t =>
        `${t.id} - Direction: ${t.direction}
    Distance:${getDistance(t.distance)}
    Risk: ${getRisk(t.risk)}`
      ).join('\n'));
    }
  }
}
