
console.log("JS Loaded");

document.addEventListener('DOMContentLoaded', function () {

    const bookingForm = document.querySelector('.booking-elementor-form');

    if (!bookingForm) {
        console.log("Booking form not found");
        return;
    }

    console.log("Booking form found");

    // Load saved data
    const savedData = JSON.parse(localStorage.getItem('bookingData'));

    if (savedData) {
        document.getElementById('form-field-fullname').value = savedData.Name || '';
        document.getElementById('form-field-PhoneNo').value = savedData.PhoneNo || '';
        document.getElementById('form-field-ActivityType').value = savedData.ActivityType || '';
        document.getElementById('form-field-date').value = savedData.Date || '';
        document.getElementById('form-field-time').value = savedData.Time || '';
        document.getElementById('form-field-Participants').value = savedData.Participants || '';
        document.getElementById('form-field-message').value = savedData.message || '';
    }

    bookingForm.addEventListener('input', function () {

        const bookingData = {
            Name: document.getElementById('form-field-fullname').value,
            PhoneNo: document.getElementById('form-field-PhoneNo').value,
            ActivityType: document.getElementById('form-field-ActivityType').value,
            Date: document.getElementById('form-field-date').value,
            Time: document.getElementById('form-field-time').value,
            Participants: document.getElementById('form-field-Participants').value,
            message: document.getElementById('form-field-message').value
        };

        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        console.log("Saved:", bookingData);
    });

    bookingForm.addEventListener('submit', function (event) {

        console.log("Submit Fired");
        event.preventDefault();

        
    const formData = {
        Name: document.getElementById('form-field-fullname').value,
        PhoneNo: document.getElementById('form-field-PhoneNo').value,
        ActivityType: document.getElementById('form-field-ActivityType').value,
        Date: document.getElementById('form-field-date').value,
        Time: document.getElementById('form-field-time').value,
        Participants: document.getElementById('form-field-Participants').value,
        message: document.getElementById('form-field-message').value
    };

    // Save to Google Sheet
    fetch('https://script.google.com/macros/s/AKfycby_c0zG3zpN7W6MDPxauA1JAfbx7Tq_hS5cPRdJzv6F7oinuNNOCO1RxQKueJf0rwQ/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    // Existing EmailJS
    emailjs.send('service_nzbfq1h', 'template_6ypwcq8', formData)
        .then(function (response) {

            alert('✅ Your Booking Request is raised successfully! We will get back to you shortly.');

            console.log('SUCCESS!', response.status, response.text);

            // Clear local storage after successful booking
            localStorage.removeItem('bookingData');

            bookingForm.reset();

        })
        .catch(function (error) {

            alert('Oops! Something went wrong. Please try again later.');

            console.log('FAILED...', error);

        });

    });

});
