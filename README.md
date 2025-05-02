
# ApolloProject

A full-stack application with Next.js frontend and Express.js backend connected to MongoDB.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (v9+)
- [MongoDB](https://www.mongodb.com/) (Local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud)


## Setup Instructions


```bash
1. Clone Repository
git clone https://github.com/YashJsh/ApolloProject.git
cd ApolloProject

2. Go to backend FOlder
cd backend
npm install

3. Go to frontend
cd ../frontend
npm install

4. Set up .env file in backend
PORT=3001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dbname?retryWrites=true&w=majority

5. Set up .env in frontend 
NEXT_PUBLIC_API_URL = 

6. Go to backend and run
cd backend
npm run dev
# Server running on http://localhost:3001



7. Add some dummy data first : 
eg. http://localhost:3001/api/add-doctor
eg. json object -
  {
    "name": "Dr. Chinu",
    "speciality": "General Physician",
    "experience": 12,
    "location": "Pune",
    "availableToday": false,
    "consultationType": ["hospital", "online"],
    "rating": 4.8,
    "languages": ["Kashmiri"],
    "fees": 499,
    "facility": ["Sahyadri Hospital"],
    "imageUrl": "https://example.com/images/kavita-joshi.jpg"
  }

8. go to frontend and run 
cd frontend
npm run dev
# Application running on http://localhost:3000