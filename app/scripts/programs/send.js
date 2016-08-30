import store from '../store';
import { gather, explore, enslave, build } from '../actions/campaigns.js';
import { CATEGORY } from '../constants';
import buildings from '../data/buildings';

const HELP = {
  [CATEGORY.EXPLORATION]: 'send [slaves] [terrain]. Send to explore the specified number of slaves to the terrain',
  [CATEGORY.GATHER]: 'send [slaves] [place]. Send to gather the specified number of slaves to the place.',
  [CATEGORY.ENSLAVE]: 'send [slaves] [place]. Send a specific number of slaves to a places for enslaving new ones.',
  [CATEGORY.BUILD]: 'send [slaves] [place] [build]. Send a number of slaves to a place for building structures.'
};

export default function(category){
  return {
    help: HELP[category],
    run: function(slavesAmount, entityId, thirdId) {
      let state = store.getState();
      let slavesp = parseInt(slavesAmount, 10);
      let eid = parseInt(entityId, 10);
      let tid = parseInt(thirdId, 10) - 1;

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

        case CATEGORY.BUILD: {
          let place = getPlace();
          if (!place) return;
          if(place.building){
            return this.echo('Currently building a structure on that Place. Use [[i;;]available] to see the full list');
          }

          if (!buildings[tid]){
            return this.echo('Invalid building. Use [[i;;]buildings] to see the list of buildings');
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
        case CATEGORY.BUILD: {
          let cost = buildings[tid].resources;
          let wallet = state.resources;

          let noFounds = false;
          if (cost.sand > wallet.sand) {
            this.echo(`Insufficient sand. You only have ${wallet.sand} kg.`);
            noFounds = true;
          }
          if (cost.water > wallet.water) {
            this.echo(`Insufficient water. You only have ${wallet.water} lt.`);
            noFounds = true;
          }
          if (cost.stone > wallet.stone) {
            this.echo(`Insufficient stone. You only have ${wallet.stone} kg.`);
            noFounds = true;
          }

          if (noFounds) return;

          build(eid, tid, slavesp, state.time.year);
          leg = `place #${eid} for building [[;;;h]${buildings[tid].name}]`;
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
