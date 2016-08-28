$(function() {
  hide_header();
  smooth_scrolling();
  showcase_slider();
  showcase_content_loader();

  // animations:
  AOS.init({
    disable: 'mobile',
    easing: 'ease-in',
    duration: 500
  });
});

// animations
$('#main_header .hgroup').attr('data-aos', 'fade-right');
$('#main_header nav').attr('data-aos', 'fade-left');
$('#banner h1').attr('data-aos', 'zoom-in');
$('#banner h2').attr('data-aos', 'flip-up').attr('data-aos-delay', '100');
$('#skills').attr('data-aos', 'fade-in').attr('data-aos-delay', '100');;
$('#showcase li').attr('data-aos', 'zoom-in');
$('#contact').attr('data-aos', 'zoom-in-up');

// Hide header on on scroll down
function hide_header() {
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('#main_header').outerHeight();

  $(window).scroll(function(event) {
      didScroll = true;
  });

  function has_scrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
      return;

    // If they scrolled down and are past the navbar, add class .nav_up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
         $('#main_header').removeClass('nav_down').addClass('nav_up');
      } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('#main_header').removeClass('nav_up').addClass('nav_down');
        }
    }

    lastScrollTop = st;
  }

  setInterval(function() {
      if (didScroll) {
          has_scrolled();
          didScroll = false;
      }
  }, 250);
}

// Smooth scrolling
function smooth_scrolling() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
    && location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
}

function showcase_slider() {
  $('#showcase .item').click(function() {
    $('.showcase_slider').css('left', '-100%');
    $('.project_wrapper').removeClass('hidden');
    $('.thumbs').addClass('hidden');
    return false;
  });

  $('#showcase .project_wrapper .go_back').click(function() {
    $('.showcase_slider').css('left', '0');
    $('.project_wrapper').addClass('hidden');
    $('.thumbs').removeClass('hidden');
    return false;
  });
}

function showcase_content_loader() {
  $('#showcase .item').click(function() {

    // hide images container and add loading
    var spinner = '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
    $('.project_wrapper .project_images').hide().after(spinner);

    var $this = $(this),
        name = $this.find('.item_about h2').text(),
        about = $this.attr('data-about'),
        skills = $this.attr('data-skills'),
        online = $this.attr('data-online'), // link to online version
        count = $this.attr('data-count'), // qty of project images
        folder = name.toLowerCase().replace(/ /g, '_'); // transform project name to folder name

    $('.project_wrapper h2').text(name);
    $('.project_wrapper .description').text(about);
    $('.project_wrapper .skills span').text(skills);

    // if online link, then add it to the DOM
    if(typeof online !== typeof undefined && online !== false) {
      var online_html = '<a href="http://' + online + '/"><i class="icon icon-link"></i> zobacz online</a>';
      $('.project_wrapper .online').html(online_html);
    } else {
      $('.project_wrapper .online').html('');
    }

    // load img
    var img_path = 'assets/img/projects/' + folder + '/project_1.png';
    $('.project_wrapper .project_images').html(
      '<a href="' + img_path
      + '" target="_blank" title="Otwórz w nowym oknie"><img src="'
      + img_path + '" alt="' + name + '"></a>'
    );

    $('.project_wrapper .project_images').delay(800).fadeIn(function() {
      $('.spinner').remove();
    });

  });
}
