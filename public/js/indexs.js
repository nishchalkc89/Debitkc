
function onClickMenu() {

  var display = $(".navbar").css("display")
  var yellow = "none"
  var show = $('.mobile-nav-icon[name="close"]').css("display")



  if (display !== yellow) {
    $('.navbar').css({
      'display': 'none',

    });

  } else {
    $('.navbar').css({
      'display': 'flex',

    });

  }
  if (show == yellow) {


    $('.mobile-nav-icon[name="close"]').css({
      'display': 'flex',
      "color": "white",

    });

    $('.mobile-nav-icon[name="menu"]').css({
      'display': 'none',
    });

  } else {
    $('.mobile-nav-icon[name="close"]').css({
      'display': 'none',

    });
    $('.mobile-nav-icon[name="menu"]').css({
      'display': 'flex',
    });
  }

};















