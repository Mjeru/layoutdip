$(
	(function () {
		function disableScroll() {
			let padding = window.innerWidth - document.body.offsetWidth;
			console.log(padding);
			let pagePosition = window.scrollY;
			document.body.classList.add(`lock`);
			document.body.dataset.position = pagePosition;
			document.body.style.top = -pagePosition + `px`;
			document.body.style.paddingRight = padding + `px`;
		}
		function enableScroll() {
			
			let pagePosition = parseInt(document.querySelector(`.lock`).dataset.position, 10);
			document.querySelector(`.lock`).style.top = `auto`;
			document.body.classList.remove(`lock`);
			window.scroll({top: pagePosition, left: 0} )
			document.body.removeAttribute(`dataset`);
			document.body.removeAttribute(`style`);
		}
		$(document).ready(function () {

            $(".callForm").submit(function(){ // перехватываем все при событии отправки
                var form = $(this); // запишем форму, чтобы потом не было проблем с this
                var error = false; // предварительно ошибок нет
                form.find('input, textarea').each( function(){ // пробежим по каждому полю в форме
                    if ($(this).val() == '') { // если находим пустое
                        alert('Заполните поле "'+$(this).attr('placeholder')+'"!'); // говорим заполняй!
                        error = true; // ошибка
                    }
                });
                if (!error) { // если ошибки нет
                    var data = form.serialize(); // подготавливаем данные
                    $.ajax({ // инициализируем ajax запрос
                       type: 'POST', // отправляем в POST формате, можно GET
                       url: 'mail.php', // путь до обработчика, у нас он лежит в той же папке
                       dataType: 'json', // ответ ждем в json формате
                       data: data, // данные для отправки
                       beforeSend: function(data) { // событие до отправки
                            form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
                          },
                       success: function(data){ // событие после удачного обращения к серверу и получения ответа
                               if (data['error']) { // если обработчик вернул ошибку
                                   alert(data['error']); // покажем её текст
                               } else { // если все прошло ок
                                   alert('Письмо отвравлено!');
                                   $(`.popup`).animate({ opacity: 0 }, 200, `linear`);
				enableScroll();
				window.setTimeout(() => {
					$(`.popup`).addClass(`visually-hidden`);
				}, 350);
                                    // пишем что все ок
                               }
                         },
                       error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
                            alert(xhr.status); // покажем ответ сервера
                            alert(thrownError); // и текст ошибки
                         },
                       complete: function(data) { // событие после любого исхода
                            form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
                         }
                                  
                         });
                }
                return false; // вырубаем стандартную отправку формы
            });





			let topPadding = 0;
			if (document.body.clientWidth < 1024) {
				topPadding = 54;
            }else if((document.body.clientWidth > 1023) && (document.body.clientWidth < 1500)){
                topPadding = 54;
            }
            window.onscroll = ()=>{if(window.scrollY > 28){
                $(`.header__list`).addClass(`header__list-pad`)
                $(`.header`).addClass(`header-pad`)
                $(`.header__link`).addClass(`header__link-pad`)
                
            }if((window.scrollY < 29)){
                if (!($(`body`).hasClass(`lock`))){
                    $(`.header__list`).removeClass(`header__list-pad`)
                $(`.header`).removeClass(`header-pad`)
                $(`.main`).removeClass(`main-pad`)
                $(`.header__link`).removeClass(`header__link-pad`)}
            }};
            
			window.addEventListener(`resize`, () => {
				if (document.body.clientWidth < 1500) {
					topPadding = 54;
				}else topPadding = 0;
            });
            
			$(`.popup__input-phone`).mask("+7(000)000-00-00", {
				placeholder: "+7(___)___-__-__",
			});
			$(`.slider`).slick({
				arrows: true,
				dots: true,
				slidesToShow: 3,
				responsive: [
					{
						breakpoint: 1500,
						settings: {
							slidesToShow: 2,
							arrows: false
						},
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 1,
							arrows: false
						},
					},
				],
			});

			$(".header__list-item").on("click", function (e) {
                e.preventDefault();
                console.log(topPadding);
				$("html,body").animate(
					{
						scrollTop:
							$(`${e.target.getAttribute(`href`)}`).offset().top - topPadding,
					},
					700
				);
			});

			$(".footer__links-item").on("click", function (e) {
				e.preventDefault();
				$("html,body").animate(
					{
						scrollTop:
							$(`${e.target.getAttribute(`href`)}`).offset().top - topPadding,
					},
					700
				);
			});
			$(".description__link").on("click", function (e) {
				e.preventDefault();
				$("html,body").animate(
					{
						scrollTop:
							$(`${e.target.getAttribute(`href`)}`).offset().top - topPadding,
					},
					700
				);
			});
			$(".intro__link").on("click", function (e) {
				e.preventDefault();
				$("html,body").animate(
					{
						scrollTop:
							$(`${e.target.getAttribute(`href`)}`).offset().top - topPadding,
					},
					700
				);
			});
		});
		$(".burger").on("click", function (e) {
            $(`.burger`).toggleClass(`burger-active`);
			if ($(`.header__list`).hasClass(`burger-open`)) {
				$(`.header__list`).animate({ opacity: 0 }, 200, `linear`);
				window.setTimeout(() => {
					$(`.header__list`).removeClass(`burger-open`);
					$(`.header__list`).removeAttr("style");
				}, 350);
			} else {
				$(`.header__list`).toggleClass(`burger-open`);
				$(`.header__list`).animate({ opacity: 1 }, 200, `linear`);
			}
        });
        $(".header__list-a").on("click", ()=>{
            $(`.burger`).removeClass(`burger-active`)
            if (document.body.clientWidth < 1500) {
				$(`.header__list`).animate({ opacity: 0 }, 200, `linear`);
				window.setTimeout(() => {
					$(`.header__list`).removeAttr("style");
					$(`.header__list`).removeClass(`burger-open`);
				}, 350);
			}

        })
		$(".main").on("click", function (e) {
            if($(`.burger`).hasClass(`burger-active`)){
                $(`.burger`).removeClass(`burger-active`) 
            }
            
			if (document.body.clientWidth < 1500) {
				$(`.header__list`).animate({ opacity: 0 }, 200, `linear`);
				window.setTimeout(() => {
					$(`.header__list`).removeAttr("style");
					$(`.header__list`).removeClass(`burger-open`);
				}, 350);
			}
		});
		$(".footer").on("click", function (e) {
			if (document.body.clientWidth < 1500) {
				$(`.header__list`).animate({ opacity: 0 }, 200, `linear`);
				window.setTimeout(() => {
					$(`.header__list`).removeAttr("style");
					$(`.header__list`).removeClass(`burger-open`);
				}, 350);
			}
		});
		$(`.header__link`).on(`click`, function (e) {
			disableScroll()
            $(`.popup`).removeClass(`visually-hidden`);
            document.getElementById("firstInput").focus();
			$(`.popup`).animate({ opacity: 1 }, 200, `linear`);
		});
		$(`.social__link`).on(`click`, function (e) {
			disableScroll();
            $(`.popup`).removeClass(`visually-hidden`);
            document.getElementById("firstInput").focus();
			$(`.popup`).animate({ opacity: 1 }, 200, `linear`);
		});
		$(`.exapmles_link`).on(`click`, function (e) {
			disableScroll()
            $(`.popup`).removeClass(`visually-hidden`);
            document.getElementById("firstInput").focus();
			$(`.popup`).animate({ opacity: 1 }, 200, `linear`);
		});
		$(`.tel-icon`).on(`click`, function (e) {
			disableScroll()
            $(`.popup`).removeClass(`visually-hidden`);
            document.getElementById("firstInput").focus();
			$(`.popup`).animate({ opacity: 1 }, 200, `linear`);
		});
		$(`.popup`).on(`click`, function (e) {
			if (e.target == $(`.popup`)[0]) {
				$(`.popup`).animate({ opacity: 0 }, 200, `linear`);
				enableScroll();
				window.setTimeout(() => {
					$(`.popup`).addClass(`visually-hidden`);
				}, 350);
			}
		});
	})()
);
