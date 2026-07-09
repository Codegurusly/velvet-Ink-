// Tattoo Shop Booking System

// State management
let selectedDate = null;
let selectedTime = null;
let appointments = JSON.parse(localStorage.getItem('tattooAppointments')) || [];

// DOM Elements
const calendar = document.getElementById('calendar');
const timeSlotsContainer = document.getElementById('time-slots');
const bookingForm = document.getElementById('booking-form');
const selectedDateSpan = document.getElementById('selected-date');
const selectedTimeSpan = document.getElementById('selected-time');
const submitBtn = document.querySelector('.submit-btn');
const appointmentsList = document.getElementById('appointments-list');
const paymentModal = document.getElementById('payment-modal');
const successModal = document.getElementById('success-modal');
const paymentForm = document.getElementById('payment-form');
const closeButtons = document.querySelectorAll('.close');
const okBtn = document.querySelector('.ok-btn');

// Available time slots
const availableTimeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];

// Booked slots (simulated - in production this would come from a database)
const bookedSlots = {};

// Initialize calendar
function initCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    renderCalendar(currentMonth, currentYear);
}

// Render calendar
function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    let calendarHTML = `
        <div class="calendar-header">
            <button onclick="changeMonth(-1)">&#10094;</button>
            <span>${monthNames[month]} ${year}</span>
            <button onclick="changeMonth(1)">&#10095;</button>
        </div>
    `;
    
    // Add day names
    dayNames.forEach(day => {
        calendarHTML += `<div class="calendar-day-name">${day}</div>`;
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
        calendarHTML += `<div class="calendar-day disabled"></div>`;
    }
    
    // Add days of the month
    const today = new Date();
    for (let day = 1; day <= totalDays; day++) {
        const date = new Date(year, month, day);
        const dateStr = formatDate(date);
        const isPast = date < today.setHours(0, 0, 0, 0);
        const isToday = dateStr === formatDate(new Date());
        const isSelected = selectedDate === dateStr;
        
        let classes = 'calendar-day';
        if (isPast) classes += ' disabled';
        if (isToday) classes += ' today';
        if (isSelected) classes += ' selected';
        
        if (!isPast) {
            calendarHTML += `<div class="${classes}" onclick="selectDate('${dateStr}')">${day}</div>`;
        } else {
            calendarHTML += `<div class="${classes}">${day}</div>`;
        }
    }
    
    calendar.innerHTML = calendarHTML;
}

// Change month
function changeMonth(delta) {
    const currentMonth = parseInt(calendar.dataset.month) || new Date().getMonth();
    const currentYear = parseInt(calendar.dataset.year) || new Date().getFullYear();
    
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    
    if (newMonth > 11) {
        newMonth = 0;
        newYear++;
    } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
    }
    
    calendar.dataset.month = newMonth;
    calendar.dataset.year = newYear;
    
    renderCalendar(newMonth, newYear);
}

// Format date to string
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Select date
function selectDate(dateStr) {
    selectedDate = dateStr;
    selectedDateSpan.textContent = dateStr;
    selectedTime = null;
    selectedTimeSpan.textContent = 'None';
    
    renderCalendar(parseInt(calendar.dataset.month) || new Date().getMonth(), 
                  parseInt(calendar.dataset.year) || new Date().getFullYear());
    renderTimeSlots();
    updateSubmitButton();
}

// Render time slots
function renderTimeSlots() {
    if (!selectedDate) {
        timeSlotsContainer.innerHTML = '<p class="select-date-msg">Please select a date first</p>';
        return;
    }
    
    const bookedForDate = bookedSlots[selectedDate] || [];
    
    let slotsHTML = '';
    availableTimeSlots.forEach(time => {
        const isBooked = bookedForDate.includes(time);
        const isSelected = selectedTime === time;
        
        let classes = 'time-slot';
        if (isBooked) classes += ' disabled';
        if (isSelected) classes += ' selected';
        
        if (!isBooked) {
            slotsHTML += `<div class="${classes}" onclick="selectTime('${time}')">${time}</div>`;
        } else {
            slotsHTML += `<div class="${classes}">${time} (Booked)</div>`;
        }
    });
    
    timeSlotsContainer.innerHTML = slotsHTML;
}

// Select time slot
function selectTime(time) {
    selectedTime = time;
    selectedTimeSpan.textContent = time;
    renderTimeSlots();
    updateSubmitButton();
}

// Update submit button state
function updateSubmitButton() {
    const canSubmit = selectedDate && selectedTime && 
                     bookingForm.name.value && 
                     bookingForm.email.value && 
                     bookingForm.phone.value && 
                     bookingForm.artist.value && 
                     bookingForm.service.value;
    
    submitBtn.disabled = !canSubmit;
}

// Handle booking form submission
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
        alert('Please select a date and time');
        return;
    }
    
    // Show payment modal
    document.getElementById('modal-service').textContent = 
        bookingForm.service.options[bookingForm.service.selectedIndex].text;
    document.getElementById('modal-date').textContent = selectedDate;
    document.getElementById('modal-time').textContent = selectedTime;
    document.getElementById('modal-artist').textContent = 
        bookingForm.artist.options[bookingForm.artist.selectedIndex].text;
    
    paymentModal.style.display = 'block';
});

