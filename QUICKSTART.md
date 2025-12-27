# Quick Start Guide

## Step 1: Install Dependencies

### Backend
```powershell
cd backend
npm install
```

### Frontend
```powershell
cd frontend
npm install
```

## Step 2: Setup Environment Variables

### Backend (.env)
Create a file `backend/.env` with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/srilanka-tourism
JWT_SECRET=mysupersecretkey123
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
Create a file `frontend/.env` with:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Step 3: Start MongoDB

If you have MongoDB installed locally:
```powershell
mongod
```

Or use MongoDB Atlas (cloud):
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update MONGODB_URI in backend/.env

## Step 4: Run the Application

### Start Backend (Terminal 1)
```powershell
cd backend
npm run dev
```

### Start Frontend (Terminal 2)
```powershell
cd frontend
npm start
```

## Step 5: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## Default Test Accounts (After Registration)

You can register:
- Tourist account
- Hotel partner account
- Admin account (set role in MongoDB manually)

## Common Issues

### MongoDB Connection Failed
- Make sure MongoDB is running
- Check connection string in .env
- For Atlas, whitelist your IP

### Port Already in Use
- Change PORT in backend/.env
- Update REACT_APP_API_URL in frontend/.env

### CORS Errors
- Ensure FRONTEND_URL is set correctly in backend/.env
- Check that both servers are running

## Next Steps

1. Register a new user account
2. Explore destinations and hotels
3. Make a test booking
4. Check "My Bookings" page

## Need Help?

Check the main README.md for detailed documentation!
