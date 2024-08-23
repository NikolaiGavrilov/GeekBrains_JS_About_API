// Вы разрабатываете веб-страницу для отображения расписания занятий в спортивном клубе. 
// Каждое занятие имеет название, время проведения, максимальное количество участников 
// и текущее количество записанных участников.

// 1. Создайте веб-страницу с заголовком "Расписание занятий" и областью для отображения занятий.

// 2. Загрузите информацию о занятиях из предоставленных JSON-данных. 
// Каждое занятие должно отображаться на странице с указанием его названия, 
// времени проведения, максимального количества участников и текущего количества 
// записанных участников.

// 3. Пользователь может нажать на кнопку "Записаться" для записи на занятие. 
// Если максимальное количество участников уже достигнуто, кнопка "Записаться"
// становится неактивной.

// 4. После успешной записи пользователя на занятие, обновите количество записанных
// участников и состояние кнопки "Записаться".

// 5. Запись пользователя на занятие можно отменить путем нажатия на кнопку 
// "Отменить запись". После отмены записи, обновите количество записанных участников
//  и состояние кнопки.

// 6. Все изменения (запись, отмена записи) должны сохраняться и отображаться в
// реальном времени на странице.

// 7. При разработке используйте Bootstrap для стилизации элементов.

const classesEl = document.querySelector(".timetable__activities");

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(activity => {
            classesEl.insertAdjacentHTML('afterbegin', `
            <div class="card shadow-sm container activity__content" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title activity__title">${activity.title}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item activity__time">Время мероприятия: ${activity.time}</li>
                    <li class="list-group-item activity__max-people">Максимальное кол-во участников: ${activity.max_people_num}</li>
                    <li class="list-group-item activity__current-people">Участников записано: ${activity.current_people_num}</li>
                    <li class="list-group-item activity__vacant-places">Свободно мест: ${activity.max_people_num - activity.current_people_num}</li>
                </ul>
                <div class="card-body d-flex  justify-content-center">
                    <button class="activity__buttonRegister btn btn-outline-success">Записаться</button>
                    <button class="activity__buttonCancel btn btn-outline-danger" style="display: none;">Отменить запись</button>
                </div>
            </div>
`);

            let registerBtn = document.querySelector('.activity__buttonRegister')
            let cancelBtn = document.querySelector('.activity__buttonCancel');

            if (activity.max_people_num - activity.current_people_num === 0) {
                registerBtn.classList.replace('btn-outline-success', 'btn-outline-secondary');
                registerBtn.setAttribute('disabled', '');
            }
            registerBtn.addEventListener('click', function (e) {
                const necessaryClass = registerBtn.closest('.activity__content');
                if (activity.max_people_num - activity.current_people_num > 0 && activity.your_participation != true) {
                    activity.current_people_num++;
                    activity.your_participation = true;
                    necessaryClass.querySelector('.activity__vacant-places').textContent = `Свободно мест: ${activity.max_people_num - activity.current_people_num}`;
                    necessaryClass.querySelector('.activity__current-people').textContent = `Участников записано: ${activity.current_people_num}`;
                    necessaryClass.querySelector('.activity__buttonCancel').style.display = 'block';
                    registerBtn.classList.replace('btn-outline-success', 'btn-outline-secondary');
                    registerBtn.setAttribute('disabled', '');
                } else if (activity.your_participation === true) {
                    e.preventDefault();
                    alert('Вы уже записались на это мероприятие');
                }
                else {
                    alert('Извините, все места на это занятие заняты');
                }
            });

            cancelBtn.addEventListener('click', function (e) {
                const necessaryClass = registerBtn.closest('.activity__content');
                activity.current_people_num--;
                activity.your_participation = false;
                necessaryClass.querySelector('.activity__vacant-places').textContent = `Свободно мест: ${activity.max_people_num - activity.current_people_num}`;
                necessaryClass.querySelector('.activity__current-people').textContent = `Участников записано: ${activity.current_people_num}`;
                cancelBtn.style.display = 'none';
                registerBtn.classList.replace('btn-outline-secondary', 'btn-outline-success');
                registerBtn.removeAttribute('disabled');
            });

        });
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));
