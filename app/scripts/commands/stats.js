
import AsciiTable from 'ascii-table';
import store from '../store';

export default {
  help: 'use stats to see your stats',
  run: function() {
    let state = store.getState();

    var slTab = new AsciiTable()
    slTab
      .setBorder('=')
      .addRow(
        AsciiTable.align(AsciiTable.CENTER, state.slaves.count, 10),
        AsciiTable.align(AsciiTable.CENTER, 'SLAVES', 23));

    let resTab = new AsciiTable('Resources');

    resTab
      .setHeading(
        AsciiTable.align(AsciiTable.CENTER, 'Water', 10),
        AsciiTable.align(AsciiTable.CENTER, 'Stone', 10),
        AsciiTable.align(AsciiTable.CENTER, 'Sand', 10))
      .addRow(
        `${state.resources.water} lt`,
        `${state.resources.stone} kg`,
        `${state.resources.sand} kg`)
      .setAlignRight(0)
      .setAlignRight(1)
      .setAlignRight(2);

    this.echo(slTab.toString())
    this.echo(resTab.toString());
  }
}
