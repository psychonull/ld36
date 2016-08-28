
import resourcesActions from '../actions/resources';

export default {
  help: 'use addresource [type] [amount] of resources to be added',
  run: function(type, amount) {
    let p = '';
    switch (type){
      case 'stone': p = 'receiveStone'; break;
      case 'water': p = 'receiveWater'; break;
      case 'sand': p = 'receiveSand'; break;
      default: {
        this.echo(`${type}: Unknown resource`);
        return;
        break;
      }
    }

    resourcesActions[p](parseInt(amount, 10) || 0);
  }
}
