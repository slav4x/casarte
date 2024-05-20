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

  const airItems = document.querySelectorAll('.air-item');

  airItems.forEach((item) => {
    item.addEventListener('mouseover', function () {
      airItems.forEach((i) => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Генерация случайного токена
  function generateToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 30; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  // Установка токена в скрытое поле формы
  function setToken(form) {
    const token = generateToken();
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 't';
    hiddenInput.value = token;
    form.appendChild(hiddenInput);
  }

  // Инициализация токена для каждой формы на странице
  const forms = document.querySelectorAll('form');
  forms.forEach(function (form) {
    setToken(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const button = form.querySelector('button');

      button.style.opacity = 0.5;
      button.style.cursor = 'not-allowed';
      button.disabled = true;

      const inputs = form.querySelectorAll('input');

      setTimeout(() => {
        button.style.opacity = 1;
        button.disabled = false;

        inputs.forEach((input) => {
          input.value = '';
        });

        Fancybox.close();

        Fancybox.show([{ src: '#popup-thanks', type: 'inline' }]);
      }, 300);

      const formUrl = form.getAttribute('action');
      const formData = new FormData(this);

      fetch(formUrl, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .catch((error) => console.error('Error:', error));
    });
  });
});
