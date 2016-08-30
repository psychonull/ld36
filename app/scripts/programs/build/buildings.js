import AsciiTable from 'ascii-table';
import buildings from '../../data/buildings';

const getTable = (buildings) => {
  let table = new AsciiTable('Buildings');

  table.setHeading(
    AsciiTable.align(AsciiTable.CENTER, '#', 3),
    AsciiTable.align(AsciiTable.CENTER, 'Name', 10),
    AsciiTable.align(AsciiTable.CENTER, 'Cost Sand', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Cost Water', 8),
    AsciiTable.align(AsciiTable.CENTER, 'Cost Stone', 8),
  );

  buildings.forEach( (b, i) => {
    table.addRow(
      i+1,
      b.name,
      b.resources.sand + ' kg',
      b.resources.water + ' lt',
      b.resources.stone + ' kg'
    )
    .setAlignCenter(0)
    .setAlignLeft(1)
    .setAlignRight(2)
    .setAlignRight(3)
    .setAlignRight(4);
  });

  return table.toString();
};

export default {
  help: 'list buildings to construct',
  run: function() {
    return this.echo(getTable(buildings));
  }
}
