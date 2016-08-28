
import AsciiTable from 'ascii-table';
import store from '../store';


const getTable = (places) => {
  let table = new AsciiTable('Known places');

  table.setHeading(
    AsciiTable.align(AsciiTable.CENTER, '#', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Sand', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Water', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Stone', 8),
    AsciiTable.align(AsciiTable.CENTER, 'People', 8)
  );

  places.forEach((p, i) => {
    table.addRow(
      i + 1,
      p.resources.sand,
      p.resources.water,
      p.resources.stone,
      p.people
    )
    .setAlignRight(0)
    .setAlignRight(1)
    .setAlignRight(2)
    .setAlignRight(3);
  });

  return table.toString();

};

export default {
  help: 'list the known places ready for exploitation',
  run: function() {
    let state = store.getState();
    let places = state.explorations.places;

    if(places.length === 0){
      return this.echo('No places knwon. Use the [[i;;]explore] program first.');
    }
    else {
      return this.echo(getTable(places));
    }

  }
}
