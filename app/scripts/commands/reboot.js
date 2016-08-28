
export default {
  help: 'Restart the system, losing all data and undoing any civilization progress.',
  run: function() {
    this.read(`This will reboot the system, losing all your progress. Are you sure? [Y/n]`, (answer) => {
      if(answer === 'y' || answer === 'Y' || answer === ''){
        this.echo('Rebooting...');
        window.location.reload();
      }
    });
  }
}
