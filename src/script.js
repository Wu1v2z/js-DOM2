const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const clearBtn = document.getElementById('clear-gallery');
const removeLastBtn = document.getElementById('remove-last');
const reverseBtn = document.getElementById('reverse-gallery');

let currentPage = 1; 
const limit = 4;    

async function fetchImages() {
    try {

        loadMoreBtn.disabled = true;
        loadMoreBtn.textContent = 'Завантаження...';

        const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${limit}`);

        if (!response.ok) {
            throw new Error(`HTTP помилка! Статус: ${response.status}`);
        }

        const data = await response.json();
        
        renderImages(data);
        
        currentPage++;

    } catch (error) {
        console.error("помилка:", error);
        alert("Не вдалося завантажити. Перевірте консоль.");
    } finally {

        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = 'Завантажити ще';
    }
}

function renderImages(images) {
    images.forEach(imgData => {

        const img = document.createElement('img');
        img.src = `https://picsum.photos/id/${imgData.id}/300/200`; 
        img.alt = `Photo by ${imgData.author}`;
        img.classList.add('gallery-item');

        gallery.appendChild(img);
    });
}

loadMoreBtn.addEventListener('click', fetchImages);

clearBtn.addEventListener('click', () => {
    gallery.innerHTML = ''; 
    currentPage = 1;  
});

removeLastBtn.addEventListener('click', () => {
    const lastImg = gallery.lastElementChild;
    if (lastImg) {
        lastImg.remove();
    } else {
        alert("Галерея порожня!");
    }
});

reverseBtn.addEventListener('click', () => {

    const imagesArray = Array.from(gallery.children);
    
    if (imagesArray.length === 0) return;

    gallery.innerHTML = '';

    imagesArray.reverse().forEach(img => {
        gallery.appendChild(img);
    });
});

document.addEventListener('DOMContentLoaded', fetchImages);
