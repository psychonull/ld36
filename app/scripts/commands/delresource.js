
import resourcesActions from '../actions/resources';

export default {
  help: 'use delresource [type] [amount] of resources to be droped',
  run: function(type, amount) {
    let p = '';
    switch (type){
      case 'stone': p = 'looseStone'; break;
      case 'water': p = 'looseWater'; break;
      case 'sand': p = 'looseSand'; break;
      default: {
        this.echo(`${type}: Unknown resource`);
        return;
        break;
      }
    }

    resourcesActions[p](parseInt(amount, 10) || 0);
  }
}
