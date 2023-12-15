# Express.js Server Template

This project is an Express.js server template, designed to provide a robust and scalable foundation for building web applications. It leverages TypeScript for type safety and Prisma as an ORM for efficient database management.

## Features

- **TypeScript Integration**: Leverage the power of type safety and modern JavaScript features with TypeScript.
- **Prisma ORM**: Efficiently manage and interact with your database using Prisma, a next-generation ORM.
- **Authentication**: Secure API endpoints with built-in authentication mechanisms.
- **Middleware Support**: Enhance your server with custom middleware for logging, error handling, and more.
- **Auto-Restart**: Development made easier with Nodemon for automatic server restarts on file changes.
- **Database Migrations**: Manage your database schema and migrations effortlessly with Prisma migrations.

## Getting Started

### Prerequisites

- Node.js
- npm or Yarn
- A supported SQL database for Prisma (e.g., PostgreSQL, MySQL)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/takeshicamilo/expressjs-server-template.git

2. Install dependencies:
   ```bash
   npm install or yarn install

3. Run database migration:
   ```bash
   npx prisma migrate dev

4. Run server:
   ```bash
   npm run dev

# API Endpoints

## Creating New APIs and Securing

To add a new API endpoint, follow these steps:

1. **Create a new file** under the `src/api` directory. For example, `src/api/users.ts`.

2. **Define your route and handler** in this file. Example:

   ```typescript
   import { Router } from 'express';

   const router = Router();

   router.get('/users', (req, res) => {
     res.json({ message: 'List of users' });
   });

   export default router;
   
3. **Import the new route module** at the top of your `index.ts` file. For example, if you created `users.ts` under the `src/api` directory, you would import it like this:

   ```typescript
   import userRoutes from './api/users';
   app.use('/api', userRoutes);

## Applying Middleware to a Route

Middleware functions in Express.js can be used for various purposes like authentication, logging, or modifying the request/response objects. Here's how you can apply middleware to a route in your Express.js application:

### Example: Using Middleware in a Route

Assuming you have a middleware function already defined (named `middleware` in this case), you can apply it to your routes as shown in the following example:

```typescript
import middleware from './path-to-middleware';

app.get("/", middleware, (req: CustomRequest, res: Response) => {
  console.log(req.user, 'asd'); // Example usage of a property set by the middleware
  res.send("Hello World!");
});
```

## Contributing

Contributions to improve this template are welcome. Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## License

This project is licensed under the [MIT License](LICENSE).


