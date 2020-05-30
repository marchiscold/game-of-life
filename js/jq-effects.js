$(function(){  
  $('.header__note').fadeOut(5000);
  $.notify.addStyle('happyblue', {
    html: "<div><span data-notify-text/></div>",
    classes: {
      base: {
        "padding": "10px 10px",
        "white-space": "nowrap",
        "background-color": "palegreen",
        "color": "black"
      },
      superblue: {
        "color": "white",
        "background-color": "blue"
      }
    }
  });
});
