
const show = () => {
  if(window.localStorage.getItem('disble-interjection')){
    $('#interjection').remove();
  }
  else {
    $('#interjection').modal({
      showClose: false,
      escapeClose: false,
      clickClose: false
    });

    $('#dismisss-interjection').on('click', dismiss);
  }

};

const dismiss = () => {
  if ($('#hide-interjection').is(':checked')){
    window.localStorage.setItem('disble-interjection', true);
  }
  $.modal.close()
};

export default {
  show
};
