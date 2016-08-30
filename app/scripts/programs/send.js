import store from '../store';
import { gather, explore, enslave } from '../actions/campaigns.js';
import { CATEGORY } from '../constants';

const HELP = {
  [CATEGORY.EXPLORATION]: 'send [slaves] [terrain]. Send to explore the specified number of slaves to the terrain',
  [CATEGORY.GATHER]: 'send [slaves] [place]. Send to gather the specified number of slaves to the place.',
  [CATEGORY.ENSLAVE]: 'send [slaves] [place]. Send a specific number of slaves to a places for enslaving new ones.'
};

export default function(category){
  return {
    help: HELP[category],
    run: function(slavesAmount, entityId) {
      let state = store.getState();
      let slavesp = parseInt(slavesAmount, 10);
      let eid = parseInt(entityId, 10);

      const getPlace = () => {
        let [place] = state.places.filter( t => t.id === eid);

        if(!place){
          this.echo('Invalid place. Use [[i;;]available] to see the list of known places');
        }

        return place;
      }

      switch(category){

        case CATEGORY.GATHER: {
          let place = getPlace();
          if (!place) return;
          if(place.gathering){
            return this.echo('Place currently being gather. Use [[i;;]available] to see the full list');
          }
          break;
        }

        case CATEGORY.ENSLAVE: {
          let place = getPlace();
          if (!place) return;
          if(place.enslaving){
            return this.echo('Place currently being enslaving. Use [[i;;]available] to see the full list');
          }
          break;
        }

        case CATEGORY.EXPLORATION: {
          let [terrain] = state.terrains.filter( t => t.id === eid);

          if(!terrain){
            return this.echo('Invalid terrain. Use [[i;;]available] to see the list of terrains known for exploration');
          }
          if(terrain.exploring){
            return this.echo('Terrain currently being explored. Use [[i;;]available] to see the full list');
          }
          if(terrain.explored){
            return this.echo('Terrain already explored. Use [[i;;]available] to see the full list');
          }
          break;
        }
      }

      if(state.slaves.idle < slavesp){
        return this.echo(`Insufficient slaves. You only have ${state.slaves.idle} slaves.`);
      }

      let leg = '';
      switch(category){
        case CATEGORY.GATHER: {
          gather(eid, slavesp, state.time.year);
          leg = `gather place #${eid}`;
          break;
        }
        case CATEGORY.ENSLAVE: {
          enslave(eid, slavesp, state.time.year);
          leg = `enslave place #${eid}`;
          break;
        }
        case CATEGORY.EXPLORATION: {
          explore(eid, slavesp, state.time.year);
          leg = `explore terrain #${eid}`;
          break;
        }
      }

      this.echo(`${slavesp} slaves sent to ${leg}`);
      this.exec('current');
    }
  }
}
