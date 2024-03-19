(function ($) {
	"use strict";

	/**
	 * [isMobile description]
	 * @type {Object}
	 */
	window.isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	}
	window.isIE = /(MSIE|Trident\/|Edge\/)/i.test(navigator.userAgent);
	window.windowHeight = window.innerHeight;
	window.windowWidth = window.innerWidth;

	/**
	 * Match height 
	 */
	$('.row-eq-height > [class*="col-"]').matchHeight();

	var myEfficientFn = debounce(function () {
		$('.row-eq-height > [class*="col-"]').matchHeight();
	}, 250);

	window.addEventListener('resize', myEfficientFn);

	/**
	 * [debounce description]
	 * @param  {[type]} func      [description]
	 * @param  {[type]} wait      [description]
	 * @param  {[type]} immediate [description]
	 * @return {[type]}           [description]
	 */
	function debounce(func, wait, immediate) {
		var timeout;
		return function () {
			var context = this, args = arguments;
			var later = function () {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	/**
	 * Masonry
	 */
	$('.grid__inner').masonry({
		itemSelector: '.grid-item',
		columnWidth: '.grid-sizer',
	});

	/**
	 * grid css
	 */

	$.fn.reCalWidth = function () {
		var $self = $(this);
		$self.on('reCalWidth', function () {
			var _self = $(this);
			_self.css('width', '');
			var width = Math.floor(_self.width());
			_self.css('width', width + 'px');
			var height = Math.floor(_self.parent().children('.wide').width() / 2);
			_self.parent().children('.wide').css('height', height + 'px');
		});
		$(window).on('resize', function () {
			$self.trigger('reCalWidth');
		});
	}

	$.fn.showVersion = function () {
		var client = new XMLHttpRequest();
		var contenedor = this; 
		client.open('GET', './version');
		client.onreadystatechange = function () {
			contenedor.html('v' + client.responseText);
		}
		client.send();
	}

	function work() {
		$('.grid-css').each(function () {
			var workWrapper = $(this),
				workContainer = $('.grid__inner', workWrapper),
				filters = $('.filter', workWrapper),
				filterCurrent = $('.current a', filters),
				filterLiCurrent = $('.current', filters),
				duration = 0.3;
			workContainer.imagesLoaded(function () {

				// Fix Height
				if (workWrapper.hasClass('grid-css--fixheight')) {
					workContainer.find('.grid-item__content-wrapper').matchHeight();
				}

				workContainer.isotope({
					layoutMode: 'masonry',
					itemSelector: '.grid-item',
					transitionDuration: duration + 's',
					masonry: {
						columnWidth: '.grid-sizer'
					},
				});
			});
			filters.on('click', 'a', function (e) {

				e.preventDefault();
				var $el = $(this);
				var selector = $el.attr('data-filter');
				filters.find('.current').removeClass('current');
				$el.parent().addClass('current');
				workContainer.isotope({
					filter: selector
				});
			});

			filters.find('.select-filter').change(function () {
				var $el = $(this);
				var selector = $el.val();
				workContainer.isotope({
					filter: selector
				});
			});

			$('.grid-item', workWrapper).reCalWidth();
		});
	}
	work();

	function evaluaEfecto(efecto, href) {
		if ('goto' == efecto) {
			window.location.href = href;
			return true;
		} else if ('gotohref' == efecto) {
			window.open(href, '__blank');
			return true;
		}
		return false;
	}

	$('.portfolio').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

		removalDelay: 500, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				let result = evaluaEfecto(this.st.el.attr('data-effect'), this.st.el.attr('href'));
				if (result) return;

				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});

	$('.portfolio .popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		preloader: false,
		closeOnContentClick: true,
		closeBtnInside: true,
		fixedContentPos: true,
		closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="pe-7s-close"></i></button>',

		removalDelay: 300, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				let result = evaluaEfecto(this.st.el.attr('data-effect'), this.st.el.attr('href'));
				this.type = 'image';
				if (result) return;

				this.st.mainClass = this.st.el.attr('data-effect');
			},
			open: function () {
				if ('gotohref' == this.st.el.attr('data-effect')) {		
					setTimeout(() => {
						$('.element-with-popup').magnificPopup('close')
					}, 600);
				}
			},
		},
		midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
	});
	/**
	 *  Slide Custom
	 */
	if ($('.slide-item').length) {
		var $sync1 = $(".slide-image__front .swiper-container"),
			$sync2 = $(".slide-image__black .swiper-container");

		var galleryTop = new Swiper($sync1, {
			spaceBetween: 10,
		});
		var galleryThumbs = new Swiper($sync2, {
			spaceBetween: 10,
			centeredSlides: true,
			slidesPerView: 'auto',
			touchRatio: 0.2,
			slideToClickedSlide: true,
		});

		galleryTop.params.control = galleryThumbs;
		galleryThumbs.params.control = galleryTop;
	}

	/**
	 * Swiper
	 */
	$('.swiper__module').each(function () {
		var self = $(this),
			wrapper = $('.swiper-wrapper', self),
			optData = eval('(' + self.attr('data-options') + ')'),
			optDefault = {
				paginationClickable: true,
				pagination: self.find('.swiper-pagination-custom'),
				nextButton: self.find('.swiper-button-next-custom'),
				prevButton: self.find('.swiper-button-prev-custom'),
				spaceBetween: 30
			},
			options = $.extend(optDefault, optData);
		wrapper.children().wrap('<div class="swiper-slide"></div>');
		var swiper = new Swiper(self, options);

		function thumbnails(selector) {

			if (selector.length > 0) {
				var wrapperThumbs = selector.children('.swiper-wrapper'),
					optDataThumbs = eval('(' + selector.attr('data-options') + ')'),
					optDefaultThumbs = {
						spaceBetween: 10,
						centeredSlides: true,
						slidesPerView: 3,
						touchRatio: 0.3,
						slideToClickedSlide: true,
						pagination: selector.find('.swiper-pagination-custom'),
						nextButton: selector.find('.swiper-button-next-custom'),
						prevButton: selector.find('.swiper-button-prev-custom'),
					},
					optionsThumbs = $.extend(optDefaultThumbs, optDataThumbs);
				wrapperThumbs.children().wrap('<div class="swiper-slide"></div>');
				var swiperThumbs = new Swiper(selector, optionsThumbs);
				swiper.params.control = swiperThumbs;
				swiperThumbs.params.control = swiper;
			}

		}
		thumbnails(self.next('.swiper-thumbnails__module'));
	});

	/**
	 * Typing effect
	 */
	$('.typing__module').each(function (index) {
		var self = $(this),
			_wrapper = $('.typed', self)[0],
			optData = eval('(' + self.attr('data-options') + ')'),
			optDefault = {
				stringsElement: self.find('.typed-strings')[0],
				typeSpeed: 80,
				loop: true
			},
			options = $.extend(optDefault, optData);
		var typed = new Typed(_wrapper, options);
	});

	/**
	* Footer
	*/

	$('#back-to-top').on('click', function (e) {
		e.preventDefault();
		$('html,body').animate({
			scrollTop: 0
		}, 700);
	});
	//*
	// Header
	//*

	var wh = $(window).height(),
		half = wh / 2,
		headerHeight = $('header').outerHeight();

	$(window).scroll(function () {
		var scrollTop = $(window).scrollTop();

		if (scrollTop >= half) {
			$('header').addClass('is-scroll');
		} else {
			$('header').removeClass('is-scroll');
		}

	});

	$('.onepage-nav').dropdownMenu({
		menuClass: 'onepage-menu',
		breakpoint: 1200,
		toggleClass: 'active',
		classButtonToggle: 'navbar-toggle',
		subMenu: {
			class: 'sub-menu',
			parentClass: 'menu-item-has-children',
			toggleClass: 'active'
		}
	});

	$('.onepage-nav').onePageNav({
		currentClass: 'current-menu-item',
		scrollOffset: headerHeight,
	});

	//*
	// Back to top
	//*

	$(window).scroll(function () {
		var wh = $(window).height(),
			scrollTop = $(window).scrollTop();

		if (scrollTop >= wh) {
			$('#back-to-top').addClass('is-visible')
		} else {
			$('#back-to-top').removeClass('is-visible')
		}
	});

	var headerHeight = $('header').outerHeight();

	$('#back-to-down').on('click', function () {
		var offsets = $(this).closest('.hero').next().offset().top - headerHeight;

		$('html,body').animate({
			scrollTop: offsets
		}, 700);
	})

})(jQuery);

