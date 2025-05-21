# Schools API

A simple Node.js REST API to manage schools data with MySQL database.

---

## Features

- Add new schools with name, address, latitude, and longitude
- Fetch list of schools sorted by proximity to user location
- Input validation for all API endpoints
- Easy to extend with more features

---

## Prerequisites

- Node.js 
- MySQL Server running
- [npm](https://www.npmjs.com/) package manager

---

## Setup

1. Clone the repository:

 ```bash  
   git clone https://github.com/Akshay3237/school.git
   cd School
 ```
Install dependencies:
 ```bash
npm install
```
Create a .env file in the root directory and add your database credentials:

env
```bash
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=sql12780372
PORT=3000
```
Create the schools table in your MySQL database using the following SQL:

sql
```bash
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL
);
```
Start the server:

```bash
npm start
```
API Endpoints
Add a New School
URL: /addSchool

Method: POST

Body Parameters (JSON):

json
```bash
{
  "name": "School Name",
  "address": "School Address",
  "latitude": 22.5,
  "longitude": 73.0
}
```
Success Response:

Code: 201 Created

Content: { "message": "School added successfully", "schoolId": 1 }

List Schools Sorted by Proximity
URL: /listSchool
```bash
    localhost:8000/addschool
```

Method: GET

Query Parameters:

latitude (required) - User's latitude

longitude (required) - User's longitude

Example:

```bash
GET /listSchools?latitude=22.5&longitude=73.0
```
Success Response:

Code: 200 OK

Content: Array of schools sorted by distance to user's location.

Project Structure

/models      # Database models and queries
/controllers # API request handlers
/routes      # API routes
/server.js    # Main server file
/app.js        #use for middle were handeling
/.env       # Environment variables (not committed)
Notes
Make sure MySQL server is running and .env credentials are correct.

Input validation is performed to ensure data integrity.

This project uses the mysql npm package for database interaction.

Extend routes and controllers as needed.

