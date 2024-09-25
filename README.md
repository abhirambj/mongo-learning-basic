# Books API with MongoDB and Express

This is a basic **Books API** built using **Express**, and **MongoDB**. It provides basic CRUD (Create, Read, Update, Delete) functionality to manage a collection of books.

## Features

-   **Create a new book** (POST)
-   **Read all books** with pagination (GET)
-   **Read a single book** by its ID (GET)
-   **Update a book** partially (PATCH)
-   **Delete a book** by its ID (DELETE)

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [MongoDB](https://www.mongodb.com/) (v4.0 or higher)

## Installation

1. Clone the repository or download the source code:

    ```bash
    git clone https://github.com/yourusername/complete-mongo-books-api.git
    ```

2. Navigate into the project directory:

    ```bash
    cd complete-mongo
    ```

3. Install the dependencies using npm:

    ```bash
    npm install
    ```

4. Ensure **MongoDB** is running on your machine or use **MongoDB Atlas** for cloud hosting.

5. Run the server:

    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`.

## API Endpoints

### 1. **Get All Books (with Pagination)**

```http
GET /books?p=<page_number>
```

-   Fetch all books, 3 books per page by default.
-   Query Parameters:
    -   `p`: The page number (optional).
-   Example: `GET /books?p=2`

    **Sample Response**:

    ```json
    [
      {
        "_id": "603c9d2f9f1b7a4f8f001234",
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "year": 1925
      },
      ...
    ]
    ```

### 2. **Get a Single Book by ID**

```http
GET /books/:id
```

-   Fetch a single book by its ID.
-   Example: `GET /books/603c9d2f9f1b7a4f8f001234`

    **Sample Response**:

    ```json
    {
    	"_id": "603c9d2f9f1b7a4f8f001234",
    	"title": "The Great Gatsby",
    	"author": "F. Scott Fitzgerald",
    	"year": 1925
    }
    ```

### 3. **Create a New Book**

```http
POST /books
```

-   Create a new book by sending a JSON object with book details in the request body.

    **Request Body Example**:

    ```json
    {
    	"title": "The Catcher in the Rye",
    	"author": "J.D. Salinger",
    	"year": 1951
    }
    ```

    **Sample Response**:

    ```json
    {
    	"_id": "603c9d2f9f1b7a4f8f001234",
    	"title": "The Catcher in the Rye",
    	"author": "J.D. Salinger",
    	"year": 1951
    }
    ```

### 4. **Update a Book (Partial Update)**

```http
PATCH /books/:id
```

-   Update a book's details by its ID. You can update one or more fields in the request body.

    **Request Body Example**:

    ```json
    {
    	"title": "The Catcher in the Rye - Updated Edition"
    }
    ```

    **Sample Response**:

    ```json
    {
    	"_id": "603c9d2f9f1b7a4f8f001234",
    	"title": "The Catcher in the Rye - Updated Edition",
    	"author": "J.D. Salinger",
    	"year": 1951
    }
    ```

### 5. **Delete a Book by ID**

```http
DELETE /books/:id
```

-   Delete a book from the collection by its ID.

    **Sample Response**:

-   Status: `204 No Content` (if deleted successfully)

-   Status: `404 Not Found` (if the book is not found)

## Project Structure

```
.
├── db.js               # MongoDB connection setup
├── index.js            # Main Express app
├── package.json        # Project metadata and dependencies
├── README.md           # Project documentation (this file)
```

### MongoDB Connection

The database is set to run on `mongodb://localhost:27017/bookstore` by default. You can change the connection string in the `db.js` file.

```javascript
MongoClient.connect("mongodb://localhost:27017/bookstore");
```

To use a cloud MongoDB instance, replace the URI with your **MongoDB Atlas** connection string.

## Running the Project

1. Ensure MongoDB is running on your machine, or set up your MongoDB cluster using [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. Run the Express server:

    ```bash
    npm start
    ```

    The server will run on `http://localhost:3000`.

## Dependencies

-   **express**: A minimal and flexible Node.js web application framework.
-   **mongodb**: The official MongoDB driver for Node.js.

## Author

-   **Abhiram Bylahalli Jagadish**
