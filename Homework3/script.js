"use strict";
let page = Math.floor(Math.random() * 30) + 1;
const myAccessKey = 'AqySsT0RIZYLsayIpTo1c-VmKJ6I6T9jmYBTvezuxpA';

const picEl = document.querySelector('.image');
const nameEl = document.querySelector('.photographer-name');
const likeBtn = document.querySelector('.like-button');
let likesCounterEl = document.querySelector('.likes-count');
const previousBtn = document.querySelector('.previous-btn');
const nextBtn = document.querySelector('.next-btn');
let previousPhotos = [];
let currentPhotoIndex = -1;

async function fetchPhotos() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos?page=${page}&per_page=9&client_id=${myAccessKey}`);
        const photos = await response.json();
        page = Math.floor(Math.random() * 30) + 1;
        return photos;
    } catch (error) {
        console.error('Ошибка', error);
        return [];
    }

}

async function showPhoto() {
    const photos = await fetchPhotos();
    let randomIndex = Math.floor(Math.random() * 8) + 1;
    let photo;
    while (photos[randomIndex].url === picEl.src) {
        randomIndex = Math.floor(Math.random() * 8) + 1;
    }
    photo = photos[randomIndex];
    picEl.src = photo.urls.small;
    likesCounterEl.textContent = photo.likes;
    nameEl.textContent = photo.user.username;
    currentPhotoIndex = -1;
    rememberPhoto(photo);
}

function rememberPhoto(photo) {
    try {
        previousPhotos = JSON.parse(localStorage.getItem('previousPhotos')) || [];
    } catch {
        previousPhotos = [];
    }

    const previousPhoto = {
        url: picEl.src,
        author: nameEl.textContent,
        likes: parseInt(likesCounterEl.textContent),
    };

    previousPhotos.push(previousPhoto);
    localStorage.setItem('previousPhotos', JSON.stringify(previousPhotos));
}

function showPreviousPhoto() {
    previousPhotos = JSON.parse(localStorage.getItem('previousPhotos'));

    // Проверяем, есть ли сохраненные фотографии
    if (!previousPhotos || previousPhotos.length === 1) {
        alert('Не похоже, чтобы до этого вы смотрели другие фото');
        return; // Выходим из функции, если фото нет
    }

    try {
        if (currentPhotoIndex < previousPhotos.length - 1) {
            currentPhotoIndex++;
            let previousPhoto = previousPhotos[previousPhotos.length - 1 - currentPhotoIndex];
            if (picEl.src === previousPhotos[previousPhotos.length - 1 - currentPhotoIndex].url) {
                currentPhotoIndex++;
                previousPhoto = previousPhotos[previousPhotos.length - 1 - currentPhotoIndex];
            }
            if (picEl.src === previousPhotos[0].url) {
                throw new Error('Достигнуто начало массива сохраненных картинок');
            }
            picEl.src = previousPhoto.url;
            likesCounterEl.textContent = previousPhoto.likes;
            nameEl.textContent = previousPhoto.author;
        } else if (currentPhotoIndex === previousPhotos.length - 1) {
            currentPhotoIndex = -1;
        }
    } catch {
        alert('Упс, назад листать больше нельзя =(. Попробуйте посмотреть самые новые изображения с помощью кнопки Show newest photo=)');
    }
}

likeBtn.addEventListener('click', function () {
    let likesCount = parseInt(likesCounterEl.textContent) + 1;
    likesCounterEl.textContent = likesCount;

    const previousPhotos = JSON.parse(localStorage.getItem('previousPhotos'));
    previousPhotos.forEach(photo => {
        if (picEl.src === photo.url) {
            photo.likes = likesCount;
            localStorage.setItem('previousPhotos', JSON.stringify(previousPhotos));
        }
    });
});

window.onload = showPhoto();

nextBtn.addEventListener('click', function () {
    showPhoto();
});


previousBtn.addEventListener('click', function () {
    setTimeout(showPreviousPhoto, 0);
});

