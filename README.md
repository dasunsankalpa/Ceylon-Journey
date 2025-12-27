# Sri Lanka Tourism Application

A comprehensive tourism platform for Sri Lanka built with **React** (frontend) and **Node.js + Express** (backend).

## 🌟 Features

- **User Authentication:** JWT-based login and registration for tourists and partners
- **Hotel Booking:** Browse hotels, view details, and make reservations
- **Destination Explorer:** Discover popular destinations across Sri Lanka
- **Digital Ticketing:** Book tickets to national parks and attractions with QR codes
- **Transport Integration:** Book rides through PickMe API integration
- **Multilingual Support:** English, Sinhala, and Tamil language support
- **Admin Dashboard:** Manage bookings, hotels, and users
- **Payment Integration:** Stripe payment gateway for secure transactions

## 📁 Project Structure

```
srilanka-tourism/
├── backend/              # Node.js + Express API
│   ├── config/          # Database configuration
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication & validation
│   ├── server.js        # Entry point
│   └── package.json
│
└── frontend/            # React application
    ├── public/
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── context/     # React context (Auth)
    │   ├── App.js
    │   ├── i18n.js      # Internationalization
    │   └── index.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```powershell
   cd backend
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the values:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/srilanka-tourism
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=your_stripe_key
   PICKME_API_KEY=your_pickme_key
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB** (if running locally):
   ```powershell
   mongod
   ```

5. **Run the backend server:**
   ```powershell
   npm run dev
   ```
   
   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```powershell
   cd frontend
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

4. **Start the development server:**
   ```powershell
   npm start
   ```
   
   App will open at `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel details
- `POST /api/hotels` - Create hotel (Partner/Admin)
- `PUT /api/hotels/:id` - Update hotel (Partner/Admin)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get user bookings
- `GET /api/bookings/:id` - Get booking details
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Destinations
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get destination details

### Tickets
- `GET /api/tickets` - Get all tickets/attractions
- `GET /api/tickets/:id` - Get ticket details

### Transport
- `POST /api/transport/pickme/book` - Book PickMe ride
- `GET /api/transport/pickme/estimate` - Get ride estimate

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment
- `POST /api/payments/confirm` - Confirm payment

### Admin
- `GET /api/admin/dashboard` - Get dashboard stats
- `GET /api/admin/bookings` - Get all bookings

## 🛠️ Technology Stack

### Frontend
- React 18
- Material-UI (MUI)
- React Router
- Axios
- i18next (Internationalization)
- Stripe Elements
- React Leaflet (Maps)
- React QR Code

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Stripe SDK
- QRCode Generator

## 📦 Available Scripts

### Backend
- `npm start` - Run production server
- `npm run dev` - Run development server with nodemon
- `npm test` - Run tests

### Frontend
- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests

## 🌐 Deployment

### Backend (Heroku/AWS/Azure)
1. Set environment variables
2. Deploy using Git or Docker
3. Ensure MongoDB is accessible

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Set environment variables in hosting platform

## 🔐 Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- Rate limiting (to be implemented)
- HTTPS enforcement (production)

## 📝 Next Steps

1. **Add Seed Data:** Populate database with sample hotels, destinations, and tickets
2. **API Integration:** Complete PickMe and payment gateway integration
3. **Offline Support:** Implement PWA features for offline maps
4. **Testing:** Add unit and integration tests
5. **Documentation:** API documentation with Swagger
6. **Monitoring:** Add error tracking (Sentry) and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

MIT License

## 📞 Support

For issues and questions:
- Email: info@srilankatourism.com
- Create an issue on GitHub

---

**Built with ❤️ for Sri Lanka Tourism**
