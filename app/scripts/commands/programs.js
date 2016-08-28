import AsciiTable from 'ascii-table';
import programs from '../programs';

export default {
  help: 'list the available programs',
  run: function() {
    let table = new AsciiTable();

    Object.keys(programs).forEach( c => {
      table.addRow(`  ${c}`);
    });

    table.removeBorder();
    this.echo(table.toString());
  }
}
