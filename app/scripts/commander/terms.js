
export default {
  help: 'see terms of use and conditions',
  run: function() {
    this.echo(`This is free software. `);
    $.terminal.active.set('lol');
  }
}
