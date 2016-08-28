
import programs from '../programs';

export default {
  help: 'list the available programs',
  run: function() {
    this.echo(Object.keys(programs).join('\n'));
  }
}
