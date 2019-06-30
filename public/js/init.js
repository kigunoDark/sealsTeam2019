(function($) {
  $(function() {
    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.main-page-nav__img').on('click', function() {
      $(this).attr('data-after', 'bar');
    });
  }); // end of document ready
})(jQuery); // end of jQuery name space
