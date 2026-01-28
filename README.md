# DSA Sheet Web Application

A full-stack MERN (MongoDB, Express, React, Node.js) web application for tracking Data Structures and Algorithms progress.

## Features

- **User Authentication**: Secure login and registration with JWT tokens
- **Topic-wise Organization**: DSA topics organized into categories (Algorithms, Data Structures, Databases, Machine Learning, Operating Systems)
- **Subtopics with Resources**: Each subtopic includes:
  - LeetCode practice link
  - YouTube tutorial link
  - Article reference link
  - Difficulty level (Easy/Medium/Hard)
- **Progress Tracking**: Checkbox to mark topics as completed
- **Persistent Progress**: Progress saved to database and restored on login
- **Progress Reports**: View completion percentages by difficulty level

## Tech Stack

- **Frontend**: React, React Router, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas)
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure

```
dsa-sheet-app/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── topicController.js  # Topics CRUD
│   │   └── progressController.js # Progress tracking
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── models/
│   │   ├── User.js            # User schema
│   │   ├── Topic.js           # Topic schema
│   │   └── Progress.js        # Progress schema
│   ├── routes/
│   │   ├── auth.js            # Auth routes
│   │   ├── topics.js          # Topic routes
│   │   └── progress.js        # Progress routes
│   ├── server.js              # Express server
│   ├── seed.js                # Database seeder
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── TopicCard.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Profile.js
│   │   │   ├── Topics.js
│   │   │   └── Progress.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dsa-sheet-app
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/dsasheet?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

**Frontend** (`frontend/.env`):
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Install Dependencies

```bash
# Install all dependencies
npm run install-all

# Or install separately
cd backend && npm install
cd ../frontend && npm install
```

### 4. Seed the Database

```bash
npm run seed
# or
cd backend && npm run seed
```

### 5. Run the Application

**Development mode (both frontend and backend):**
```bash
npm run dev
```

**Run separately:**
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend
npm run frontend
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Topics
- `GET /api/topics` - Get all topics
- `GET /api/topics/:id` - Get single topic

### Progress
- `GET /api/progress` - Get user's progress (protected)
- `POST /api/progress` - Update subtopic completion (protected)
- `GET /api/progress/stats` - Get progress statistics (protected)

## AWS Deployment

### Backend (EC2/Elastic Beanstalk)

1. Create an EC2 instance or Elastic Beanstalk environment
2. Install Node.js on the server
3. Clone the repository
4. Set environment variables
5. Run `npm install` and `npm start`

### Frontend (S3 + CloudFront)

1. Build the frontend: `cd frontend && npm run build`
2. Create an S3 bucket with static website hosting
3. Upload the `build` folder contents
4. Create a CloudFront distribution pointing to the S3 bucket

### Alternative: Single Server Deployment

The backend can serve the frontend in production:
1. Build the frontend: `npm run build`
2. The backend automatically serves static files from `frontend/build`
3. Deploy only the backend to EC2/Elastic Beanstalk

## License

MIT
