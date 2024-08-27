
// Урок 2. События, формы
// Вашей задачей является создание веб-слайдера для отображения изображений
// на веб-странице. Слайдер должен позволять переключаться между изображениями
// и отображать их в центре экрана.

// 1. Создайте интерфейс веб-страницы, который включает в себя следующие элементы:

// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для
// переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// 2. Используйте HTML для создания элементов интерфейса.

// 3. Используйте JavaScript для обработки событий:

// a. При клике на кнопку "Предыдущее изображение" должно
// отображаться предыдущее изображение.
// b. При клике на кнопку "Следующее изображение" должно
// отображаться следующее изображение.
// c. При клике на навигационные точки, слайдер должен
// переключаться к соответствующему изображению.

// 4. Слайдер должен циклически переключаться между изображениями,
// то есть после последнего изображения должно отображаться первое, и наоборот.

// 5. Добавьте стилизацию для слайдера и элементов интерфейса с
// использованием CSS для улучшения внешнего вида.

const pictures = Array.from(document.querySelectorAll('.slider__pic'));
const circles = Array.from(document.querySelectorAll('.slider__nav-circles'));

for (let i = 0; i < pictures.length; i++) {
    pictures[i].style.display = 'none';
}
pictures[0].style.display = 'block';

let epicfail;
let sliderOrderNum = 1;

const buttonPrev = document.querySelector('.slider__prev-button');
const buttonNext = document.querySelector('.slider__next-button');

function verifySliderOrderNum() {
    if (sliderOrderNum < 1) {
        sliderOrderNum = pictures.length;
    } else if (sliderOrderNum > pictures.length) {
        sliderOrderNum = 1;
    }
}

buttonPrev.addEventListener('click', () => {
    pictures[sliderOrderNum - 1].style.display = 'none';
    circles[sliderOrderNum - 1].firstChild.classList.replace('fa-solid', 'fa-regular');
    sliderOrderNum--;
    verifySliderOrderNum(); 
    pictures[sliderOrderNum - 1].style.display = 'block';
    circles[sliderOrderNum - 1].firstChild.classList.replace('fa-regular', 'fa-solid');
});

buttonNext.addEventListener('click', () => {
    pictures[sliderOrderNum - 1].style.display = 'none';
    circles[sliderOrderNum - 1].firstChild.classList.replace('fa-solid', 'fa-regular');
    sliderOrderNum++; 
    verifySliderOrderNum(); 
    pictures[sliderOrderNum - 1].style.display = 'block';
    circles[sliderOrderNum - 1].firstChild.classList.replace('fa-regular', 'fa-solid');
});

function initCircleNavigation() {
    for (let i = 0; i < circles.length; i++) {
        circles[i].addEventListener('click', () => {
            pictures[sliderOrderNum - 1].style.display = 'none';
            circles[sliderOrderNum - 1].firstChild.classList.replace('fa-solid', 'fa-regular');
            sliderOrderNum = i + 1; 
            verifySliderOrderNum();
            pictures[sliderOrderNum - 1].style.display = 'block';
            circles[sliderOrderNum - 1].firstChild.classList.replace('fa-regular', 'fa-solid');
        });
    }
}

initCircleNavigation();


