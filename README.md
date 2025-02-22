# Final NoSQL Project

This project is a Node.js-based backend for an online store, using MongoDB as a NoSQL database. It provides CRUD operations for users, products, and orders with authentication and authorization features.

## Features
- User authentication with JWT.
- CRUD operations for users, products, and orders.
- Middleware for authentication and authorization.
- MongoDB as a NoSQL database with Mongoose ORM.
- RESTful API built with Express.
- Environment variables for secure configuration.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/final_nosql.git
   cd final_nosql
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

## Running the Server
To start the development server:
```sh
node server.js
```

## Seeding the Database
To populate the database with sample data:
```sh
node seed.js
```

## Project Structure
```
FINAL_NOSQL/
│── config/
│   ├── db.js            # Database connection configuration
│── middleware/
│   ├── authMiddleware.js # Middleware for handling authentication and authorization
│── models/
│   ├── Order.js         # Order model schema
│   ├── Product.js       # Product model schema
│   ├── User.js          # User model schema with password hashing
│── routes/
│   ├── orderRoutes.js   # Routes for handling orders
│   ├── productRoutes.js # Routes for handling products
│   ├── userRoutes.js    # Routes for user authentication and management
│── .env                 # Environment variables for configuration
│── package.json         # Project dependencies and scripts
│── seed.js              # Database seeding script with sample data
│── server.js            # Main entry point of the server
```

## API Endpoints
### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login and receive JWT token
- `GET /api/users` - Get all users (admin only)

### Products
- `GET /api/products` - Retrieve all products
- `POST /api/products` - Add a new product (admin only)
- `PUT /api/products/:id` - Update a product by ID (admin only)
- `DELETE /api/products/:id` - Delete a product by ID (admin only)

### Orders
- `POST /api/orders` - Create a new order
- `GET /api/orders` - Retrieve all orders (admin only)
- `GET /api/orders/:id` - Get details of a specific order

## Authentication and Middleware
- `authMiddleware.js`: Handles user authentication using JWT tokens. Ensures that only authenticated users can access certain endpoints.
- JWT-based authentication: Users log in with credentials and receive a token, which must be included in requests requiring authentication.
- Admin authorization: Some routes are restricted to users with admin privileges.

## Database (MongoDB + Mongoose)
- Mongoose is used as an Object Data Modeling (ODM) library for MongoDB.
- The database stores users, products, and orders as separate collections.
- Schema validation ensures data integrity.
- Indexes are used for performance optimization.

## Dependencies
- `express`: Web framework for handling API requests.
- `mongoose`: ODM for MongoDB.
- `jsonwebtoken (JWT)`: For authentication.
- `bcryptjs`: For password hashing and security.
- `dotenv`: For managing environment variables securely.
- `cors`: Middleware for enabling CORS in API requests.

## Testing with Postman
You can test the API endpoints using Postman by sending requests to `http://localhost:5000/api/`.

### Steps:
1. Start the server with `node server.js`.
2. Use Postman to make requests to the API endpoints.
3. Include a valid JWT token in the Authorization header for protected routes.


## Future Improvements
- Implement image uploads for product images.
- Add order status tracking and history.
- Improve error handling and validation.
- Deploy the application to a cloud service (e.g., AWS, Heroku).

