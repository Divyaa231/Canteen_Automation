const slides = document.querySelector('.slides');
    const images = document.querySelectorAll('.slides img');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    let index = 0;

    function showSlide() {
      slides.style.transform = `translateX(${-index * 100}%)`;
    }

    next.addEventListener('click', () => {
      index = (index + 1) % images.length;
      showSlide();
    });

    prev.addEventListener('click', () => {
      index = (index - 1 + images.length) % images.length;
      showSlide();
    });

    setInterval(() => {
      index = (index + 1) % images.length;
      showSlide();
    }, 5000);