import store from '../../store';
import { collect } from '../../actions/gathers';

export default {
  help: 'collect [resource] [terrain] [slaves]',
  run: function(resource, place, slaves) {
    let state = store.getState();

    if (state.places.idle < parseInt(place,10)){
      this.echo(`Not enough available slaves. Max ${state.slaves.idle} slaves`);
      return;
    }

    if (state.slaves.idle < parseInt(slaves,10)){
      this.echo(`Not enough available slaves. Max ${state.slaves.idle} slaves`);
      return;
    }

    collect(resource, place, parseInt(slaves,10));
  }
}
