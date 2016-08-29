import store from '../../store';
import AsciiTable from 'ascii-table';
import { getDistance, getRisk, getDirection } from '../helpers.js';

const getTable = (terrains) => {
  let table = new AsciiTable('Unexplored Terrains');

  table.setHeading(
    AsciiTable.align(AsciiTable.CENTER, '#', 3),
    AsciiTable.align(AsciiTable.CENTER, 'Direction', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Distance', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Risk', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Exploring', 9)
  );

  terrains.forEach( t => {
    table.addRow(
      t.id,
      getDirection(t.direction),
      getDistance(t.distance),
      getRisk(t.risk),
      t.exploring ? 'YES' : 'NO'
    )
    .setAlignCenter(0)
    .setAlignCenter(1)
    .setAlignCenter(2)
    .setAlignCenter(3)
    .setAlignCenter(4);
  });

  return table.toString();
};

export default {
  help: 'list available terrains to explore',
  run: function() {
    let state = store.getState();

    let unexplored = state.terrains.filter( t => !t.explored);
    if(unexplored.length === 0){
      this.error('NO MORE TERRAINS TO EXPLORE. THE KNOWN WORLD IS FULL OF YOUR CRAZY STUFF');
    }
    else {
      return this.echo(getTable(unexplored));
    }
  }
}
