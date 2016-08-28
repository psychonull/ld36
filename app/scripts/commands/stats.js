
import AsciiTable from 'ascii-table';
import store from '../store';

export default {
  help: 'use stats to see your stats',
  run: function() {
    let state = store.getState();
    let y = state.time.year;

    var yTab = new AsciiTable()
    yTab
      .setBorder('=')
      .addRow(
        AsciiTable.align(AsciiTable.CENTER, 'YEAR', 19),
        AsciiTable.align(AsciiTable.CENTER, `${Math.abs(y)} ${(y < 0 ? 'B.C.' : 'A.C.')}`, 19)
      );

    let slTab = new AsciiTable('Slaves');

    slTab
      .setHeading(
        AsciiTable.align(AsciiTable.CENTER, 'Childs', 8),
        AsciiTable.align(AsciiTable.CENTER, 'Adults', 8),
        AsciiTable.align(AsciiTable.CENTER, 'Elderlies', 8),
        AsciiTable.align(AsciiTable.CENTER, 'Total', 8)
      )
      .addRow(
        state.slaves.childs,
        state.slaves.adults,
        state.slaves.ageds,
        state.slaves.total
      )
      .setAlignRight(0)
      .setAlignRight(1)
      .setAlignRight(2)
      .setAlignRight(3);

    let resTab = new AsciiTable('Resources');

    resTab
      .setHeading(
        AsciiTable.align(AsciiTable.CENTER, 'Water', 12),
        AsciiTable.align(AsciiTable.CENTER, 'Stone', 12),
        AsciiTable.align(AsciiTable.CENTER, 'Sand', 12))
      .addRow(
        `${state.resources.water} lt`,
        `${state.resources.stone} kg`,
        `${state.resources.sand} kg`)
      .setAlignRight(0)
      .setAlignRight(1)
      .setAlignRight(2);

    this.echo(yTab.toString());
    this.echo(slTab.toString());
    this.echo(resTab.toString());
  }
}
