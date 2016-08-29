
import AsciiTable from 'ascii-table';
import store from '../store';


const getTable = (places) => {
  let table = new AsciiTable('Known places');

  table.setHeading(
    AsciiTable.align(AsciiTable.CENTER, '#', 3),
    AsciiTable.align(AsciiTable.CENTER, 'Sand kg', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Water lt', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Stone kg', 8),
    AsciiTable.align(AsciiTable.CENTER, 'People', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Gathering', 9),
    AsciiTable.align(AsciiTable.CENTER, 'Enslaving', 9)
  );

  places.forEach((p, i) => {
    table.addRow(
      p.id,
      p.resources.sand,
      p.resources.water,
      p.resources.stone,
      p.people,
      p.gathering ? 'YES' : 'NO',
      p.enslaving ? 'YES' : 'NO'
    )
    .setAlignCenter(0)
    .setAlignRight(1)
    .setAlignRight(2)
    .setAlignRight(3)
    .setAlignRight(4)
    .setAlignCenter(5)
    .setAlignCenter(6);
  });

  return table.toString();

};

export default {
  help: 'list the known places ready for exploitation',
  run: function() {
    let state = store.getState();
    let places = state.places;

    if(places.length === 0){
      return this.echo('No places knwon. Use the [[i;;]explore] program first.');
    }
    else {
      return this.echo(getTable(places));
    }

  }
}
