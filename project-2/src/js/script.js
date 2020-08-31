
$(document).ready(function(){
    $('.slaider__wrapper').slick({
      prevArrow: '<button type="button" class="slick-prev"><img src="../img/icons/arrow.png"></img></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="../img/icons/arrow.png"></img></button>',
      adaptiveHeight: true,
      responsive:[{
        breakpoint: 950,
        settings:{
          arrows: false,
          dots: true
        }
      }]
    });
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    // $('.catalog-item__more').each(function(i){
    //   $(this).on('click', function(e) {
    //     e.preventDefault();
    //     $('.atalog__content').eq(i).toggleClass('catalog__content_active')
    //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     $('.catalog-item__inf')
    //     .eq(i).toggleClass('catalog-item__inf_active');
    //   });
    // });

    // $('.catalog-item__back').each(function(i){
    //   $(this).on('click', function(e) {
    //     e.preventDefault();
    //     $('.atalog__content').eq(i).toggleClass('catalog__content_active')
    //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
    //     $('.catalog-item__inf')
    //     .eq(i).toggleClass('catalog-item__inf_active');
    //   });
    // });

    function SlideClass(item){
      $(item).each(function(i){
        $(this).on('click', function(e) {
          e.preventDefault();
          $('.atalog__content').eq(i).toggleClass('catalog__content_active');
          $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          $('.catalog-item__inf')
          .eq(i).toggleClass('catalog-item__inf_active');
        });
      });
    }
    SlideClass('.catalog-item__more');
    SlideClass('.catalog-item__back');

    //modal


    $('[data-modal=consultation]').on('click', function(){
      $('.overlay, #consultation').fadeIn();
    });


    $('.button_mini').each(function(i){
      $(this).on('click', function(){     
        $('#buy .modal__subtitle').text($('.catalig-item__subtitle').eq(i).text());
        $('.overlay, #buy').fadeIn();
      });
    });
    

    $('.modal__close').on('click', function(){
      $('.overlay, #buy, #consultation, #thanks').fadeOut();
    });

    
    // $('#consultation form').validate({
    //   rules: {
    //     email: {
    //       required: true,
    //       email: true,
    //     }
    //   },
    //   messages: {
    //     name: "Пожалуйста введите свое имя",
    //     phone: "Пожалуйста введите свой телефон",
    //     email: {
    //       required: "Пожалуйста введите свою почту",
    //       email: "Не правильно введена почта"
    //     }
    //   }
    
    
    // });
    
    // $('#buy form').validate();
    // $('#consultation-main').validate();

    
    function validateForms(form){
      $(form).validate({
        rules: {
          email: {
            required: true,
            email: true,
          }
        },
        messages: {
          name: "Пожалуйста введите свое имя",
          phone: "Пожалуйста введите свой телефон",
          email: {
            required: "Пожалуйста введите свою почту",
            email: "Не правильно введена почта"
          }
        }

      });
    }
    validateForms('#consultation form');
    validateForms('#buy form');
    validateForms('#consultation-main');

// phone
    jQuery(function($){
      $("input[name=phone]").mask("+380 99-999-9999");
   });

// phpMailor

  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){

      $(this).find("input").val("");
      $('#buy, #consultation').fadeOut();
      $('.overlay, #thanks').fadeIn();
      $('form').trigger('reset');
      

    });
    return false;

  });


//pageup

  $(window).scroll(function(){
    if ($(this).scrollTop() > 1300){
      $('.pageup').fadeIn();
    }else{
      $('.pageup').fadeOut();
    }

  });
  $("a[href^='#up']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
});

});







