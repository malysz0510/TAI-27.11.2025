const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');
const galleryList = document.querySelector('.gallery-list');
const galleryBottom = document.querySelector('.gallery-bootom');

const API_KEY = 'YOUR_PIXABAY_API_KEY';
const API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 20;

let currentPage = 1;
let currentSearchQuery = '';
let totalPages = 1;
let totalHits = 0;

function createPaginationButtons() {
    galleryBottom.innerHTML = '';
    const prevButton = document.createElement('button');
    prevButton.id = 'prev';
    prevButton.className = 'gallery-bottom-btn';
    prevButton.textContent = 'Poprzednie';
    
    const nextButton = document.createElement('button');
    nextButton.id = 'next';
    nextButton.className = 'gallery-bottom-btn';
    nextButton.textContent = 'Następne';

    galleryBottom.appendChild(prevButton);
    galleryBottom.appendChild(nextButton);
    
    prevButton.addEventListener('click', handlePagination);
    nextButton.addEventListener('click', handlePagination);
    
    updatePaginationButtons();
}

function updatePaginationButtons() {
    const prevButton = document.querySelector('#prev');
    const nextButton = document.querySelector('#next');

    if (prevButton && nextButton) {
        prevButton.disabled = currentPage <= 1;
        nextButton.disabled = currentPage >= totalPages;
    }
}

function renderGallery(hits) {
    galleryList.innerHTML = '';
    
    if (hits.length === 0) {
        galleryList.innerHTML = 'Brak wyników.';
        galleryBottom.innerHTML = '';
        return;
    }

    hits.forEach(hit => {
        const link = document.createElement('a');
        link.href = hit.largeImageURL;
        link.classList.add('gallery-element');
        link.classList.add('is-loaded');
        
        const img = document.createElement('img');
        img.src = hit.webformatURL;
        img.alt = hit.tags;
        img.classList.add('gallery-image');

        img.onload = () => {
            link.classList.remove('is-loaded');
        };
        
        link.appendChild(img);
        link.addEventListener('click', openLightbox);
        galleryList.appendChild(link);
    });
    
    createPaginationButtons();
}

async function searchImages() {
    if (currentSearchQuery === '' || API_KEY === 'YOUR_PIXABAY_API_KEY') {
        galleryList.innerHTML = 'Wprowadź frazę i klucz API.';
        galleryBottom.innerHTML = '';
        return;
    }

    const url = `${API_URL}?key=${API_KEY}&q=${encodeURIComponent(currentSearchQuery)}&image_type=photo&per_page=${PER_PAGE}&page=${currentPage}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        totalHits = data.totalHits;
        totalPages = Math.ceil(totalHits / PER_PAGE);
        
        renderGallery(data.hits);
        
    } catch (error) {
        console.error('Błąd pobierania zdjęć:', error);
        galleryList.innerHTML = 'Wystąpił błąd podczas ładowania zdjęć.';
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query === '') return;
    
    currentSearchQuery = query;
    currentPage = 1;
    searchImages();
}

function handlePagination(event) {
    const buttonId = event.currentTarget.id;

    if (buttonId === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (buttonId === 'next' && currentPage < totalPages) {
        currentPage++;
    } else {
        return;
    }
    
    searchImages();
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.remove();
    }
}

function openLightbox(event) {
    event.preventDefault();
    const largeImageUrl = event.currentTarget.href;
    
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.addEventListener('click', closeLightbox);
    
    const imageContainer = document.createElement('div');
    imageContainer.classList.add('lightbox-content');
    imageContainer.addEventListener('click', e => e.stopPropagation()); 
    
    const img = document.createElement('img');
    img.src = largeImageUrl;
    img.classList.add('lightbox-image');
    
    const closeButton = document.createElement('button');
    closeButton.classList.add('lightbox-close');
    closeButton.textContent = 'X';
    closeButton.addEventListener('click', closeLightbox);
    
    imageContainer.appendChild(img);
    imageContainer.appendChild(closeButton);
    lightbox.appendChild(imageContainer);
    document.body.appendChild(lightbox);
}

searchForm.addEventListener('submit', handleFormSubmit);