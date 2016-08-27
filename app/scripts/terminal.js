
const init = () => {
  $('#term').terminal(function(command, term) {
    if (command !== '') {
      var result = window.eval(command);
      if (result != undefined) {
        term.echo(String(result));
      }
    }
  }, {
    greetings: 'Javascript Interpreter',
    name: 'js_demo',
    height: 200,
    width: 450,
    prompt: 'js> '
  });
};

export default {
  init
};
