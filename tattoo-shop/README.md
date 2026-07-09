# Ink Studio - Tattoo Shop Website

A modern tattoo shop website with appointment booking, calendar integration, and deposit functionality.

## Features

- **Landing Page**: Professional hero section with call-to-action
- **Services Display**: Showcase of tattoo services with pricing
- **Artist Profiles**: Display of tattoo artists and their specialties
- **Interactive Calendar**: Custom calendar to select appointment dates
- **Time Slot Selection**: Available time slots for each date
- **Booking Form**: Complete form for customer details and tattoo description
- **Deposit System**: $50 deposit required to secure appointments
- **Payment Integration**: Credit card payment form (simulated)
- **Appointment Management**: View booked appointments
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Local Storage**: Appointments persist in browser storage

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation

1. Navigate to the project directory:
   ```bash
   cd tattoo-shop
   ```

2. Open `index.html` in your web browser:
   - Double-click `index.html`
   - Or right-click and select "Open with" your browser
   - Or use a local server (optional)

### Using a Local Server (Optional)

For the best experience, you can use a simple local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js (http-server):**
```bash
npx http-server
```

**Using VS Code Live Server:**
- Install the "Live Server" extension
- Right-click on `index.html`
- Select "Open with Live Server"

Then navigate to `http://localhost:8000` in your browser.

## How to Use

### Booking an Appointment

1. **Navigate to Booking Section**: Click "Book Now" in the navigation or scroll to the booking section
2. **Select a Date**: Click on an available date in the calendar (past dates are disabled)
3. **Select a Time Slot**: Choose from available time slots for the selected date
4. **Fill in Your Details**:
   - Full Name
   - Email Address
   - Phone Number
   - Preferred Artist
   - Service Type
   - Tattoo Description (optional)
5. **Review Selection**: Verify your selected date, time, and service
6. **Proceed to Payment**: Click "Proceed to Payment" button
7. **Enter Payment Details**: Fill in the credit card information (simulated)
8. **Complete Booking**: Submit payment to confirm your appointment

### Viewing Appointments

- Scroll to the "Your Appointments" section
- View all booked appointments with details:
  - Service type
  - Date and time
  - Artist
  - Deposit paid
  - Confirmation status

## Features Breakdown

### Calendar System
- Monthly view with navigation
- Today's date highlighted
- Past dates disabled
- Selected date highlighted
- Responsive grid layout

### Time Slots
- 9 available time slots per day (10 AM - 6 PM)
- Visual indication of booked slots
- Selected time highlighted
- Automatic disabling of booked slots

### Deposit System
- $50 deposit required for all appointments
- Deposit applied to final tattoo cost
- Secure payment form (simulated)
- Payment confirmation modal

### Data Persistence
- Appointments stored in localStorage
- Data persists across browser sessions
- No database required for demo

## Customization

### Changing Services
Edit the services in `index.html`:
```html
<div class="service-card">
    <div class="service-icon">🎨</div>
    <h3>Your Service Name</h3>
    <p>Description</p>
    <p class="price">Price</p>
</div>
```

### Changing Artists
Edit the artists in `index.html`:
```html
<div class="artist-card">
    <div class="artist-image"></div>
    <h3>Artist Name</h3>
    <p>Specialty</p>
</div>
```

### Modifying Time Slots
Edit the `availableTimeSlots` array in `script.js`:
```javascript
const availableTimeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];
```

### Changing Deposit Amount
Edit the deposit amount in `index.html` and `script.js`:
- In `index.html`: Update the deposit display text
- In `script.js`: Update the `deposit: 50` value

## Production Considerations

This is a frontend-only demo. For production use, you would need:

1. **Backend Server**: Node.js, Python, or similar
2. **Database**: Store appointments securely (PostgreSQL, MongoDB)
3. **Payment Gateway**: Stripe, PayPal, or similar for real payments
4. **Authentication**: User login system
5. **Email Service**: Send confirmation emails
6. **Admin Panel**: Manage appointments and artists
7. **API Integration**: Connect calendar to a real booking system

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **Vanilla JavaScript**: No frameworks required
- **LocalStorage**: Client-side data persistence

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for educational purposes.

## Support

For questions or issues, please refer to the code comments or contact the development team.