// Handle payment form submission
paymentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate payment processing
    const cardNumber = document.getElementById('card-number').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    // Basic validation
    if (cardNumber.length < 16 || expiry.length < 5 || cvv.length < 3) {
        alert('Please enter valid payment details');
        return;
    }
    
    // Create appointment
    const appointment = {
        id: Date.now(),
        name: bookingForm.name.value,
        email: bookingForm.email.value,
        phone: bookingForm.phone.value,
        artist: bookingForm.artist.value,
        service: bookingForm.service.value,
        description: bookingForm.description.value,
        date: selectedDate,
        time: selectedTime,
        deposit: 50,
        status: 'confirmed',
        createdAt: new Date().toISOString()
    };
    
    // Save appointment
    appointments.push(appointment);
    localStorage.setItem('tattooAppointments', JSON.stringify(appointments));
    
    // Mark slot as booked
    if (!bookedSlots[selectedDate]) {
        bookedSlots[selectedDate] = [];
    }
    bookedSlots[selectedDate].push(selectedTime);
    
    // Close payment modal and show success
    paymentModal.style.display = 'none';
    successModal.style.display = 'block';
    
    // Reset form
    bookingForm.reset();
    selectedDate = null;
    selectedTime = null;
    selectedDateSpan.textContent = 'None';
    selectedTimeSpan.textContent = 'None';
    renderTimeSlots();
    updateSubmitButton();
    
    // Update appointments list
    renderAppointments();
});

// Close modals
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        paymentModal.style.display = 'none';
        successModal.style.display = 'none';
    });
});

okBtn.addEventListener('click', function() {
    successModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Render appointments
function renderAppointments() {
    if (appointments.length === 0) {
        appointmentsList.innerHTML = '<p class="no-appointments">No appointments booked yet</p>';
        return;
    }
    
    let appointmentsHTML = '';
    appointments.forEach(apt => {
        const artistNames = {
            'marcus': 'Marcus Chen',
            'sarah': 'Sarah Williams',
            'jake': 'Jake Rodriguez'
        };
        
        appointmentsHTML += `
            <div class="appointment-card">
                <div class="appointment-details">
                    <h4>${apt.service.charAt(0).toUpperCase() + apt.service.slice(1)} Tattoo</h4>
                    <p><strong>Date:</strong> ${apt.date}</p>
                    <p><strong>Time:</strong> ${apt.time}</p>
                    <p><strong>Artist:</strong> ${artistNames[apt.artist]}</p>
                    <p><strong>Deposit Paid:</strong> $${apt.deposit}</p>
                </div>
                <div class="appointment-status status-confirmed">Confirmed</div>
            </div>
        `;
    });
    
    appointmentsList.innerHTML = appointmentsHTML;
}

// Add event listeners to form inputs
bookingForm.addEventListener('input', updateSubmitButton);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Payment method tabs
const paymentTabs = document.querySelectorAll('.payment-tab');
const paymentContents = document.querySelectorAll('.payment-method-content');

paymentTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // Remove active class from all tabs and contents
        paymentTabs.forEach(t => t.classList.remove('active'));
        paymentContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        const method = this.dataset.method;
        document.getElementById(`${method}-payment`).classList.add('active');
    });
});

// PayPal payment submission
function submitPayPalPayment() {
    const receipt = document.getElementById('paypal-receipt').value;
    
    if (!receipt) {
        alert('Please upload your PayPal payment receipt');
        return;
    }
    
    // Create appointment with PayPal payment method
    const appointment = {
        id: Date.now(),
        name: bookingForm.name.value,
        email: bookingForm.email.value,
        phone: bookingForm.phone.value,
        artist: bookingForm.artist.value,
        service: bookingForm.service.value,
        description: bookingForm.description.value,
        date: selectedDate,
        time: selectedTime,
        deposit: 50,
        paymentMethod: 'paypal',
        status: 'pending_confirmation',
        createdAt: new Date().toISOString()
    };
    
    // Save appointment
    appointments.push(appointment);
    localStorage.setItem('tattooAppointments', JSON.stringify(appointments));
    
    // Mark slot as booked
    if (!bookedSlots[selectedDate]) {
        bookedSlots[selectedDate] = [];
    }
    bookedSlots[selectedDate].push(selectedTime);
    
    // Close payment modal and show success
    paymentModal.style.display = 'none';
    successModal.querySelector('h2').textContent = 'Booking Submitted!';
    successModal.querySelectorAll('p')[0].textContent = 'Your booking has been submitted and is pending confirmation.';
    successModal.querySelectorAll('p')[1].textContent = 'We will verify your PayPal payment receipt and confirm your appointment shortly.';
    successModal.style.display = 'block';
    
    // Reset form
    bookingForm.reset();
    document.getElementById('paypal-receipt').value = '';
    selectedDate = null;
    selectedTime = null;
    selectedDateSpan.textContent = 'None';
    selectedTimeSpan.textContent = 'None';
    renderTimeSlots();
    updateSubmitButton();
    
    // Update appointments list
    renderAppointments();
    
    // Reset success modal text
    setTimeout(() => {
        successModal.querySelector('h2').textContent = 'Booking Confirmed!';
        successModal.querySelectorAll('p')[0].textContent = 'Your appointment has been successfully booked.';
        successModal.querySelectorAll('p')[1].textContent = 'A confirmation email has been sent to your email address.';
    }, 500);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initCalendar();
    renderAppointments();
    
    // Set initial calendar data
    calendar.dataset.month = new Date().getMonth();
    calendar.dataset.year = new Date().getFullYear();
});
