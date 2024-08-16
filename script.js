document.addEventListener("DOMContentLoaded", () => {
    const viewModeButton = document.getElementById('view-mode');
    const editModeButton = document.getElementById('edit-mode');
    const passwordDialog = document.getElementById('password-dialog');
    const passwordInput = document.getElementById('password-input');
    const passwordSubmit = document.getElementById('password-submit');
    const eventDialog = document.getElementById('event-dialog');
    const eventInput = document.getElementById('event-input');
    const saveEventButton = document.getElementById('save-event');
    const calendar = document.getElementById('calendar');
    
    let currentMode = 'view'; // 'view' or 'edit'
    let currentDate;
    let calendarInitialized = false; // Flag to check if calendar is initialized

    function initializeCalendar() {
        if (calendarInitialized) return; // Prevent reinitialization

        const today = new Date();
        currentDate = new Date(today.setDate(today.getDate() - today.getDay())); // Get start of the week
        
        for (let i = 0; i < 28; i++) { // Display 4 weeks
            const date = new Date(currentDate);
            date.setDate(date.getDate() + i);

            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            dayElement.id = `day-${i}`; // Set unique ID for each day
            dayElement.innerHTML = `
                <div class="date">${date.toLocaleDateString()}</div>
                <div class="events" id="events-${i}"></div>
                ${currentMode === 'edit' ? '<button class="add-event-btn">일정 추가</button>' : ''}
            `;
            calendar.appendChild(dayElement);
        }

        calendarInitialized = true; // Set the flag to true after initialization
    }

    function showPasswordDialog() {
        passwordDialog.classList.remove('hidden');
    }

    function showEventDialog(dateIndex) {
        eventDialog.classList.remove('hidden');
        eventDialog.setAttribute('data-date-index', dateIndex);
    }

    function addEvent(dateIndex, eventText) {
        const eventsContainer = document.getElementById(`events-${dateIndex}`);
        const eventElement = document.createElement('div');
        eventElement.className = 'event';
        eventElement.innerHTML = `
            ${eventText}
            ${currentMode === 'edit' ? '<button class="remove-btn">삭제</button>' : ''}
        `;
        eventsContainer.appendChild(eventElement);
    }

    function handleEventDialogSave() {
        const dateIndex = eventDialog.getAttribute('data-date-index');
        const eventText = eventInput.value;
        if (eventText) {
            addEvent(dateIndex, eventText);
            eventInput.value = '';
            eventDialog.classList.add('hidden');
        }
    }

    function handlePasswordSubmit() {
        const password = passwordInput.value;
        if (password === '1014') {
            passwordDialog.classList.add('hidden');
            currentMode = 'edit';
            initializeCalendar();
        } else {
            alert('비밀번호가 틀렸습니다.');
        }
    }

    viewModeButton.addEventListener('click', () => {
        currentMode = 'view';
        calendar.innerHTML = ''; // Clear existing calendar
        calendarInitialized = false; // Reset initialization flag
        initializeCalendar();
    });

    editModeButton.addEventListener('click', showPasswordDialog);

    passwordSubmit.addEventListener('click', handlePasswordSubmit);

    saveEventButton.addEventListener('click', handleEventDialogSave);

    calendar.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-event-btn')) {
            const dayElement = event.target.closest('.day');
            const index = Array.from(calendar.children).indexOf(dayElement);
            showEventDialog(index);
        } else if (event.target.classList.contains('remove-btn')) {
            event.target.closest('.event').remove();
        }
    });

    initializeCalendar();
});
