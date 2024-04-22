/* eslint-disable indent */
/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */

const viewportFix = (width) => {
  const meta = document.querySelector('meta[name="viewport"]');
  meta.setAttribute('content', `user-scalable=no, width=${screen.width <= width ? width : 'device-width'}`);
};

viewportFix(420);

const maskOptions = {
  mask: '+7 (000) 000-00-00',
  lazy: false,
  placeholderChar: '_',
  onFocus: function () {
    if (this.value === '') this.value = '+7 ';
  },
  onBlur: function () {
    if (this.value === '+7 ') this.value = '';
  },
};

const maskPhone = () => {
  const maskedElements = document.querySelectorAll('.masked');
  maskedElements.forEach((item) => new IMask(item, maskOptions));
};

document.addEventListener('DOMContentLoaded', function () {
  Fancybox.bind('[data-fancybox]', {
    dragToClose: false,
    autoFocus: false,
    placeFocusBack: false,
  });

  maskPhone();

  const heroSlider = new Swiper('.hero-slider', {
    loop: true,
    speed: 1000,
    navigation: {
      nextEl: '.hero-slider__next',
      prevEl: '.hero-slider__prev',
    },
  });

  const productSlider = new Swiper('.product-slider', {
    loop: true,
    speed: 1000,
    navigation: {
      nextEl: '.product-slider__next',
      prevEl: '.product-slider__prev',
    },
  });
});
