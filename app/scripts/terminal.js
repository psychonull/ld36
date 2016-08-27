
const PAD = 20;

const getWSize = () => {
  return {
    height: $(window).height() - PAD * 2,
    width: $(window).width() - PAD * 2
  };
};

const init = () => {
  let wSize = getWSize();

  $('#term').terminal(function(command, term) {

    if (command !== '') {
      var result = window.eval(command);
      if (result != undefined) {
        term.echo(String(result));
      }
    }

    $(window).resize(function() {
      let wSize = getWSize();
      term.resize(wSize.width, wSize.height);
    });
  }, Object.assign(wSize, {
    greetings: '///// LD36 ///// ',
    name: 'ld36',
    //height: $(window).height() - PAD * 2,
    //width: $(window).width() - PAD * 2,
    prompt: '$ '
  }));


};

export default {
  init
};
