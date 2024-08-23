import express from 'express';
import homeRouter from './routes/homeRouter.js';
import { productsRouter } from './routes/productRouter.js';
import { getErrorStatus } from './controllers/404ErrorController.js';
import userRouter from './routes/userRouter.js';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.json());

// const accessLogStream = createWriteStream('./access.log', {flags:'a'});

// Route definitions
app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);

// Error handling
app.use('*', getErrorStatus);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening at port number ${port}`));



/**
 * GET http://localhost:8000/
*  GET http://localhost:8000/products
 GET http://localhost:8000/products/category?category=Electronics

 GET "http://localhost:8000/products/priceRange?min=100&max=500"
 GET http://localhost:8000/products/1
 POST http://localhost:8000/products \

 -H "Content-Type: application/json" \
-d '{
    "product_name": "New Product",
    "price": 299.99,
    "category": "Electronics",
    "star_rating": 4.5,
    "description": "A new electronic device.",
    "product_code": "NP123",
    "imageurl": "http://example.com/image.jpg"
}'

PUT http://localhost:8000/products/1 \

-H "Content-Type: application/json" \
-d '{
    "price": 259.99,
    "star_rating": 4.7
}'

 DELETE http://localhost:8000/products/1
 POST http://localhost:8000/users \

 -H "Content-Type: application/json" \
-d '{
    "user_name": "john_doe",
    "user_password": "password123",
    "email": "john@example.com"
}'

 */


/**
 * 
 * Testing Tips

    Check Response Status Codes: Ensure your server responds with appropriate status codes for each request (e.g., 200 OK, 201 Created, 400 Bad Request, 404 Not Found).
    Verify Response Body: Validate the content of the response to ensure it matches the expected data format and values.
    Handle Errors: Test how your API handles invalid or missing parameters and check for appropriate error messages.
 */


/**
 * 
 * Certainly! Here are some additional tips for developing and managing a robust backend:
**1. API Design and Documentation

    RESTful Principles: Follow RESTful design principles for creating clean and predictable APIs. Use standard HTTP methods (GET, POST, PUT, DELETE) and ensure endpoints are intuitive.
    Consistent Naming: Use consistent and descriptive naming conventions for endpoints and parameters.
    Versioning: Implement API versioning (e.g., /api/v1/products) to ensure backward compatibility as your API evolves.
    Documentation: Maintain up-to-date API documentation using tools like Swagger/OpenAPI or Postman. Clear documentation helps consumers understand how to use your API and what to expect.

**2. Error Handling

    Meaningful Errors: Provide meaningful error messages and status codes to help clients understand what went wrong.
    Centralized Error Handling: Implement a centralized error handling mechanism to catch and manage errors consistently across your application.
    Validation: Validate input data thoroughly and return specific error messages when validation fails.

**3. Security

    Authentication & Authorization: Implement secure authentication (e.g., JWT, OAuth) and authorization mechanisms to control access to resources.
    Data Protection: Use HTTPS to encrypt data in transit. Hash passwords and use environment variables for sensitive data (e.g., API keys, database credentials).
    SQL Injection Protection: Use parameterized queries or ORM tools to protect against SQL injection attacks.
    Rate Limiting: Implement rate limiting to prevent abuse and protect your API from being overwhelmed by too many requests.

**4. Performance Optimization

    Caching: Implement caching strategies to reduce load times and improve performance (e.g., Redis, in-memory caching).
    Database Indexing: Use indexing to speed up query performance, especially for frequently queried columns.
    Pagination: Implement pagination for endpoints that return large datasets to avoid performance issues and reduce response times.
    Load Balancing: Use load balancing to distribute traffic evenly across multiple server instances and improve scalability.

**5. Testing

    Unit Testing: Write unit tests for individual components to ensure they work as expected. Tools like Mocha, Jest, or Jasmine can be used.
    Integration Testing: Test interactions between components to ensure they work together correctly.
    End-to-End Testing: Use tools like Postman or automated testing frameworks (e.g., Cypress) to test the entire flow of your application.
    Mocking: Use mocking libraries to simulate external dependencies and test components in isolation.

**6. Scalability and Maintainability

    Microservices Architecture: Consider using a microservices architecture to break down your application into smaller, manageable services that can be developed, deployed, and scaled independently.
    Code Organization: Maintain a clean and organized codebase. Use modular design patterns and keep controllers, models, and routes separated.
    Monitoring and Logging: Implement monitoring and logging to track application performance and errors. Tools like Prometheus, Grafana, and ELK stack can be useful.
    CI/CD Pipelines: Set up Continuous Integration and Continuous Deployment pipelines to automate testing and deployment processes.

**7. Database Management

    Schema Design: Design your database schema carefully to ensure it meets your application's requirements and can handle future changes.
    Backup and Recovery: Regularly back up your database and test recovery procedures to prevent data loss.
    Database Migrations: Use migration tools to manage changes to your database schema in a controlled and versioned manner (e.g., Knex, Sequelize).

**8. API Rate Limiting and Throttling

    Implement Rate Limiting: Use rate limiting to prevent abuse and control the number of requests a user can make in a given time period.
    Throttle Requests: Implement throttling to limit the rate of requests from a single IP address or API key.

**9. API Gateway and Management

    API Gateway: Use an API gateway to manage traffic, enforce security policies, and provide additional functionality like caching and request routing.
    API Management Tools: Use API management tools (e.g., Kong, Apigee) to monitor, analyze, and manage API traffic and usage.

**10. Documentation and Training

    Developer Documentation: Provide comprehensive documentation for developers to understand how to use and integrate with your API.
    Training: Offer training sessions or resources for your team to stay updated on best practices and new technologies.

**11. Environment Configuration

    Environment Variables: Use environment variables to manage configuration settings and secrets for different environments (development, testing, production).
    Configuration Management: Use configuration management tools (e.g., dotenv, config) to handle different settings for various environments.

By following these tips, you can build a more secure, scalable, and maintainable backend for your application.
 */