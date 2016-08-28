import store from '../../store';

const getDistance = (d) => {
  return [
    undefined,
    'near',
    'middle',
    'far',
    'far far far away'
  ][d] || 'N/A';
};

const getRisk = (r) => {
  return [
    undefined,
    'low',
    'medium',
    'high'
  ][r] || 'N/A';
};

export default {
  help: 'list available terrains to explore',
  run: function(test) {
    let state = store.getState();

    if(state.explorations.terrains.length === 0){
      this.error('NO MORE TERRAINS TO EXPLORE. THE KNOWN WORLD IS FULL OF YOUR CRAZY STUFF');
    }
    else {
      this.echo(state.explorations.terrains.map((t, i) =>
        `${i + 1} - Direction: ${t.direction}
    Distance:${getDistance(t.distance)}
    Risk: ${getRisk(t.risk)}`
      ).join('\n'));
    }
  }
}
