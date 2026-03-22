# Full Stack Web Application

## About the project
This is a full-stack web application I built as part of a development project.  
The goal was to understand how a frontend and backend work together, and how to manage data using a database.

---

## Features
- Display list of products  
- Add and remove items from cart  
- Cart is saved using localStorage  
- Submit orders to the backend  
- Basic data handling with MongoDB  

---

## Tech Stack

Frontend:
- React
- JavaScript
- HTML, CSS
- Bootstrap

Backend:
- Node.js
- Express

Database:
- MongoDB

---

## How to run

Clone the project:
```bash
git clone https://github.com/galsuissa/fullstack_project.git
cd fullstack_project
```


Install dependencies:
```bash
cd server
npm install

cd ../client
npm install
```

Create a .env file in the server folder:
```bash
MONGO_URI=your_connection_string
```

Run the server:
```bash
cd server
node server.js
```

Run the client:
```bash
cd client
npm start
```
