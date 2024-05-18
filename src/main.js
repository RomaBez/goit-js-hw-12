import { fetchPhoto, PER_PAGE } from "./js/pixabay-api.js";
import { galleryMarkup } from "./js/render-functions.js"

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');
const searchFormEl = document.querySelector('.myForm');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.js-load-more-btn')

const lightboxGallery  = new SimpleLightbox('.gallery a', {
captionsData: 'alt',
captionDelay: 250,
});

let searchRequest = null;
let photoCurrentPage = 1;
let totalPages = 0;

const onSearchFormSubmit = async event => {
    event.preventDefault();
    galleryEl.innerHTML = "";
    loadMoreBtnEl.classList.add('d-none')

const form = event.currentTarget;
    searchRequest = form.elements.textInput.value.trim();
    if (searchRequest === '') {
    iziToast.error({
        class: 'error',
        message:  'Please put your request!',
        position: 'topRight',
        timeout: 2000,
    });
    form.reset();
    return;
    }
    photoCurrentPage = 1;
        try {

            loaderEl.classList.remove('is-hidden');

    const { hits, totalHits } = await fetchPhoto(searchRequest, photoCurrentPage);

            if (totalHits === 0) {
        
        iziToast.error({
            class: 'error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            timeout: 2000,
        });
        form.reset();
        loaderEl.classList.add('is-hidden');
        return;
    }

    galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(hits));

    lightboxGallery.refresh();

    loaderEl.classList.add('is-hidden');

    totalPages = Math.ceil(totalHits / PER_PAGE);
    if (totalPages > 1) {

        loadMoreBtnEl.classList.remove('d-none');
    }
    } catch (error) {

        loaderEl.classList.add('is-hidden');

        iziToast.error({
            class: 'error',
            message: 'Search params is not valid!',
            position: 'topRight',
            timeout: 2000,
    });
    form.reset();
    return;
    }
    
  form.reset();
};

searchFormEl.addEventListener('submit', onSearchFormSubmit);


const smoothScroll = () => {
  const lastPhoto = document.querySelector('.gallery-item');
  const photoHeight = lastPhoto.getBoundingClientRect().height;
  const scrollHeight = photoHeight * 2;
  window.scrollBy({
    top: scrollHeight,
    left: 0,
    behavior: 'smooth',
  });
};


const onLoadMorePhoto = async event => {
    try {
        photoCurrentPage += 1;
        console.log(photoCurrentPage)
        const { hits, totalHits } = await fetchPhoto(searchRequest, photoCurrentPage);

        galleryEl.insertAdjacentHTML('beforeend', galleryMarkup(hits));
        lightboxGallery.refresh();
        smoothScroll();
        loaderEl.classList.add('is-hidden');

        totalPages = Math.ceil(totalHits / PER_PAGE);
        if (photoCurrentPage < totalPages) {
        loadMoreBtnEl.classList.remove('d-none');
    } else {
    loadMoreBtnEl.classList.add('d-none');
    iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 2000,
     });
    return;
    }
  } catch (error) {

        loaderEl.classList.add('is-hidden');

    iziToast.error({
        message: 'Search params is not valid!',
        position: 'topRight',
        timeout: 2000,
    });
    form.reset();
    return;
  }
};

loadMoreBtnEl.addEventListener('click', onLoadMorePhoto);