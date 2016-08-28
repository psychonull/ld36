
import timeActions from '../actions/time';

export default {
  help: 'use travel FWD || BWD [years] to travel in time',
  run: function(dir, years) {
    let y = parseInt(years, 10) || 0;
    switch(dir){
      case 'FWD': timeActions.travelForward(y); break;
      case 'BWD': timeActions.travelBackward(y); break;
    }
  }
}
