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

function menufun() {
  window.location.href = "lunch_menu_index.html";
}

function openModal() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("modal").style.display = "block";
  }

  function closeModal() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("modal").style.display = "none";
  }

  document.getElementById("signinFrame").onload = function() {
  this.style.height = this.contentWindow.document.body.scrollHeight + "px";
};
