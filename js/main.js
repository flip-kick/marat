$('.single-item').slick({
  dots: true,
  infinite: true,
  speed: 500,
  prevArrow: '<button type="button" class="slick-prev"><img src="../img/prev.png" alt="prev"></button>',
  nextArrow: '<button type="button" class="slick-next"><img src="../img/next.png" alt="next"></button>'
});

$('.btn, .btn_phone').click(function(){
  $('.popup_container').fadeIn(300);
  $('.tel').mask('+7 (999) 999-99-99');
});

$('.popup_container').click(function(event){
if(event.target == this) {
  $(this).fadeOut(300);
}
});


//Валидация и отправка формы

$(document).ready(function() {
  $('[data-submit]').on('click', function(e) {
      e.preventDefault();
      $(this).parent('.popup_bell').submit();
  })
  $.validator.addMethod(
      "regex",
      function(value, element, regexp) {
          var re = new RegExp(regexp);
          return this.optional(element) || re.test(value);
      },
      "Please check your input."
  );

// Функция валидации и вывода сообщений
  function valEl(el) {

      el.validate({
          rules: {
              tel: {
                  required: true,
                  regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
              },
              name: {
                  required: true
              },
              email: {
                  required: true,
                  email: true
              }
          },
          messages: {
              tel: {
                  required: 'Поле обязательно для заполнения',
                  regex: 'Телефон может содержать символы + - ()'
              },
              name: {
                  required: 'Поле обязательно для заполнения',
              },
              email: {
                  required: 'Поле обязательно для заполнения',
                  email: 'Неверный формат E-mail'
              }
          },


// Начинаем проверку id="" формы
          submitHandler: function(form) {
              $('#loader').fadeIn();
              var $form = $(form);
              var $formId = $(form).attr('id');
              switch ($formId) {
                  // Если у формы id="goToNewPage" - делаем:
                  case 'goToNewPage':
                      $.ajax({
                              type: 'POST',
                              url: $form.attr('action'),
                              data: $form.serialize(),
                          })
                          .always(function(response) {
                              //ссылка на страницу "спасибо" - редирект
                              location.href = 'thx.html';
                              setTimeout(function(){
                                  var url = "http://flip-kick.ru/";
                                  $(location.href).attr(url);
                              }, 3000);
                          });
                      break;
                  // Если у формы id="popupResult" - делаем:
                  case 'popupResult':
                      $.ajax({
                              type: 'POST',
                              url: $form.attr('action'),
                              data: $form.serialize(),
                          })
                          .always(function(response) {
                              setTimeout(function(){
                                  $('.popup_container').hide();
                              });
                              setTimeout(function() {
                                  $('#loader').fadeOut();
                              }, 800);
                              setTimeout(function() {
                                  $('#overlay').fadeIn();
                              setTimeout(function(){
                                  $('#overlay').fadeOut();
                              }, 3000);
                                  $form.trigger('reset');
                                  //строки для остлеживания целей в Я.Метрике и Google Analytics
                              }, 1100);
                              $('#overlay').on('click', function(e) {
                                  $(this).fadeOut();
                              });
                          });
                      break;
              }
              return false;
          }
      })
  }

// Запускаем механизм валидации форм, если у них есть класс .js-form
  $('.popup_bell').each(function() {
      valEl($(this));
  });
  
});
