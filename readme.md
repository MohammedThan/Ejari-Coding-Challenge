# Book Management API

This project is a simple RESTful API for managing a collection of books. It allows users to add, retbrieve, update, and delete books, with optional basic authentication for securing certain endpoints. The API is built using Express.js and TypeScript, with Mongoose for MongoDB integration and Zod for request validation.

## Table of Contents

- [Objective](#objective)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Bonus Features](#bonus-features)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## Objective

Create a RESTful API to manage books, allowing the following operations:

1. **Add a new book**
2. **Retrieve all books**
3. **Get details of a specific book**
4. **Update a book's details**
5. **Delete a book**
6. **(Bonus)** Secure some endpoints with basic authentication

## Features

- Basic CRUD operations for books
- Basic authentication for secure routes
- Validation using Zod for request body validation
- MongoDB for data storage with Mongoose for schema modeling
- Pagination support for listing books

## Technologies Used

- **Express.js** - Web framework for Node.js
- **TypeScript** - Type checking for JavaScript
- **MongoDB** - NoSQL database for storing book data
- **Mongoose** - MongoDB object modeling tool
- **Zod** - TypeScript-first schema validation library

## Requirements

- Node.js (v12 or higher)
- MongoDB (Local or hosted on a cloud service)
- npm for package management

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mohammedThan/Ejari-Coding-Challenge.git
   cd Ejari-Coding-Challenge
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a .env file in the root directory and add the following:

   ```bash
   PORT=5000 # Or the port that you want to use
   MONGODB_URI=mongodb://localhost:27017/ejari-books # Your local or hosted mongodb uri
   BASIC_AUTH_USERNAME=admin # Or what ever username you want to use
   BASIC_AUTH_PASSWORD=admin # Or what ever Password you want to use
   ```

   Note that i have created hosted mongodb for the project. Please let me know if you need the uri

4. **Running the Application**

   Start the server locally:

   ```bash
   npm run dev
   ```

   The server will be running at http://localhost:{$PORT}.

## API Endpoints

1. **Add a New Book**

   Endpoint: **POST** /api/books

   ##### Request Body:

   ```bash
   {
   "title": Book Title as a String (Required),
   "author": Author name as a String (Required),
   "publishedDate": Publish Date as a String (Required),
   "numberOfPages": A Positive Integer (Required)
   }
   ```

   ##### Response:

   Returns the newly created book object and the id and version.

   **Example**

  ##### Request:

   **POST** /api/books

   ```bash
   {
   "title": "The Great Gatsby",
   "author": "F. Scott Fitzgerald",
   "publishedDate": "1925-04-10",
   "numberOfPages": 180
   }
   ```

  ##### Response:

   ```bash
   {
   "_id": "671a4fae1877b2bf34eb",
   "title": "The Great Gatsby",
   "author": "F. Scott Fitzgerald",
   "publishedDate": "1925-04-10",
   "numberOfPages": 180
   "__v": 0
   }
   ```

2. **Retrieve a List of All Books**

   ### Endpoint

   `GET /api/books`

   ### Description

   This endpoint retrieves a paginated list of all books in the database. It supports pagination, allowing clients to specify which page of results to return and how many results per page.

   ### Query Parameters

   - `page` (optional): The page number to retrieve (default is `1`).
   - `limit` (optional): The number of items to return per page (default is `10`).

   ### Response

   Upon a successful request, the response will return a JSON object with the following structure:

   ```bash
   {
   "totalBooks": <total number of books>,
   "totalPages": <total number of pages>,
   "currentPage": <current page number>,
   "books": [
      {
         "id": "<book_id>",
         "title": "<book_title>",
         "author": "<book_author>",
         "publishedDate": "<published_date>",
         "numberOfPages": <number_of_pages>
      },
      ...
   ]
   }
   ```

   **Example**

  ##### Request

   **GET** /api/books?page=1&limit=10

  ##### Response

   ```bash
   {
   "totalBooks": 100,
   "totalPages": 10,
   "currentPage": 1,
   "books": [
      {
         "_id": "671a4fae1877b2bf34eb",
         "title": "The Great Gatsby",
         "author": "F. Scott Fitzgerald",
         "publishedDate": "1925-04-10",
         "numberOfPages": 180
      },
      {
         "_id": "e2b198e512a0e7c8a5bd",
         "title": "To Kill a Mockingbird",
         "author": "Harper Lee",
         "publishedDate": "1960-07-11",
         "numberOfPages": 281
      },
      {
         "_id": "b96fdd8f619ebf57d8ce",
         "title": "1984",
         "author": "George Orwell",
         "publishedDate": "1949-06-08",
         "numberOfPages": 328
      },
      ...
   ]
   }
   ```

3. **Get Details of a Specific Book**

   Endpoint: **GET** /api/books/:id

   Response: Returns the details of the specified book.

   **Example**

  ##### Request:

   **GET** /api/books/671a4fae1877b2bf34eb

  ##### Response:

   ```bash
   {
   "_id": "671a4fae1877b2bf34eb",
   "title": "The Great Gatsby",
   "author": "F. Scott Fitzgerald",
   "publishedDate": "1925-04-10",
   "numberOfPages": 180
   "__v": 0
   }
   ```

4. **Update a Book's Details**

   Endpoint: **PUT** /api/books/:id

   Request Body: Include only fields to be updated, e.g.,

   ```bash
   {
   "title": "The Great Gatsby - Updated Edition",
   "numberOfPages": 200
   }
   ```

   Response: Returns the updated book object.

   **Example**

  ##### Request:

   **PUT** /api/books/671a4fae1877b2bf34eb

   ```bash
   {
   "title": "The Great Gatsby - Updated Edition",
   "numberOfPages": 200
   }
   ```

  ##### Response:

   ```bash
   {
   "_id": "671a4fae1877b2bf34eb",
   "title": "The Great Gatsby",
   "author": "F. Scott Fitzgerald",
   "publishedDate": "1925-04-10",
   "numberOfPages": 180
   "__v": 0
   }
   ```

5. Delete a Book
   Endpoint: **DELETE** /api/books/:id

   Response: Returns a message indicating the book was successfully deleted.

   **Example**

  ##### Request:

   **DELETE** /api/books/671a4fae1877b2bf34eb

  ##### Response:

   ```bash
   {
      message: "Book successfully deleted"
   }
   ```

## Bonus Features

### Basic Authentication

To secure the API, basic authentication is applied to the following routes:

- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

To access these endpoints, include the `Authorization` header with a Basic Authentication token:

- `<base64_encoded_credentials>` is a Base64 encoded string that combines your `username` and `password` in the format `username:password`.
- To generate the encoded credentials, concatenate your `username` and `password` with a colon (e.g., `admin:password`), then encode this string using Base64.
- Postman and most other tools will automatically generate the Authorization header with the Base64 encoded credentials.

  **Example:**

  If your username is `admin` and your password is `password`, the Base64 encoded string would be:
  `Authorization: Basic YWRtaW46cGFzc3dvcmQ=`

### Pagination

Pagination is implemented for the `GET /api/books` endpoint. This allows users to retrieve books in a paginated format, improving performance and usability.

## Error Handling

The API provides clear error responses to facilitate debugging and improve user experience. Below are the main error types:

1. **Validation Errors**

   When a request fails due to validation issues, the API responds with a `400 Bad Request` status, detailing the validation errors.

   **Example Response:**

   ```json
   {
     "message": "Validation error",
     "error": {
       "field": "error message"
     }
   }
   ```

2. **Resource Not Found**

   If a resource is not found, the API returns a **404 Not Found** status.

   **Example Response:**

   ```bash
   {
     "message": "Book not found"
   }
   ```

3. **Server Errors**

   For unexpected issues, the API responds with a **500 Internal Server Error** status, indicating server-side problems.

   **Example Response:**

   ```bash
   {
     "message": "Internal server error. Please try again later."
   }
   ```

## Contributing

Feel free to submit issues, fork the repository, and send pull requests for suggested changes.
