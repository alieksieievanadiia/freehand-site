// HERO SLIDER
new Swiper(".hero-swiper", {
    loop: true,
    autoplay: { delay: 4000 },
    navigation: {
        nextEl: ".hero-swiper .swiper-button-next",
        prevEl: ".hero-swiper .swiper-button-prev",
    },
});

// GALLERY SLIDER
new Swiper(".gallery-swiper", {
    slidesPerView: 4,
    spaceBetween: 8,
    navigation: {
        nextEl: ".gallery-swiper .swiper-button-next",
        prevEl: ".gallery-swiper .swiper-button-prev",
    },
    breakpoints: {
        0:   { slidesPerView: 3 },
        480: { slidesPerView: 4 },
    },
});
