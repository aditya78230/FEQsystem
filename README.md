# FAQ Management System

## Author
**Name:** Aditya Anil Jadhav  
**Email:** [adiyajadhav14143@gmail.com](mailto:adiyajadhav14143@gmail.com)  

---

## Project Overview
This project is a **FAQ Management System** that allows users to fetch FAQs, manipulate them through an admin portal, and even translate them using the **Google Translate API**. The system is built using **MongoDB, Express.js, React.js, and Node.js (MERN stack)**.  

Additionally, the backend uses **Redis for caching** to improve performance.  

---

## Project Phases & Steps Followed

### 1️⃣ Initializing the Server
- Set up an **Express.js** server.  
- Installed necessary **Node.js dependencies** (`express`, `mongoose`, `cors`, `dotenv`, `redis`, `axios`, etc.).  

### 2️⃣ Initializing the MongoDB Database
- Connected MongoDB using **Mongoose**.  
- Created a `.env` file to store the database **connection string** securely.  

### 3️⃣ Creating MongoDB Schema
Defined a **FAQ Schema** with:  
- `_id` (MongoDB Object ID)  
- `question` (String)  
- `answer` (String)  
- `createdAt` (Date)  

### 4️⃣ Creating Routes (API & Admin Routes)
- **API Route** (`routs/que`)  
  - Fetches all FAQs.  
  - Translates FAQs into different languages using **Google Translate API**.  

- **Admin Route** (`routs/admin`)  
  - Allows manipulation of each individual FAQ.  
  - Provides functionality to **add, edit, delete, and answer FAQs**.  

### 5️⃣ Redis Caching Implementation
- Used **Redis** to cache frequently accessed FAQs to enhance **performance and reduce database queries**.  

### 6️⃣ Frontend (Admin Portal) Setup
- Created a **React.js frontend** inside the `adminFrontEnd` folder.  
- Used **Axios** to communicate with the backend API.  
- Displays FAQs in a **structured list** with options to:  
  - Fetch FAQs  
  - Answer questions  
  - Delete FAQs  
- Integrated with **Google Translate API** to display translated FAQs.  

---

## How to Run the Project  

### 🔹 Backend Setup  
- git clone https://github.com/aditya78230/FEQsystem
- npm i
- node server
### 🔹 FrontEnd Setup  
- cd adminFrontEnd
- npm run dev

  
