# Welcome To DevStory

## Live URL

You can access the live application here: [DevStory Backend](https://dev-story-backend.vercel.app/)

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [API Documentation](#api-documentation)
5. [Project Overview Video](#project-overview-video)

---

## Introduction

DevStory is a blogging platform where users can create, update, and delete their blogs. The platform supports role-based access control with two roles: **Admin** and **User**. Users can manage their own blogs, while admins can manage users and their blogs. The application provides authentication, authorization, and a public API for viewing blogs with search, sort, and filter functionalities.

---

## Features

- User authentication & authorization (JWT-based authentication)
- Role-based access control (Admin & User)
- CRUD operations for blogs
- Admin can manage users (block users, delete blogs)
- Public API for fetching blogs with search, sorting, and filtering
- Secure password hashing using bcrypt
- Input validation using Zod
- Consistent error handling
- Well-structured REST API following best practices

---

## Technologies Used

- **Backend Framework:** Node.js + Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Validation:** Zod
- **Authentication:** JSON Web Token (JWT)
- **Security:** Bcrypt for password hashing
- **Environment Management:** Dotenv
- **CORS Handling:** CORS
- **Code Formatting & Linting:** ESLint, Prettier

---

## API Documentation

### 1. Register User

- **Endpoint:** `/api/auth/register`
- **Method:** `POST`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "statusCode": 201,
  "data": {
    "_id": "67b63aefc6a46e7f5a8bd22c",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login User

- **Endpoint:** `/api/auth/login`
- **Method:** `POST`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "statusCode": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2N2I0YmRkODY2YzQ3ZjViM2NlMWY4YjEiLCJ1c2VyRW1haWwiOiJqb2huQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3Mzk5OTU5NDksImV4cCI6MTc0MDI1NTE0OX0.pkzeYlwlJMZShndN_EZnAEPD3xRbd0dogGlRTN6UDI4"
  }
}
```

### 3. Create Blog

- **Endpoint:** `/api/blogs`
- **Method:** `POST`
- **Requires Authentication** (`Authorization: Bearer <token>`)

**Request Body:**

```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Blog created successfully",
  "statusCode": 201,
  "data": {
    "_id": "67b63b95c6a46e7f5a8bd231",
    "title": "My First Blog",
    "content": "This is the content of my blog.",
    "author": "67b5cec5b7c756f9eb43ef66"
  }
}
```

### 4. Get All Blogs (Public API)

- **Endpoint:** `/api/blogs`
- **Method:** `GET`
- Supports query parameters for **search**, **sorting**, and **filtering**

Example Request:

```
/api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=authorId

```

**Response:**

```json
{
  "success": true,
  "message": "Blogs fetched successfully",
  "statusCode": 200,
  "data": [
    {
      "_id": "67b63b95c6a46e7f5a8bd231",
      "title": "My First Blog",
      "content": "This is the content of my blog.",
      "author": {
        "_id": "67b5cec5b7c756f9eb43ef66",
        "name": "Porimol Raj",
        "email": "porimol@gmail.com",
        "role": "user",
        "isBlocked": false,
        "createdAt": "2025-02-19T12:29:57.264Z",
        "updatedAt": "2025-02-19T12:29:57.264Z"
      },
      "isPublished": true,
      "createdAt": "2025-02-19T20:14:13.138Z",
      "updatedAt": "2025-02-19T20:14:13.138Z"
    },
    {},
    {}
  ]
}
```

### 5. Update Blog

- **Endpoint:** `api/blogs/:id`
- **Method:** `PATCH`
- **Requires Authentication** (`Authorization: Bearer <token>`)

**Request Body:**

```json
{
  "title": "Updated Blog Title Here",
  "content": "Updated content Here"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Blog updated successfully",
  "statusCode": 200,
  "data": {
    "_id": "67b5d9d75a13d47027f01d2b",
    "title": "Updated Blog Title Here",
    "content": "Updated content Here",
    "author": {
      "_id": "67b5cec5b7c756f9eb43ef66",
      "name": "Porimol Raj",
      "email": "porimol@gmail.com",
      "role": "user",
      "isBlocked": false,
      "createdAt": "2025-02-19T12:29:57.264Z",
      "updatedAt": "2025-02-19T12:29:57.264Z"
    }
  }
}
```

### 6. Delete Blog

- **Endpoint:** `/api/blogs/:id`
- **Method:** `DELETE`
- **Requires Authentication** (`Authorization: Bearer <token>`)

**Response:**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

### 7. Admin Actions - Block User

- **Endpoint:** `/api/admin/users/:userId/block`
- **Method:** `PATCH`
- **Requires Admin Role**
- **Requires Authentication** (`Authorization: Bearer <token>`)

**Response:**

```json
{
  "success": true,
  "message": "User blocked successfully",
  "statusCode": 200
}
```

### 8. Admin Actions- Delete Blogs

- **Endpoint:** `/api/admin/blogs/:id`
- **Method:** `DELETE`
- **Requires Admin Role**
- **Requires Authentication** (`Authorization: Bearer <token>`)

**Response:**

```json
{
  "success": true,
  "message": "Blog deleted successfully",
  "statusCode": 200
}
```

---

## Project Overview Video

<a href='https://drive.google.com/file/d/1pcnRsgpy2-w2cPKWfWU6PXf0QXHhkSZ8/view?usp=drive_link' target=_blank>
    <img width='350px' src="./readmeImg/watch-video-button-01.png" />
</a>
