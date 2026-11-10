let currentDate = document.querySelector('.getDate');
let bookingDate = document.getElementById('booking-date');
let weddingForm = document.querySelector('.wedding-form');
let selectedDateOuput = document.getElementById('selected-date');
let partnerOneInput = document.getElementById('partner-1-first-name');
let partnerTwoInput = document.getElementById('partner-2-first-name');
let partnerOneName = document.getElementById('partner-one-name');
let partnerTwoName = document.getElementById('partner-two-name');
const dialog = document.querySelector('dialog');
const submitBtn = document.querySelector('.submitBtn');
const closeModal = document.getElementById('close-modal');
const openModal = document.querySelectorAll('.open-modal');
const confirmBooking = document.getElementById('confirm-booking');
const bookingConfirmation = document.querySelector('.booking-confirmation');

// stores the value of the timeout in order to clear it in case someone clicks before the timeout happens
let dateTimeout;

// stores the value of whether the chosen date is valid
let chosenDateValidity = false;

// loops through the available months and attaches an event listener to them in order to display the modal
openModal.forEach((availableBooking) => {
    availableBooking.addEventListener('click', () => {
        dialog.showModal();
        document.body.classList.add('no-scroll');
    });
});

// event listener for both partners first names in order to display them on the booking confirmation
partnerOneInput.addEventListener('input', () => {
    partnerOneName.innerText = partnerOneInput.value;
});

partnerTwoInput.addEventListener('input', () => {
    partnerTwoName.innerText = partnerTwoInput.value;
});

// event listener for the date element in order to display a message depending on the selected date
currentDate.addEventListener('change', () => {
    // returns early if the current date has no selected value
    if (!currentDate.value) {
        return;
    };

    // holds the value of the selected month by splitting the date and picking out the month in the array
    const selectedMonth = currentDate.value.split('-')[1];
    // holds the value of the selected date
    const selectedDate = new Date(currentDate.value);
    // holds the value of todays date
    const todaysDate = new Date();

    // clears the timeout in case the date is changed too quickly which would prevent the correct message from appearing
    clearTimeout(dateTimeout);

    // checks if the selected date is equal to or greater than todays date along with checking against the two available months
    if (selectedDate >= todaysDate && (selectedMonth === '08' || selectedMonth === '09')) {
        chosenDateValidity = true;
        selectedDateOuput.textContent = 'available';
        selectedDateOuput.classList.remove('invalid');
        selectedDateOuput.classList.add('valid');
        currentDate.classList.remove('invalid');
        currentDate.classList.add('valid');
    } else {
        chosenDateValidity = false;
        selectedDateOuput.textContent = 'unavailable';
        selectedDateOuput.classList.remove('valid');
        selectedDateOuput.classList.add('invalid');
        currentDate.classList.remove('valid');
        currentDate.classList.add('invalid');
    };

    // clears the message, color and border for the calendar
    dateTimeout = setTimeout(() => {
        selectedDateOuput.textContent = '';
        selectedDateOuput.classList.remove('valid', 'invalid');
        currentDate.classList.remove('valid', 'invalid');
    }, 2000);
});

// event listener on the submit button to check the validity of the date
submitBtn.addEventListener('click', () => {
    if (!chosenDateValidity) {
        selectedDateOuput.classList.add('invalid');
        currentDate.classList.add('invalid');
    };
});

// displays the confirmation content once the form is submitted
weddingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // holds the value of the current selected date
    let date = new Date(currentDate.value);
    // holds the value of the current day
    let currentDay = date.getDate();
    // this gets updated from the if else statement below to hold the value of the day plus the suffix
    let suffixedDay;

    weddingForm.classList.add('hidden');
    bookingConfirmation.classList.remove('hidden');

    // gets the day, month and year and sets it to the uk format
    let day = date.toLocaleDateString('en-GB', { 
        weekday: 'long' 
    });
    let month = date.toLocaleDateString('en-GB', {
        month: 'long' 
    });
    let year = date.toLocaleDateString('en-GB', {
        year: 'numeric'
    });

    // checks the date and adds the desired suffix to the end of it
    if(currentDay === 1 || currentDay === 21) {
        suffixedDay = currentDay + 'st';
    } else if (currentDay === 2 || currentDay === 22) {
        suffixedDay = currentDay + 'nd';
    } else if (currentDay === 3 || currentDay === 23) {
        suffixedDay = currentDay + 'rd';
    } else {
        suffixedDay = currentDay + 'th';
    };

    // displays the booking date with the addition of the suffixes for the desired day
    bookingDate.textContent = `${day}, ${suffixedDay} ${month} ${year}`;

    // creates a confetti variable that runs on a canvas element within the modal
    const myConfetti = confetti.create(document.querySelector('.confetti-canvas'), {
        resize: true,
        disableForReducedMotion: true
    });

    // runs the confetti animation with the desired effects below
    myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
});

// event listeners which work to close the modal
closeModal.addEventListener('click', () => {
    modalReset();
});

confirmBooking.addEventListener('click', () => {
    modalReset();
});

dialog.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
        modalReset();
    };
});

// clears and resets various elements in order to set the modal back to it's original state
function modalReset() {
    dialog.close();
    weddingForm.reset();
    partnerOneName.innerText = '';
    partnerTwoName.innerText = '';
    weddingForm.classList.remove('hidden');
    currentDate.classList.remove('valid');
    currentDate.classList.remove('invalid');
    selectedDateOuput.textContent = '';
    bookingConfirmation.classList.add('hidden');
    document.body.classList.remove('no-scroll');
    chosenDateValidity = false;
};