var config = {
	api: ''
};


function loadValues() {
	
	let client = new XMLHttpRequest();
	client.open('GET', './values');
	client.onreadystatechange = function () {
		let contenido = client.responseText;
		let lineas = contenido.split("\n");
		if (lineas.length < 1) return;

		for(let i = 0; i < lineas.length; i++) {
			if (lineas[i].indexOf('api=') > -1) {
				let partes = lineas[i].split("=");
				config.api = partes[1];
				return 
			}
		}
	}
	client.send();
}

function showRandomBackground() {
	let img = Math.floor( Math.random() * 5) + 1;
	if (img < 3) img = 2;
	$('#id-1').css('background-image', 'url(' + 'assets/img/bg/' + img + '.webp' + ')');
}

function showAppVersion() {
	$('#page-version').showVersion();
}

function sendContactForm() {
	$.ajax({type: "POST", url: config.api + '/contactar',
		headers: { "bypass-tunnel-reminder": 1},
		data: {
			nombre: $('#form-nombre').val(),
			email: $('#form-email').val(),
			mensaje: $('#form-mensaje').val()
		},
		dataType: 'json',
		success: processContactResponse
	});
}

function processContactResponse(result) {
	if (result.resultado > 0) {
		showSuccess(result.mensaje);
		cleanForm();
	} else {
		showFailed(result.mensaje);
	}
}

function showSuccess(mensaje) {
	if (mensaje) $('#form-message-success').text(' - ' + mensaje);
}

function showFailed(mensaje) {
	if (mensaje) $('#form-message-failed').text(' - ' + mensaje);
}

function cleanForm() {
	$('#form-nombre').val(''),
	$('#form-email').val(''),
	$('#form-mensaje').val(''),
	$('#form-message-failed').text('');
}