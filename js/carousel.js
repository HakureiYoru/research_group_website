let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-slide");

function changeSlide(n) {
    slides[currentSlide].classList.remove("active");
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
}

// 自动轮播
let autoSlideInterval = setInterval(() => changeSlide(1), 30000); // 每5秒切换一次

// 停止轮播时，重置自动轮播
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => changeSlide(1), 30000);
}
